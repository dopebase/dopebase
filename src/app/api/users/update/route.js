import { NextResponse } from 'next/server'
import { updateOne } from '../../../../core/db'
import { updatePassword } from '../../../../core/db/auth'
import { getAuthenticatedUser } from '../../../../admin/utils/getAuthenticatedUser'

export async function POST(req) {
  try {
    const body = await req.json()

    const user = await getAuthenticatedUser(req)
    if (!user) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    var { password, confirmPassword } = body
    var data = { ...body }
    // remove passwords fields
    delete data.password
    delete data.confirmPassword
    const result = await updateOne('users', user.id, data)
    if (result && password?.length > 5 && password === confirmPassword) {
      // we update auth data
      const res = await updatePassword(user.id, password)
      if (res) {
        return NextResponse.json({ success: true }, { status: 200 })
      } else {
        return NextResponse.json(
          {
            error:
              'An error has occurred when updating the password. Please try again',
          },
          { status: 400 },
        )
      }
    }
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
}
