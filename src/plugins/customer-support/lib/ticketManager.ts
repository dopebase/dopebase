import { getOne, insertOne } from '../../../core/db'
import { getUserByEmail } from '../../../core/db/users'

async function createThread(
  email?: string,
  name?: string,
  message?: string,
  subject?: string,
  isPublic?: boolean,
) {
  const createdDate = Math.floor(new Date().getTime() / 1000).toString()

  const thread = await insertOne('ticket_threads', {
    number: Math.floor(Math.random() * 1000000000).toString(),
    author_email: email,
    author_name: name,
    subject: subject,
    created_at: createdDate,
    updated_at: createdDate,
    is_public: isPublic,
    message_count: 1,
  })

  const user = await getUserByEmail(email ?? 'noemail')

  var messageData = {
    thread_id: thread.id,
    sender_email: email,
    from_original_poster: true,
    message: message,
    created_at: createdDate,
    updated_at: createdDate,
  }
  let finalMessageData = user?.id
    ? { ...messageData, user_id: user.id }
    : messageData
  const messageObj = await insertOne('ticket_messages', finalMessageData)
  return { thread, message: messageObj }
}

async function addMessage(
  email: string,
  threadId: string,
  message: string,
  fromOriginalPoster: boolean,
) {
  const createdDate = Math.floor(new Date().getTime() / 1000).toString()

  const user = await getUserByEmail(email ?? 'noemail')

  var messageData = {
    thread_id: threadId,
    sender_email: email,
    from_original_poster: fromOriginalPoster,
    message: message,
    created_at: createdDate,
    updated_at: createdDate,
  }
  let finalMessageData = user?.id
    ? { ...messageData, user_id: user.id }
    : messageData
  const messageObj = await insertOne('ticket_messages', finalMessageData)
  return messageObj
}

async function addMessageAsUser(
  userId: string,
  threadId: string,
  message: string,
) {
  const createdDate = Math.floor(new Date().getTime() / 1000).toString()

  const user = await getOne('users', userId)
  const thread = await getOne('ticket_threads', threadId)
  if (user && thread) {
    const messageObj = await insertOne('ticket_messages', {
      thread_id: threadId,
      sender_email: user.email,
      from_original_poster: thread.author_email === user.email,
      message: message,
      created_at: createdDate,
      updated_at: createdDate,
      user_id: user.id,
    })
    return messageObj
  }
}

export { createThread, addMessage, addMessageAsUser }
