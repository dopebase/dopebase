import React from 'react'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryZoomContainer,
} from 'victory'

///props data has to be {[{date:Date, data: data}, .... ]}
///this.props.height and this.props.width are for aspect ratio
///only this.props.width changes the size of the Chart!

class IMChartZoomable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data.sort((a, b) => a.date - b.date),
      dates: this.props.data.map(data => data.date).sort((a, b) => a - b),
      width: this.props.width ? this.props.width : '600px',
      height: this.props.height ? this.props.height : '470px',
      display: this.props.display ? this.props.display : 'inline-block',
      padding: this.props.padding ? this.props.padding : '10px',
      title: this.props.title ? this.props.title : '',
    }
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain })
  }

  render() {
    const state = this.state
    const max = Math.max(...state.data.map(data => data.data))
    console.log(state.data)

    const styling = {
      placeholder: {
        width: state.width,
        // height: `${state.height}px`,
        display: state.display,
        padding: state.padding,
      },
    }
    const widthInt = parseInt(state.width)
    const heightInt = parseInt(state.height)
    return (
      <div style={styling.placeholder}>
        <VictoryChart
          width={widthInt}
          height={heightInt}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }>
          <VictoryAxis
            dependentAxis
            domain={{ y: [0, Math.floor(max + max / 10 + 2)] }}
            // tickFormat={ y => Math.round(y) }
            tickFormat={y => '$' + y}
          />
          <VictoryAxis fixLabelOverlap />
          <VictoryLine
            style={{
              data: { stroke: 'tomato' },
            }}
            data={state.data}
            x="date"
            y="data"
          />
        </VictoryChart>
        <VictoryChart
          padding={{
            top: 0,
            left: widthInt / 8,
            right: widthInt / 8,
            bottom: widthInt / 12,
          }}
          width={widthInt}
          height={heightInt / 4}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={state.zoomDomain}
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }>
          <VictoryAxis tickFormat={x => new Date(x).getFullYear()} />
          <VictoryLine
            style={{
              data: { stroke: 'tomato' },
            }}
            data={state.data}
            x="date"
            y="data"
          />
        </VictoryChart>
        {state.title}
      </div>
    )
  }
}

export default IMChartZoomable
