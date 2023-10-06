const viewFormKeyword = '{/* Insert all view form fields here */}'
const viewFormTemplateDataByType = {
  string: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className={\`\${styles.LockedFieldValue} LockedFieldValue\`}>{originalData.user}</span>
            </div>
    `,
  boolean: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <IMToggleSwitchComponent isChecked={originalData.user} disabled />
            </div>
    `,
  photo: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                {originalData.user && (
                    <IMPhoto openable className="photo" src={originalData.user} />
                )}
            </div>
    `,
  photos: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                {originalData.user && originalData.user.map((url) =>
                    <IMPhoto openable className="photo" src={url} />
                )}
            </div>
    `,
  multimedia: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                {originalData.user && (
                    <IMMultimediaComponent 
                        openable 
                        className="multimedia" 
                        src={originalData.user} 
                    />
                )}
            </div>
    `,
  multimedias: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                {originalData.user && originalData.user.map((data) =>
                    <IMMultimediaComponent 
                        openable 
                        className="multimedia" 
                        src={data.url} 
                        type={data.mime} 
                    />
                )}
            </div>
    `,
  date: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="LockedFieldValue">{originalData.user && formatDate(originalData.user)}</span>
            </div>
    `,
  location: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                {originalData.user && originalData.user.address && (
                    <span className="LockedFieldValue">{originalData.user.address}</span>
                )}
            </div>
    `,
  simpleLocation: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                {originalData.user && (
                    <span className="LockedFieldValue" style={{verticalAlign: "bottom"}}>
                        lat: {originalData.user && originalData.user.lat}<br/>
                        lng: {originalData.user && originalData.user.lng}
                    </span>
                )}
            </div>
    `,
  address: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="FormArrayField">
                    { originalData.user && Object.keys(originalData.user).map( key => {
                        if(typeof originalData.user[key] === "string" || typeof originalData.user[key] === "number") {
                            return (<li>{key}: {originalData.user[key]}</li>)} 
                        }
                    )}
                </span>
            </div>
    `,
  color: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                { originalData.user && <IMColorBoxComponent color={originalData.user} /> }
            </div>
    `,
  colors: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                { originalData.user && originalData.user.map( myColor => <IMColorBoxComponent color={myColor} /> )}
            </div>
    `,
  array: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="FormArrayField">
                    { originalData.user && originalData.user.map( data => {
                        return (<li>{data}</li>)} 
                    )}
                </span>
            </div>
    `,
  object: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <span className="FormArrayField">
                    { originalData.user && Object.keys(originalData.user).map( key => {
                        return (<li>{key}: {originalData.user[key]}</li>)} 
                    )}
                </span>
            </div>
    `,
  typeahead: (foreignKeySchema, displayName, fieldName) => `
             <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>${displayName}</label>
                <IMForeignKeyComponent id={originalData.${fieldName}} apiRouteName="admin/${global.pluginName}/${foreignKeySchema.singularName}" titleKey="${foreignKeySchema.titleFieldKey}" />
            </div>
    `,
  multiTypeaheadId: (foreignKeySchema, displayName, fieldName) => `
             <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>${displayName}</label>
                <IMForeignKeysIdComponent ids={originalData.${fieldName}} apiRouteName="admin/${global.pluginName}/${foreignKeySchema.singularName}" titleKey="${foreignKeySchema.titleFieldKey}" />
            </div>
    `,
  multiTypeahead: (foreignKeySchema, displayName, fieldName) => `
             <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>${displayName}</label>
                <IMForeignKeysComponent data={originalData.${fieldName}} apiRouteName="admin/${global.pluginName}/${foreignKeySchema.singularName}" titleKey="${foreignKeySchema.titleFieldKey}" />
            </div>
    `,
  code: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <CodeMirror
                  className="editor FormTextField"
                  type="user"
                  value={beautify_html(originalData.user, {
                    indent_size: 2,
                  })}
                  name="user"
                  options={{
                    theme: 'darcula',
                    lineNumbers: true,
                    mode: 'htmlmixed',
                    readonly: true,
                  }}
                />
            </div>
    `,
  markdown: `
            <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                <div className={\`\${styles.FormTextField} \${styles.markdownEditorReadOnly} markdownEditorReadOnly FormTextField\`}>
                  <Editor
                    defaultValue={originalData?.user ?? ''}
                    readOnly={true}
                  />
                </div>
            </div>
    `,
}

module.exports = {
  viewFormTemplateDataByType,
  viewFormKeyword,
}
