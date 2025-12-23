import AnimatedSection from '@/components/AnimatedSection'
import LeadershipCard from '@/components/LeadershipCard'

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

export default function Leadership() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display text-primary-green-light mb-4">
              Our Leadership Team
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Meet the dedicated individuals leading Future Youth CLT forward
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {leadership.map((member, index) => (
              <LeadershipCard
                key={member.email}
                name={member.name}
                role={member.role}
                email={member.email}
                delay={index * 0.1}
              />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display text-primary-green-light mb-4">
                Want to Get in Touch?
              </h2>
              <p className="text-gray-300 mb-6">
                Feel free to reach out to any of our leadership team members via email. 
                We're always happy to hear from you!
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-primary-green-medium hover:bg-primary-green-light 
                         text-black font-semibold rounded-lg transition-colors duration-200"
              >
                Visit Contact Page
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

