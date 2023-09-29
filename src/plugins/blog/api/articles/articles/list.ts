// import instamobileDB from '../../../db'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const res = NextResponse

  return NextResponse.json({ ok: 'It works2' }, { status: 200 })

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
