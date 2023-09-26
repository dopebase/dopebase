const jwt = require('jsonwebtoken')

import { NextResponse } from 'next/server'
import { getAllPluginsAndUpdateIfNeeded } from '../../../../system/plugins'
import { getUserByID } from '../../../../core/db/users'

export async function GET(req) {
  console.log('GET /api/system/plugins')
  const res = NextResponse

  const token = req.headers.get('authorization')
  const secretOrKey = process.env.JWT_SECRET
  const decoded = jwt.verify(token.split(' ')[1], secretOrKey)
  const userID = decoded.id
  if (!userID) {
    return res.status(404).json({ error: 'invalid request' })
  }

  const user = await getUserByID(userID)
  if (!user || user.role !== 'admin') {
    return res.json({ error: 'Access denied' }, { status: 400 })
  }

  const plugins = await getAllPluginsAndUpdateIfNeeded()

  if (plugins) {
    return res.json(
      {
        plugins,
      },
      { status: 200 },
    )
  }
  return res.json({ error: 'Access denied' }, { status: 400 })
}
