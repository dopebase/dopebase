'use strict'

module.exports = {
  outputPath: (pluginName = global.pluginName) =>
    `../../src/plugins/${pluginName}/admin/pages/`,
  templatesPath: './templates/',
}
