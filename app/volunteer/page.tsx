'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { supabase } from '@/lib/supabase'
import { STUDENT_NAMES } from '@/lib/constants'
import { Clock, Plus, CheckCircle } from 'lucide-react'

interface VolunteerHours {
  student_name: string
  total_hours: number
}

export default function VolunteerPage() {
  const [selectedStudent, setSelectedStudent] = useState('')
  const [approvedHours, setApprovedHours] = useState<VolunteerHours[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (selectedStudent) {
      loadApprovedHours()
    } else {
      setApprovedHours([])
      setLoading(false)
    }
  }, [selectedStudent])

  const loadApprovedHours = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('volunteer_hours')
        .select('student_name, hours')
        .eq('student_name', selectedStudent)
        .eq('approved', true)

      if (error) throw error

      // Calculate total hours per student
      const hoursMap = new Map<string, number>()
      data?.forEach((item) => {
        const current = hoursMap.get(item.student_name) || 0
        hoursMap.set(item.student_name, current + parseFloat(item.hours.toString()))
      })

      const totals: VolunteerHours[] = Array.from(hoursMap.entries()).map(([name, hours]) => ({
        student_name: name,
        total_hours: hours,
      }))

      setApprovedHours(totals)
    } catch (error: any) {
      console.error('Failed to load approved hours:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTotalHours = () => {
    return approvedHours.find((h) => h.student_name === selectedStudent)?.total_hours || 0
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display text-primary-green-light mb-4">
              Volunteer Portal
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              View your approved volunteer hours and submit new hours
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8">
              <h2 className="text-2xl font-display text-primary-green-light mb-6">
                Select Your Name
              </h2>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-primary-green-medium/30 
                         rounded-lg text-white focus:outline-none focus:border-primary-green-light 
                         transition-colors"
              >
                <option value="">Select your name</option>
                {STUDENT_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {selectedStudent && (
              <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border border-primary-green-medium/20 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{selectedStudent}</h3>
                    {loading ? (
                      <p className="text-gray-400">Loading...</p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary-green-light" />
                        <span className="text-2xl font-bold text-primary-green-light">
                          {getTotalHours().toFixed(1)} hours
                        </span>
                        <span className="text-gray-400">approved</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/volunteer/submit"
                    className="px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                             text-black font-semibold rounded-lg transition-colors duration-200 
                             flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Submit Hours
                  </Link>
                </div>

                {!loading && getTotalHours() > 0 && (
                  <div className="mt-4 pt-4 border-t border-primary-green-medium/20">
                    <div className="flex items-center gap-2 text-primary-green-light">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">All hours have been approved</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="text-center">
              <Link
                href="/volunteer/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                         text-black font-semibold rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                Submit New Volunteer Hours
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

