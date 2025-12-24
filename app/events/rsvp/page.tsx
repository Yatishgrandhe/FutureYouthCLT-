'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AnimatedSection from '@/components/AnimatedSection'
import { supabase } from '@/lib/supabase'
import { STUDENT_NAMES } from '@/lib/constants'
import { CheckCircle, AlertCircle, Calendar } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string | null
  event_date: string | null
  location: string | null
}

function EventRSVPContent() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventId')
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    student_name: '',
    can_attend: true,
    notes: '',
  })
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  useEffect(() => {
    if (eventId) {
      loadEvent()
    } else {
      setLoading(false)
    }
  }, [eventId])

  const loadEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single()

      if (error) throw error
      setEvent(data)
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to load event: ' + error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventId) {
      setSubmitStatus({
        type: 'error',
        message: 'No event selected',
      })
      return
    }

    setSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .insert([
          {
            event_id: eventId,
            student_name: formData.student_name,
            can_attend: formData.can_attend,
            notes: formData.notes || null,
          },
        ])

      if (error) throw error

      setSubmitStatus({
        type: 'success',
        message: 'RSVP submitted successfully!',
      })
      setFormData({ student_name: '', can_attend: true, notes: '' })
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit RSVP. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    )
  }

  if (!event && eventId) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-display text-primary-green-light mb-4">
                Event Not Found
              </h2>
              <p className="text-gray-300 mb-6">
                The event you're looking for doesn't exist.
              </p>
              <a
                href="/events"
                className="inline-block px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                         text-black font-semibold rounded-lg transition-colors"
              >
                Back to Events
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display text-primary-green-light mb-4">
              Event RSVP
            </h1>
            {event && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {event.title}
                </h2>
                {event.description && (
                  <p className="text-gray-300 mb-4">{event.description}</p>
                )}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                  {event.event_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.event_date).toLocaleDateString()}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8">
              <h3 className="text-2xl font-display text-primary-green-light mb-6">
                RSVP Form
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="student_name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <select
                    id="student_name"
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors"
                    required
                  >
                    <option value="">Select your name</option>
                    {STUDENT_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Can you attend? *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="can_attend"
                        checked={formData.can_attend === true}
                        onChange={() => setFormData({ ...formData, can_attend: true })}
                        className="w-5 h-5 text-primary-green-medium focus:ring-primary-green-light"
                        required
                      />
                      <span className="text-gray-300">Yes, I can attend</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="can_attend"
                        checked={formData.can_attend === false}
                        onChange={() => setFormData({ ...formData, can_attend: false })}
                        className="w-5 h-5 text-primary-green-medium focus:ring-primary-green-light"
                        required
                      />
                      <span className="text-gray-300">No, I cannot attend</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors resize-none"
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-2 ${
                      submitStatus.type === 'success'
                        ? 'bg-primary-green-medium/20 border border-primary-green-medium text-primary-green-light'
                        : 'bg-red-500/20 border border-red-500 text-red-400'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !eventId}
                  className="w-full px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           text-black font-semibold rounded-lg transition-colors duration-200 
                           flex items-center justify-center gap-2"
                >
                  {submitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default function EventRSVP() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <EventRSVPContent />
    </Suspense>
  )
}

