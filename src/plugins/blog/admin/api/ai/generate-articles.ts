import { NextResponse } from 'next/server'
import { seedArticles } from '../../../lib/ai/seeder/seed'

export async function POST(req) {
  try {
    const body = await req.json()
    await seedArticles()
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 200 })
  }
}
