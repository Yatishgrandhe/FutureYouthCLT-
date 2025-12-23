'use client'

import { useState, useEffect } from 'react'
import { supabase, ADMIN_PASSWORD } from '@/lib/supabase'
import AnimatedSection from '@/components/AnimatedSection'
import { Lock, Mail, User, MessageSquare, Calendar, Eye, EyeOff } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  read: boolean
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      loadMessages()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadMessages()
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const loadMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/admin/messages?password=${encodeURIComponent(ADMIN_PASSWORD)}`
      )
      if (!response.ok) {
        throw new Error('Failed to load messages')
      }
      const { messages: data } = await response.json()
      setMessages(data || [])
    } catch (err: any) {
      setError('Failed to load messages: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages?password=${encodeURIComponent(ADMIN_PASSWORD)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !read }),
      })
      if (!response.ok) {
        throw new Error('Failed to update message')
      }
      loadMessages()
    } catch (err: any) {
      setError('Failed to update message: ' + err.message)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <AnimatedSection>
          <div className="max-w-md w-full mx-4">
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8">
              <div className="text-center mb-8">
                <Lock className="w-16 h-16 text-primary-green-light mx-auto mb-4" />
                <h1 className="text-3xl font-display text-primary-green-light mb-2">
                  Admin Access
                </h1>
                <p className="text-gray-400">Enter password to view messages</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                               rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                               transition-colors pr-10"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-green-light"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                           text-black font-semibold rounded-lg transition-colors duration-200"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-display text-primary-green-light mb-2">
                Message Inbox
              </h1>
              <p className="text-gray-400">
                {messages.length} total message{messages.length !== 1 ? 's' : ''}
                {unreadCount > 0 && (
                  <span className="ml-2 text-primary-green-light">
                    • {unreadCount} unread
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_authenticated')
                setIsAuthenticated(false)
              }}
              className="px-4 py-2 border border-primary-green-medium hover:border-primary-green-light 
                       text-primary-green-light rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <AnimatedSection key={message.id} delay={0.1}>
                <div
                  className={`bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border rounded-lg p-6 transition-all ${
                    message.read
                      ? 'border-primary-green-medium/20'
                      : 'border-primary-green-medium/50 bg-primary-green-medium/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-primary-green-light" />
                        <h3 className="text-xl font-semibold text-white">{message.name}</h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-primary-green-medium text-black text-xs font-semibold rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${message.email}`}
                            className="hover:text-primary-green-light transition-colors"
                          >
                            {message.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(message.created_at)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => markAsRead(message.id, message.read)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        message.read
                          ? 'bg-primary-green-medium/20 text-primary-green-light hover:bg-primary-green-medium/30'
                          : 'bg-primary-green-medium text-black hover:bg-primary-green-light'
                      }`}
                    >
                      {message.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-lg font-semibold text-primary-green-light mb-2">
                      {message.subject}
                    </h4>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 text-red-400 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

