'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function handleFormLogout() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (token) {
    cookieStore.delete('token')
  }

  redirect('/login')
}
