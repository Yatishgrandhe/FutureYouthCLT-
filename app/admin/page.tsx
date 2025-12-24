'use client'

import { useState, useEffect } from 'react'
import { supabase, ADMIN_PASSWORD } from '@/lib/supabase'
import AnimatedSection from '@/components/AnimatedSection'
import { Lock, Mail, User, MessageSquare, Calendar, Eye, EyeOff, Users, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  read: boolean
}

interface RSVP {
  id: string
  event_id: string
  student_name: string
  can_attend: boolean
  notes: string | null
  created_at: string
  events: {
    title: string
    event_date: string | null
  } | null
}

interface VolunteerHour {
  id: string
  event_id: string | null
  student_name: string
  hours: number
  approved: boolean
  approved_at: string | null
  created_at: string
  events: {
    title: string
  } | null
}

type Tab = 'messages' | 'rsvps' | 'volunteer'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [volunteerHours, setVolunteerHours] = useState<VolunteerHour[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      loadAllData()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [activeTab, isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadAllData()
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const loadAllData = async () => {
    await Promise.all([loadMessages(), loadRSVPs(), loadVolunteerHours()])
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

  const loadRSVPs = async () => {
    try {
      const response = await fetch(
        `/api/admin/rsvps?password=${encodeURIComponent(ADMIN_PASSWORD)}`
      )
      if (!response.ok) throw new Error('Failed to load RSVPs')
      const { rsvps: data } = await response.json()
      setRsvps(data || [])
    } catch (err: any) {
      console.error('Failed to load RSVPs:', err)
    }
  }

  const loadVolunteerHours = async () => {
    try {
      const response = await fetch(
        `/api/admin/volunteer-hours?password=${encodeURIComponent(ADMIN_PASSWORD)}`
      )
      if (!response.ok) throw new Error('Failed to load volunteer hours')
      const { volunteerHours: data } = await response.json()
      setVolunteerHours(data || [])
    } catch (err: any) {
      console.error('Failed to load volunteer hours:', err)
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

  const approveVolunteerHours = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(
        `/api/admin/volunteer-hours?password=${encodeURIComponent(ADMIN_PASSWORD)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, approved }),
        }
      )
      if (!response.ok) throw new Error('Failed to update volunteer hours')
      loadVolunteerHours()
    } catch (err: any) {
      setError('Failed to update volunteer hours: ' + err.message)
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
  const pendingHours = volunteerHours.filter((h) => !h.approved).length

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-display text-primary-green-light mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">
                Manage messages, RSVPs, and volunteer hours
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

        {/* Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex gap-4 mb-8 border-b border-primary-green-medium/20">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'messages'
                  ? 'text-primary-green-light border-primary-green-light'
                  : 'text-gray-400 border-transparent hover:text-primary-green-medium'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Messages {unreadCount > 0 && `(${unreadCount})`}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('rsvps')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'rsvps'
                  ? 'text-primary-green-light border-primary-green-light'
                  : 'text-gray-400 border-transparent hover:text-primary-green-medium'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Event RSVPs ({rsvps.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'volunteer'
                  ? 'text-primary-green-light border-primary-green-light'
                  : 'text-gray-400 border-transparent hover:text-primary-green-medium'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Volunteer Hours {pendingHours > 0 && `(${pendingHours} pending)`}
              </div>
            </button>
          </div>
        </AnimatedSection>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <>
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
          </>
        )}

        {/* RSVPs Tab */}
        {activeTab === 'rsvps' && (
          <>
            {rsvps.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No RSVPs yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rsvps.map((rsvp) => (
                  <AnimatedSection key={rsvp.id} delay={0.1}>
                    <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                                  border border-primary-green-medium/20 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <User className="w-5 h-5 text-primary-green-light" />
                            <h3 className="text-xl font-semibold text-white">{rsvp.student_name}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                rsvp.can_attend
                                  ? 'bg-primary-green-medium text-black'
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {rsvp.can_attend ? 'Attending' : 'Not Attending'}
                            </span>
                          </div>
                          {rsvp.events && (
                            <div className="text-gray-300 mb-2">
                              <strong>Event:</strong> {rsvp.events.title}
                              {rsvp.events.event_date && (
                                <span className="ml-2 text-gray-400">
                                  ({new Date(rsvp.events.event_date).toLocaleDateString()})
                                </span>
                              )}
                            </div>
                          )}
                          {rsvp.notes && (
                            <div className="bg-black/30 rounded-lg p-3 mt-2">
                              <p className="text-gray-300 text-sm">{rsvp.notes}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(rsvp.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </>
        )}

        {/* Volunteer Hours Tab */}
        {activeTab === 'volunteer' && (
          <>
            {volunteerHours.length === 0 ? (
              <div className="text-center py-20">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No volunteer hours submitted yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {volunteerHours.map((hours) => (
                  <AnimatedSection key={hours.id} delay={0.1}>
                    <div
                      className={`bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                                border rounded-lg p-6 transition-all ${
                        hours.approved
                          ? 'border-primary-green-medium/20'
                          : 'border-yellow-500/50 bg-yellow-500/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <User className="w-5 h-5 text-primary-green-light" />
                            <h3 className="text-xl font-semibold text-white">{hours.student_name}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                                hours.approved
                                  ? 'bg-primary-green-medium text-black'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}
                            >
                              {hours.approved ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Approved
                                </>
                              ) : (
                                'Pending Approval'
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-300 mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary-green-light" />
                              <span className="font-semibold">{hours.hours} hours</span>
                            </div>
                            {hours.events && (
                              <div>
                                <strong>Event:</strong> {hours.events.title}
                              </div>
                            )}
                          </div>
                          {hours.approved && hours.approved_at && (
                            <div className="text-sm text-gray-400">
                              Approved on {formatDate(hours.approved_at)}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                            <Calendar className="w-4 h-4" />
                            Submitted: {formatDate(hours.created_at)}
                          </div>
                        </div>
                        {!hours.approved && (
                          <button
                            onClick={() => approveVolunteerHours(hours.id, true)}
                            className="px-4 py-2 bg-primary-green-medium hover:bg-primary-green-light 
                                     text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </>
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

