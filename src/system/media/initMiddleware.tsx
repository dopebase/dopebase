import { NextResponse, type NextRequest } from 'next/server'

export default function initMiddleware(middleware: any) {
  return (req: NextRequest) =>
    new Promise((resolve, reject) => {
      middleware(req, NextResponse, result => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
