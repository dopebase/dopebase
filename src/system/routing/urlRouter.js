import hookSystem from '../triggers/HookSystem'

export const componentForRoutes = async (routes, searchParams) => {
  // Given the routes, return the component that needs to be rendered

  if ((routes?.length ?? 0) === 0) {
    return <div>home</div>
  }

  if (routes[0] === 'api') {
    return <div>Unspecified api</div>
  }

  const component = await hookSystem.executeHook(
    'urlParsing',
    null,
    routes,
    searchParams,
  )

  // const component =
  //   require('../../themes/classic/pages/blog/SingleArticle').default

  if (component) {
    return component
  }
  return <div>No component found for routes {JSON.stringify(routes)}</div>
}
