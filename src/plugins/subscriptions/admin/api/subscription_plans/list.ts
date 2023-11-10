// import instamobileDB from '../../../db'
import { NextResponse } from 'next/server'
import { list } from '../../../../../core/db'

export async function GET(req) {
  const res = NextResponse
  const url = new URL(req.url)
  const limit = url.searchParams.get('limit')
  const search = url.searchParams.get('search')
  console.log('GET request for list with params', { limit, search })
  const result = await list('subscription_plans', { limit, search })
  return NextResponse.json(result, { status: 200 })

  // const articles = await instamobileDB.list(
  //   'articles',
  //   'order by updated_at desc',
  // )

  // if (articles) {
  //   return res.status(200).json({
  //     articles,
  //   })
  // }
  // return res.status(400).json({ error: 'listing errored out' })
}
