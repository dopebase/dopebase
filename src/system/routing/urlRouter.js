import hookSystem from '../triggers/HookSystem'

export const componentForRoutes = async routes => {
  // Given the routes, this method returns the component that needs to be rendered

  if ((routes?.length ?? 0) === 0) {
    return <div>home</div>
  }

  if (routes[0] === 'api') {
    return <div>api</div>
  }

  // Check if the first route is a plugin
  // const component = hookSystem.executeHook('urlParsing', null, routes)

  const component = await import(
    '../../themes/classic/pages/blog/SingleArticle'
  )

  if (component) {
    // return await component.default
    console.log('yyyyy')
    console.log(component.default)
    return component.default
  }
  return <div>No component found for routes {JSON.stringify(routes)}</div>
}
