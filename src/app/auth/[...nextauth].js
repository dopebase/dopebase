// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import db from '../db'
import { unescapeString } from '../../../utils'

const jwt = require('jsonwebtoken')

const createProviderUserIfNeeded = async (profile, account) => {
  const { access_token, provider } = account
  const { email, name, login, avatar_url } = profile
  const existingUser = await db.getUserByEmail(email)
  if (existingUser !== null) {
    // If user already exists, we update the access tokens and github metadata
    const metadata = unescapeString(existingUser.metadata)
    var metadataObj = JSON.parse(metadata) ?? {}
    metadataObj['githubProfile'] = profile
    const newUser = await db.updateOne('users', existingUser.id, {
      access_token,
      provider,
      metadata: JSON.stringify(metadataObj),
    })
    console.log('updated user with new access token')
    return
  }

  // If user does not exist, we create it
  const user = await db.register(
    email,
    access_token,
    name?.length > 0 ? name : login,
    '',
    '',
    avatar_url,
    'githubUser',
    provider,
    access_token,
    JSON.stringify({ githubProfile: profile }),
  )

  console.log('User created')
}

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_APP_CLIENT_ID,
        clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
        authorization: {
          params: {
            scope: 'repo,read:user,user:email',
          },
        },
        // profile(profile) {
        //   console.log(profile)
        //   return {
        //     id: profile.id.toString(),
        //     name: profile.name,
        //     firstName: profile.login,
        //     email: profile.email,
        //     profilePictureURL: profile.avatar_url,
        //   }
        // },
      }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        await createProviderUserIfNeeded(profile, account)
        return true
      },
      async redirect({ url, baseUrl }) {
        return baseUrl
      },
      async session({ session, user, token }) {
        const { jwtToken } = token
        return { ...session, jwtToken }
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        const secretOrKey = 'fheqwhHUOHD7DSFNVewuifhw'
        const { email } = token
        const existingUser = await db.getUserByEmail(email)
        // Sign token
        const signPromise = new Promise(resolve => {
          jwt.sign(
            { id: existingUser.id },
            secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              resolve(token)
            },
          )
        })
        const jwtToken = await signPromise
        return { ...token, jwtToken: `Bearer ${jwtToken}` }
      },
    },
  })
