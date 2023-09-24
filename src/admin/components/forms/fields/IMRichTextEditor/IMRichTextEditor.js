import React from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  AtomicBlockUtils,
  DefaultDraftBlockRenderMap,
  convertFromHTML,
  ContentState,
} from 'draft-js'
import { IMColorPickerSketch } from '../../../IMComponents'
import { stateToHTML } from 'draft-js-export-html'
const { Map } = require('immutable')

class IMRichTextEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      urlType: '',
      urlValue: '',
      showURLInput: false,
      colorPicked: 'gray',
    }

    this.focus = () => this.refs.editor.focus()

    this.onChange = editorState => {
      this.setState({
        editorState: editorState,
      })
      if (this.props.getHTML) {
        this.props.getHTML(this.innerHTML)
      }
    }
    this.onURLChange = event => this.setState({ urlValue: event.target.value })

    this.innerHTML = ''
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.myKeybindingFn = this._myKeybindingFn.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.myBlockStyleFn = this._myBlockStyleFn.bind(this)
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this)
    this.confirmMedia = this._confirmMedia.bind(this)
    this.customBlockRenderer = this._customBlockRenderer.bind(this)
    this.colorPickerChange = this._colorPickerChange.bind(this)
    this.handleColorChange = this._handleColorChange.bind(this)
    this.toggleCustomType = {
      IMAGE: this._addImage.bind(this),
      VIDEO: this._addVideo.bind(this),
      AUDIO: this._addAudio.bind(this),
    }
  }

  _customBlockRenderer = block => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      }
    }

    return null
  }

  _toggleInlineStyle = event => {
    event.preventDefault()
    let style = event.currentTarget.getAttribute('data-style')
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  _colorPickerChange = color => {
    this.setState({
      colorPicked: color,
    })
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'COLORPICKER'),
    )
  }
  _handleColorChange = color => {
    this.setState({
      colorPicked: color,
    })
  }

  _myBlockStyleFn = contentBlock => {
    const type = contentBlock.getType()
    switch (type) {
      case 'blockquote':
        return 'myBlockquote'
      default:
        return null
    }
  }

  _toggleBlockType = event => {
    event.preventDefault()
    let style = event.currentTarget.getAttribute('data-block')
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style))
  }

  _myKeybindingFn = event => {
    if (
      event.keyCode === 88 &&
      event.shiftKey &&
      KeyBindingUtil.hasCommandModifier(event)
    ) {
      return 'strikethrough'
    }
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === 'h'
    ) {
      return 'highlight'
    }
    if (event.keyCode === 9) {
      //managing tab(adds a tab only to lists)
      const newEditorState = RichUtils.onTab(event, this.state.editorState, 4)
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState)
      }
      return
    }

    return getDefaultKeyBinding(event)
  }

  _handleKeyCommand = command => {
    var myEditorState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command,
    )

    if (!myEditorState && command === 'strikethrough') {
      myEditorState = RichUtils.toggleInlineStyle(
        this.state.editorState,
        'STRIKETHROUGH',
      )
    }
    if (!myEditorState && command === 'highlight') {
      myEditorState = RichUtils.toggleInlineStyle(
        this.state.editorState,
        'HIGHLIGHT',
      )
    }

    if (myEditorState) {
      this.onChange(myEditorState)
      return 'handled'
    }

    return 'not-handled'
  }

  _confirmMedia = event => {
    event.preventDefault()
    const { editorState, urlValue, urlType } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      { src: urlValue },
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' ',
        ),
        showURLInput: false,
        urlValue: '',
      },
      () => {
        setTimeout(() => this.focus(), 0)
      },
    )
  }

  _onURLInputKeyDown = event => {
    if (event.which === 13) {
      this._confirmMedia(event)
    }
  }

  _getMedia = type => {
    if (this.state.urlType === type && this.state.showURLInput === true) {
      this.setState(
        {
          showURLInput: false,
        },
        () => {
          setTimeout(() => this.focus(), 0)
        },
      )
      return
    }

    this.setState(
      {
        showURLInput: true,
        urlValue: '',
        urlType: type,
      },
      () => {
        setTimeout(() => this.refs.urlInput.focus(), 0)
      },
    )
  }

  _addImage = () => {
    this._getMedia('image')
  }

  _addVideo = () => {
    this._getMedia('video')
  }

  _addAudio = () => {
    this._getMedia('audio')
  }

  render() {
    const { editorState } = this.state
    const myStyleMap = {
      CODE: {
        //Here we can add/overwrite styles (bold, italic, etc)
        backgroundColor: 'rgb(0, 0, 0, 0.1)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
      HIGHLIGHT: {
        backgroundColor: '#faed27',
        width: '100%',
      },
      ALIGNLEFT: {
        textAlign: 'left',
        display: 'inline-block',
        width: '100%',
      },
      ALIGNCENTER: {
        textAlign: 'center',
        display: 'inline-block',
        width: '100%',
      },
      ALIGNRIGHT: {
        textAlign: 'right',
        display: 'inline-block',
        width: '100%',
      },
      COLORPICKER: {
        color: `${this.state.colorPicked}`,
      },
    }
    const exporterOptions = {
      // inlineStyles: {  in case you want to customize default styles to output something different
      //     ITALIC: {
      //         attributes: { class: 'foo' },
      //         style: { fontSize: 12 }
      //     },
      //     RED: { style: { color: '#900' } },
      // },
      inlineStyleFn: styles => {
        var styling = {
          element: 'span',
          style: {},
        }
        for (var it = styles.values(), val = null; (val = it.next().value); ) {
          styling.style = { ...styling.style, ...myStyleMap[val] }
        }
        return styling
      },
      blockRenderers: {
        atomic: block => {
          const entity = editorState
            .getCurrentContent()
            .getEntity(block.getEntityAt(0))
          const { src } = entity.getData()
          const type = entity.getType()
          let media

          switch (type) {
            case 'audio':
              media = `<audio controls src=${src} style="max-width: 100%;" />`
              break
            case 'image':
              media = `<img src=${src} style="max-width: 100%;" />`
              break
            case 'video':
              media = `<video controls src=${src} style="max-width: 100%;" />`
              break
            default:
              return null
          }

          return media
        },
      },
      blockStyleFn: block => {
        const type = block.getType()
        switch (type) {
          case 'blockquote':
            return {
              style: {
                ///use the myBlockquote style
                borderLeft: '5px solid #eee',
                color: '#666',
                fontFamily: '"Hoefler Text", "Georgia", serif',
                fontStyle: 'italic',
                margin: '16px 0',
                padding: '10px 20px',
              },
            }
          default:
            return null
        }
      },
    }

    if (this.props.insertHTML) {
      var insertedHTML = {}
      this.props.insertHTML(insertedHTML)
      if (insertedHTML.value != undefined) {
        console.log(insertedHTML)
        const blocksFromHTML = convertFromHTML(insertedHTML.value)
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        )
        insertedHTML.value = null
        this.setState({
          editorState: EditorState.createWithContent(state),
        })
      }
    }

    // calling setter of html
    this.innerHTML = stateToHTML(
      editorState.getCurrentContent(),
      exporterOptions,
    )

    let urlInput
    if (this.state.showURLInput) {
      urlInput = (
        <div>
          <input
            onChange={this.onURLChange}
            ref="urlInput"
            placeholder={`Enter ${this.state.urlType} link!`}
            type="text"
            className="media-input"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button
            onMouseDown={this.confirmMedia}
            className="btn btn-primary btn-sm gray no-margin">
            Confirm
          </button>
        </div>
      )
    }

    //Handling Placeholder better(on inserting a block & no words -> hide placeholder)
    let className = 'text-wrapper'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' hidePlaceholder'
      }
    }

    return (
      <div className="rich-editor-wrapper">
        <div className="options-wrapper">
          <div className="block-style-options" onClick={this.focus}>
            {blockTypeButtons.map(button => {
              return (
                <RenderBlockTypeButton
                  data={button}
                  editorState={editorState}
                  key={button.block}
                  onToggle={this.toggleBlockType}
                />
              )
            })}
          </div>
          <div className="custom-style-options">
            {customTypeButtons.map(button => {
              return (
                <RenderCustomTypeButton
                  data={button}
                  editorState={editorState}
                  key={button.custom}
                  onToggle={this.toggleCustomType}
                />
              )
            })}
          </div>
          <div className="inline-style-options" onClick={this.focus}>
            {inlineStyleButtons.map(button => {
              return (
                <RenderInlineStyleButton
                  data={button}
                  editorState={editorState}
                  key={button.style}
                  onToggle={this.toggleInlineStyle}
                />
              )
            })}
            <IMColorPickerSketch
              onChangeComplete={this.colorPickerChange}
              setColor={this.handleColorChange}
              defaultColor="gray"
            />
          </div>
          {urlInput}
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            customStyleMap={myStyleMap}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.myKeybindingFn}
            blockStyleFn={this.myBlockStyleFn}
            blockRendererFn={this.customBlockRenderer}
            blockRenderMap={extendedBlockRenderMap}
            placeholder="Write your email here!"
            ref="editor"
          />
        </div>
      </div>
    )
  }
}

