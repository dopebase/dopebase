// import instamobileDB from '../../../db'
import { NextResponse } from 'next/server'
import { getOne } from '../../../../../core/db'

export async function GET(req) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  const result = await getOne('article_tags', id)
  if (result) {
    return NextResponse.json(result, { status: 200 })
  }
  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

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
