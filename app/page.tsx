import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import LeadershipCard from '@/components/LeadershipCard'

export default function Home() {
  const featuredLeadership = [
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
      name: 'Sharannya Singh',
      role: 'Faculty Director',
      email: 'sharannya1900@gmail.com',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <AnimatedSection>
          <div className="flex justify-center items-center mb-8">
            <Image
              src="/image.png"
              alt="Future Youth CLT"
              width={400}
              height={400}
              priority
              className="object-contain mx-auto"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-primary-green-light mb-4">
            FUTURE YOUTH
          </h1>
          <p className="text-xl md:text-2xl text-primary-green-medium mb-8">
            NETWORK EST. 2025
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Empowering the next generation of leaders through connection, collaboration, and community impact.
          </p>
          <a
            href="https://linktr.ee/futureyouthclt?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary-green-medium hover:bg-primary-green-light 
                       text-black font-bold text-lg rounded-lg transition-all duration-300 
                       transform hover:scale-105 shadow-lg shadow-primary-green-medium/50"
          >
            Want to Sign Up? Do It Here
          </a>
        </AnimatedSection>
      </section>

      {/* Mission Preview Section */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display text-primary-green-light mb-8 text-center">
              Our Mission
            </h2>
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                Future Youth CLT is dedicated to creating a vibrant network of young leaders who are 
                committed to making a positive impact in their communities. We believe in the power 
                of connection, collaboration, and collective action to drive meaningful change.
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
                Through our programs, events, and initiatives, we provide opportunities for youth to 
                develop leadership skills, build meaningful relationships, and contribute to building a 
                better future for all.
              </p>
              <Link
                href="/about"
                className="inline-block text-primary-green-light hover:text-primary-green-medium 
                         font-semibold transition-colors duration-200"
              >
                Learn More About Us →
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Featured Leadership Section */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection delay={0.4}>
          <h2 className="text-4xl md:text-5xl font-display text-primary-green-light mb-12 text-center">
            Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {featuredLeadership.map((member, index) => (
              <LeadershipCard
                key={member.email}
                name={member.name}
                role={member.role}
                email={member.email}
                delay={index * 0.1}
              />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/leadership"
              className="inline-block px-6 py-3 border-2 border-primary-green-medium 
                       hover:border-primary-green-light text-primary-green-light 
                       hover:text-primary-green-medium font-semibold rounded-lg 
                       transition-all duration-200"
            >
              View All Leadership
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedSection delay={0.6}>
          <div className="bg-gradient-to-r from-primary-green-dark/20 to-primary-green-medium/20 
                        border border-primary-green-medium/30 rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Future Youth CLT and become part of a network that's shaping the future.
            </p>
            <a
              href="https://linktr.ee/futureyouthclt?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary-green-medium hover:bg-primary-green-light 
                         text-black font-bold text-lg rounded-lg transition-all duration-300 
                         transform hover:scale-105 shadow-lg shadow-primary-green-medium/50"
            >
              Sign Up Now
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}

