import { getAllPlugins } from '../plugins'

class HookSystem {
  constructor() {
    this.hooks = {}
    this.registerHook('beforeRenderAdminPanel')
    this.registerHook('urlParsing')
    this.registerPluginHooks()
  }

  async registerPluginHooks() {
    const plugins = await getAllPlugins()
    for (var i = 0; i < plugins.length; i++) {
      const plugin = plugins[i]
      try {
        const { registerHooks } = await import(
          `../../plugins/${plugin.id}/hooks`
        )
        registerHooks()
        console.log(`Registered hooks for plugin ${plugin.id}`)
      } catch (e) {
        console.error(`Error while registering hooks for plugin ${plugin.id}`)
        console.error(e)
      }
    }
  }
  // Register a new hook with a unique name
  registerHook(hookName) {
    this.hooks[hookName] = []
  }

  // Add a callback function to a hook
  addHookCallback(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback)
    } else {
      throw new Error(`Hook ${hookName} does not exist.`)
    }
  }

  // Execute all callback functions for a hook
  executeHook(hookName, initialValue, ...args) {
    var resValue = initialValue
    if (this.hooks[hookName]) {
      this.hooks[hookName].forEach(callback => {
        resValue = callback(resValue, ...args)
      })
      console.log('return', resValue)
      return resValue
    } else {
      throw new Error(`Hook ${hookName} does not exist.`)
    }
  }
}

const hookSystem = new HookSystem()

export default hookSystem
