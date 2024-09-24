// components/Footer.js
'use client'
import { createBrowserClient } from '@supabase/ssr'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Footer() {
  const [signingIn, setSigningIn] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  const router = useRouter()
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const serviceAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  const supabase = createBrowserClient(supabaseUrl, serviceAnonKey)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim() === '' || password.trim() === '') return
    setSigningIn(true)
    // Check if the user is on hrm_users table
    const { data: user, error: userError } = await supabase
      .from('ccb_users')
      .select()
      .eq('email', email)
      .eq('status', 'Active')
    if (userError) console.error(userError)
    if (user && user.length > 0) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        setError('Credentials provided is incorrect.')
        setSigningIn(false)
      } else {
        router.push('/admin/pages')
        router.refresh()
      }
    } else {
      setError('This is account is currently inactive.')
      setSigningIn(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log({ error })
    }

    setLoggedIn(false)
    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    ;(async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })()
  }, [])

  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0 mb-6 md:mb-0">
            <a
              href="/page/10"
              className="hover:text-blue-500 transition duration-300"
            >
              Privacy Policy
            </a>
            {!loggedIn && (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="hover:text-blue-500 transition duration-300"
              >
                Login
              </button>
            )}
            {loggedIn && (
              <>
                <a
                  href="/admin/pages"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Admin Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-500 transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Copyright */}
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} City College of Bayugan. All
            rights reserved.
          </p>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            {error && (
              <p className="mb-2 text-red-600 bg-red-100 text-sm px-2 py-1 font-medium">
                {error}
              </p>
            )}
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 text-gray-800 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 text-gray-800 border border-gray-300 rounded"
                required
              />
              <button
                disabled={signingIn}
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setLoginModalOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}