const blockRenderMap = Map({
  // 'alignleft': {
  //     element: 'div'
  // },
  // 'alignmiddle': {
  //     element: 'div'
  // },
  // 'alignleft': {
  //     element: 'div'
  // }
})
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

class RenderInlineStyleButton extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { value, style, icon, extra } = this.props.data
    const editorState = this.props.editorState
    const onToggle = this.props.onToggle
    const inlineType = editorState.getCurrentInlineStyle()
    const alignments = ['ALIGNLEFT', 'ALIGNRIGHT', 'ALIGNCENTER']

    let className = 'btn-icon btn btn-primary btn-sm gray no-margin'
    if (inlineType.has(style) && !alignments.includes(style)) {
      className += ' active'
    }
    return (
      <button
        type="button"
        key={style}
        value={value}
        data-style={style}
        onMouseDown={onToggle}
        className={className}>
        <i className={icon}>{extra}</i>
      </button>
    )
  }
}
class RenderBlockTypeButton extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { value, block, icon, extra } = this.props.data
    const editorState = this.props.editorState
    const onToggle = this.props.onToggle
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    let className = 'btn-icon btn btn-primary btn-sm gray no-margin'
    if (blockType === block) {
      className += ' active'
    }

    return (
      <button
        type="button"
        key={block}
        value={value}
        data-block={block}
        onMouseDown={onToggle}
        className={className}>
        <i className={icon}>{extra}</i>
      </button>
    )
  }
}

