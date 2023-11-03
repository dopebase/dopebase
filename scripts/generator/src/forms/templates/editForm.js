const editFormKeyword = '{/* Insert all edit form fields here */}'
const editFormTemplateDataByType = {
  string: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <input
                            className={\`\${styles.FormTextField} FormTextField\`}
                            type="user"
                            name="user"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.user}
                        />
                        <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  boolean: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <IMToggleSwitchComponent isChecked={modifiedNonFormData.user} onSwitchChange={() => handleSwitchChange(modifiedNonFormData["user"], "user")} />
                        <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  photo: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        {modifiedNonFormData.user && (
                            <IMPhoto openable dismissable className="photo" src={modifiedNonFormData.user} onDelete={(src) => handleDeletePhoto(src, "user", false) } />
                        )}
                        <input className="FormFileField" id="user" name="user" type="file" onChange={(event) => {
                            handleImageUpload(event, "user", false);
                        }} />
                    </div>
    `,
  photos: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        {modifiedNonFormData.user && modifiedNonFormData.user.map((url) =>
                            <IMPhoto openable dismissable className="photo" src={url} onDelete={(src) => handleDeletePhoto(src, "user", true) } />
                        )}
                        <input className="FormFileField" multiple id="user" name="user" type="file" onChange={(event) => {
                            handleImageUpload(event, "user", true);
                        }} />
                    </div>
    `,
  multimedia: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        {modifiedNonFormData.user && (
                            <IMMultimediaComponent 
                                openable 
                                dismissable 
                                className="multimedia" 
                                src={modifiedNonFormData.user} 
                                onDelete={(src) => handleMultimediaDelete(src, "user", false) } 
                            />
                        )}
                        <input className="FormFileField" id="user" name="user" type="file" onChange={(event) => {
                            handleMultimediaUpload(event, "user", false);
                        }} />
                    </div>
    `,
  multimedias: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        {modifiedNonFormData.user && modifiedNonFormData.user.map( (data) => 
                            <IMMultimediaComponent 
                                openable 
                                dismissable 
                                className="multimedia" 
                                src={data.url} 
                                type={data.mime} 
                                onDelete={(src) => handleMultimediaDelete(src, "user", true) } 
                            />
                        )}
                        <input className="FormFileField" multiple id="user" name="user" type="file" onChange={(event) => {
                            handleMultimediaUpload(event, "user", true);
                        }} />
                    </div>
    `,
  date: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <IMDatePicker
                            selected={modifiedNonFormData.user}
                            onChange={(toDate) => onDateChange(toDate, "user")}
                        />
                    </div>
    `,
  location: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <LocationPicker
                            initialValue={modifiedNonFormData.user && modifiedNonFormData.user.address}
                            onLocationChange={(addressObject) => onLocationChange(addressObject, "user")}                    
                        />
                    </div>
    `,
  simpleLocation: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <span style={{verticalAlign: "top", display:'inline-block'}}>
                            <div style={{padding:'0px 0px 3px 20px'}}>
                                lat: {modifiedNonFormData.user && modifiedNonFormData.user.lat}<br/>
                                lng: {modifiedNonFormData.user && modifiedNonFormData.user.lng}<br/>
                            </div>
                            <LocationPicker
                                onLocationChange={(addressObject) => onSimpleLocationChange(addressObject, "user")}                    
                            />
                        </span>
                    </div>
    `,
  address: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <div className={\`\${styles.FormArrayField} FormArrayField\`}>
                            <IMObjectInputComponent 
                                keyPlaceholder="User Field" 
                                valuePlaceholder="User Value" 
                                handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                                handleDelete={(key) => handleObjectDelete(key, "user")} 
                                data={modifiedNonFormData["user"]}
                            />
                            <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  color: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <div className="colorField">
                            <IMColorBoxComponent color={modifiedNonFormData.user} handleDelete={() => handleColorDelete("user")}/>
                            <IMColorPicker 
                                onAccept={(color) => handleColorChange(color, "user")}
                                defaultColor='red'
                            />
                        </div>
                        <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  colors: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <div className="colorField">
                            <IMColorsContainer data={modifiedNonFormData.user} handleDelete={(index) => handleColorsDelete(index, "user")}/>
                            <IMColorPicker 
                                onAccept={(colors) => handleColorsChange(colors, "user")}
                                defaultColor='red'
                            />
                        </div>
                        <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  array: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <div className={\`\${styles.FormArrayField} FormArrayField\`}>
                            <IMArrayInputComponent handleClick={(value) => handleArrayInput(value, "user")} handleDelete={(index) => handleArrayDelete(index, "user")} data={modifiedNonFormData["user"]}/>
                            <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  object: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <div className={\`\${styles.FormArrayField} FormArrayField\`}>
                            <IMObjectInputComponent 
                            keyPlaceholder="User Name" 
                            valuePlaceholder="User Value" 
                            handleClick={(key, value) => handleObjectInput(key, value, "user")} 
                            handleDelete={(key) => handleObjectDelete(key, "user")} 
                            data={modifiedNonFormData["user"]}
                        />
                            <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                                {errors.user && touched.user && errors.user}
                            </p>
                        </div>
                    </div>
    `,
  code: `
                    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
                        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>
                        <CodeMirror
                            className="editor FormTextField"
                            type="user"
                            value={modifiedNonFormData.user}
                            name="user"
                            options={{
                                theme: 'darcula',
                                lineNumbers: true,
                                mode: 'htmlmixed',
                            }}
                            onBeforeChange={(editor, data, value) => {
                                onCodeChange(value, 'user')
                            }}
                        />
                        <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
                            {errors.user && touched.user && errors.user}
                        </p>
                    </div>
    `,
  markdown: `
    <div className={\`\${styles.FormFieldContainer} FormFieldContainer\`}>
        <label className={\`\${styles.FormLabel} FormLabel\`}>User</label>

        <div className={\`\${styles.FormEditorContainer} FormEditorContainer\`}>
          <Editor
            defaultValue={modifiedNonFormData.user}
            onChange={value => {
              onCodeChange(value(), 'user')
            }}
          />
        </div>
        <p className={\`\${styles.ErrorMessage} ErrorMessage\`}>
            {errors.user && touched.user && errors.user}
        </p>
    </div>
`,
}

module.exports = {
  editFormKeyword,
  editFormTemplateDataByType,
}
