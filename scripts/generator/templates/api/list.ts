// import instamobileDB from '../../../db'
import { NextResponse } from 'next/server'
import { list } from '../../../../../core/db'

export async function GET(req) {
  const res = NextResponse
  const result = await list('$lowercaseplural$', 'order by updated_at desc')
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
