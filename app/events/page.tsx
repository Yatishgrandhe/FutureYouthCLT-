'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { supabase } from '@/lib/supabase'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string | null
  event_date: string | null
  location: string | null
  created_at: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display text-primary-green-light mb-4">
              Events
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for exciting events and activities throughout the year
            </p>
          </div>
        </AnimatedSection>

        {/* Upcoming Events Section */}
        <AnimatedSection delay={0.2}>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-8 text-center">
              Upcoming Events
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                              border border-primary-green-medium/20 rounded-lg p-8 md:p-10">
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-primary-green-medium mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-primary-green-light mb-4">
                      Stay Tuned!
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      We're planning exciting events for 2025. Check back soon for updates on 
                      upcoming workshops, networking sessions, community service projects, and more.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Follow us on social media or sign up to receive event notifications.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                              border border-primary-green-medium/20 rounded-lg p-6 hover:border-primary-green-medium/50 
                              transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-primary-green-light mb-2">
                          {event.title}
                        </h3>
                        {event.description && (
                          <div className="text-gray-300 mb-3 whitespace-pre-line">
                            {event.description.split('\n').map((line, idx) => {
                              if (line.startsWith('Meeting Slides:') || line.startsWith('http')) {
                                const url = line.includes('http') ? line.match(/https?:\/\/[^\s]+/)?.[0] : null;
                                if (url) {
                                  return (
                                    <div key={idx} className="mt-2">
                                      <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-green-light hover:text-primary-green-medium underline inline-flex items-center gap-2"
                                      >
                                        View Meeting Slides
                                        <span className="text-xs">↗</span>
                                      </a>
                                    </div>
                                  );
                                }
                              }
                              return <p key={idx}>{line}</p>;
                            })}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          {event.event_date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.event_date).toLocaleDateString()}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/events/rsvp?eventId=${event.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                               text-black font-semibold rounded-lg transition-colors"
                    >
                      <Users className="w-5 h-5" />
                      RSVP for this Event
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </AnimatedSection>

        {/* Past Events Section */}
        <AnimatedSection delay={0.3}>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-8 text-center">
              Past Events
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border border-primary-green-medium/20 rounded-lg p-8 md:p-10">
                <div className="text-center py-12">
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    As a newly established network in 2025, we're just getting started! 
                    Our event history will grow as we continue to serve our community.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Check back here to see our event gallery as we host more activities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Event Registration CTA */}
        <AnimatedSection delay={0.4}>
          <section>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary-green-dark/20 to-primary-green-medium/20 
                            border border-primary-green-medium/30 rounded-lg p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-4">
                  Want to Stay Updated?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Sign up to receive notifications about upcoming events and opportunities 
                  to get involved with Future Youth CLT.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfWoWxWV_Pg2R_3JeQcjKU-OJG_xkbATDqB85t_CnW1KjquTg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-primary-green-medium hover:bg-primary-green-light 
                             text-black font-bold text-lg rounded-lg transition-all duration-300 
                             transform hover:scale-105 shadow-lg shadow-primary-green-medium/50"
                >
                  Sign Up Here
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}

