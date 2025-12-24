'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import { supabase } from '@/lib/supabase'
import { STUDENT_NAMES } from '@/lib/constants'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface Event {
  id: string
  title: string
  event_date: string | null
}

export default function VolunteerSubmit() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    event_id: '',
    student_name: '',
    hours: '',
  })
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, event_date')
        .order('event_date', { ascending: false })

      if (error) throw error
      setEvents(data || [])
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to load events: ' + error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const hoursNum = parseFloat(formData.hours)
      if (isNaN(hoursNum) || hoursNum <= 0) {
        throw new Error('Please enter a valid number of hours')
      }

      const { error } = await supabase
        .from('volunteer_hours')
        .insert([
          {
            event_id: formData.event_id || null,
            student_name: formData.student_name,
            hours: hoursNum,
            approved: false,
          },
        ])

      if (error) throw error

      setSubmitStatus({
        type: 'success',
        message: 'Volunteer hours submitted successfully! Pending approval.',
      })
      setFormData({ event_id: '', student_name: '', hours: '' })
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit volunteer hours. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display text-primary-green-light mb-4">
              Submit Volunteer Hours
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Submit your volunteer hours for approval
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="event_id" className="block text-sm font-medium text-gray-300 mb-2">
                    Event *
                  </label>
                  {loading ? (
                    <div className="text-gray-400">Loading events...</div>
                  ) : (
                    <select
                      id="event_id"
                      value={formData.event_id}
                      onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                               rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                               transition-colors"
                      required
                    >
                      <option value="">Select an event</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.title} {event.event_date ? `(${new Date(event.event_date).toLocaleDateString()})` : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

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
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Hours *
                  </label>
                  <input
                    type="number"
                    id="hours"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors"
                    required
                    placeholder="e.g., 2.5"
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
                  disabled={submitting || loading}
                  className="w-full px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           text-black font-semibold rounded-lg transition-colors duration-200 
                           flex items-center justify-center gap-2"
                >
                  {submitting ? 'Submitting...' : 'Submit Volunteer Hours'}
                </button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

