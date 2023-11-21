import { NextResponse } from 'next/server'
import { seedArticleIdeas } from '../../../lib/ai/seeder/seed'
import { findOne } from '../../../../../core/db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { prompt, category } = body
    const topic = await findOne('settings', { name: 'description' })
    console.log(body)
    await seedArticleIdeas(prompt, topic ?? 'general topic', category)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 200 })
  }
}
