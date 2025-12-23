'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import LeadershipCard from '@/components/LeadershipCard'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const leadership = [
  {
    name: 'Vefa Simon (Allie)',
    role: 'President',
    email: 'vefasimon01@gmail.com',
  },
  {
    name: 'Manu Panta',
    role: 'Vice President',
    email: 'manasvipanta444@gmail.com',
  },
  {
    name: 'Nia Tilokani',
    role: 'Secretary',
    email: 'tilokaninia@gmail.com',
  },
  {
    name: 'Yatish Grandhe',
    role: 'Secretary',
    email: 'Yatish.grandhe@gmail.com',
  },
  {
    name: 'Anurag NC',
    role: 'Event Manager',
    email: 'anuragnc2@gmail.com',
  },
  {
    name: 'Pradyumna',
    role: 'Event Manager',
    email: 'pradyumnabrhs3@gmail.com',
  },
  {
    name: 'Trupthi Hosamani',
    role: 'Outreach Director',
    email: 'Trupthi3119@gmail.com',
  },
  {
    name: 'Sai R',
    role: 'Social Media Manager',
    email: 'Thiruindusai@gmail.com',
  },
  {
    name: 'Soumya Sonavani',
    role: 'Social Media Manager',
    email: 'sonavanisoumya27@gmail.com',
  },
  {
    name: 'Sharannya Singh',
    role: 'Faculty Director',
    email: 'sharannya1900@gmail.com',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ])

      if (error) {
        throw error
      }

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display text-primary-green-light mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Get in touch with us - we'd love to hear from you!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-display text-primary-green-light mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                             rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                             transition-colors resize-none"
                    required
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
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           text-black font-semibold rounded-lg transition-colors duration-200 
                           flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* Leadership Directory */}
          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-2xl md:text-3xl font-display text-primary-green-light mb-6">
                Leadership Directory
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Feel free to reach out directly to any member of our leadership team. 
                Click on their email to send them a message.
              </p>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {leadership.map((member, index) => (
                  <LeadershipCard
                    key={member.email}
                    name={member.name}
                    role={member.role}
                    email={member.email}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Sign Up CTA */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-green-dark/20 to-primary-green-medium/20 
                          border border-primary-green-medium/30 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-4">
                Want to Join Us?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Sign up to become part of the Future Youth CLT network and start making a difference today.
              </p>
              <a
                href="https://linktr.ee/futureyouthclt?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
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
        </AnimatedSection>
      </div>
    </div>
  )
}

