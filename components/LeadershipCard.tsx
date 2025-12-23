'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

interface LeadershipCardProps {
  name: string
  role: string
  email: string
  delay?: number
}

export default function LeadershipCard({ name, role, email, delay = 0 }: LeadershipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-primary-green-dark/20 to-primary-green-medium/20 
                 border border-primary-green-medium/30 rounded-lg p-6 
                 backdrop-blur-sm hover:border-primary-green-light/50 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-primary-green-light mb-2">{name}</h3>
      <p className="text-sm uppercase tracking-wider text-primary-green-medium mb-4">{role}</p>
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary-green-light 
                   transition-colors duration-200 group"
      >
        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="truncate">{email}</span>
      </a>
    </motion.div>
  )
}