class RenderCustomTypeButton extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { value, custom, icon, extra } = this.props.data
    const onToggle = this.props.onToggle

    let className = 'btn-icon btn btn-primary btn-sm gray no-margin'

    return (
      <button
        type="button"
        key={custom}
        value={value}
        onMouseDown={onToggle[custom]}
        className={className}>
        <i className={icon}>{extra}</i>
      </button>
    )
  }
}

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()

  let media
  if (type === 'audio') {
    media = <Audio src={src} />
  } else if (type === 'image') {
    media = <Image src={src} />
  } else if (type === 'video') {
    media = <Video src={src} />
  }

  return media
}

const Audio = props => {
  return <audio controls src={props.src} className="audio-block-style" />
}

const Image = props => {
  return <img src={props.src} className="image-block-style" />
}

const Video = props => {
  return <video controls src={props.src} className="video-block-style" />
}

const myStyles = {
  headerExtra: {
    fontSize: '1.1em',
    position: 'absolute',
    fontWeight: '1000',
    marginTop: '4px',
  },
}

const customTypeButtons = [
  {
    value: 'Image',
    custom: 'IMAGE',
    icon: 'fa fa-image',
  },
  {
    value: 'Video',
    custom: 'VIDEO',
    icon: 'fa fa-file-video-o',
  },
  {
    value: 'Audio',
    custom: 'AUDIO',
    icon: 'fa fa-file-audio-o',
  },
]

const inlineStyleButtons = [
  {
    // case 'alignleft': return "myAlignleft"
    // case 'alignmiddle': return "myAlignmiddle"
    // case 'alignright': return "myAlignright"
    value: 'Bold',
    style: 'BOLD',
    icon: 'fa fa-bold',
  },
  {
    value: 'Italic',
    style: 'ITALIC',
    icon: 'fa fa-italic',
  },
  {
    value: 'Underline',
    style: 'UNDERLINE',
    icon: 'fa fa-underline',
  },
  {
    value: 'Strikethrough',
    style: 'STRIKETHROUGH',
    icon: 'fa fa-strikethrough',
  },
  {
    value: 'Code',
    style: 'CODE',
    icon: 'fa fa-code',
  },
  {
    value: 'Highlight',
    style: 'HIGHLIGHT',
    icon: 'fa fa-flag-o',
  },
  {
    value: 'Alignleft',
    style: 'ALIGNLEFT',
    icon: 'fa fa-align-left',
  },
  {
    value: 'Aligncenter',
    style: 'ALIGNCENTER',
    icon: 'fa fa-align-center',
  },
  {
    value: 'Alignright',
    style: 'ALIGNRIGHT',
    icon: 'fa fa-align-right',
  },
]

const blockTypeButtons = [
  {
    value: 'Heading One',
    block: 'header-one',
    icon: 'fa fa-header',
    extra: <span style={myStyles.headerExtra}>1</span>,
  },
  {
    value: 'Heading Two',
    block: 'header-two',
    icon: 'fa fa-header',
    extra: <span style={myStyles.headerExtra}>2</span>,
  },
  {
    value: 'Heading Three',
    block: 'header-three',
    icon: 'fa fa-header',
    extra: <span style={myStyles.headerExtra}>3</span>,
  },
  {
    value: 'Unordered List',
    block: 'unordered-list-item',
    icon: 'fa fa-list-ul',
  },
  {
    value: 'Ordered List',
    block: 'ordered-list-item',
    icon: 'fa fa-list-ol',
  },
  {
    value: 'Blockquote',
    block: 'blockquote',
    icon: 'fa fa-quote-left',
  },
]

export default IMRichTextEditor
