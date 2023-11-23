// import instamobileDB from '../../../db'
import { NextResponse } from 'next/server'
import { updateOne } from '../../../../../core/db'

export async function POST(req) {
  try {
    const body = await req.json()

    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const result = await updateOne('comments', id, body)
    if (result) {
      return NextResponse.json({ success: true }, { status: 200 })
    }
    return NextResponse.json(
      { error: 'An error has occurred. Please try again' },
      { status: 400 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 200 })
  }
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
