'use server'
 
import { cookies } from 'next/headers'
 
export async function createCookie(data: string) {
  cookies().set({
    name: 'page',
    value: data,
    httpOnly: true,
  })
}