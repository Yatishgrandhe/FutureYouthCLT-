import AnimatedSection from '@/components/AnimatedSection'

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display text-primary-green-light mb-4">
              About Us
            </h1>
            <p className="text-xl text-primary-green-medium">
              Network Established 2025
            </p>
          </div>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection delay={0.1}>
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-6">
              Our Mission
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Future Youth CLT is dedicated to creating a vibrant network of young leaders who are 
                committed to making a positive impact in their communities. We believe in the power 
                of connection, collaboration, and collective action to drive meaningful change.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Our mission is to empower the next generation by providing opportunities for personal 
                growth, leadership development, and community engagement. We strive to create an 
                inclusive environment where every young person can thrive and contribute to building 
                a better future.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Vision Section */}
        <AnimatedSection delay={0.2}>
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-6">
              Our Vision
            </h2>
            <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                          border border-primary-green-medium/20 rounded-lg p-8 md:p-10">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
                We envision a future where young leaders are equipped with the skills, knowledge, and 
                networks they need to create lasting positive change in their communities and beyond.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Through our network, we aim to foster a culture of innovation, empathy, and action 
                that extends far beyond our immediate community, creating a ripple effect of positive 
                impact across generations.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Values Section */}
        <AnimatedSection delay={0.3}>
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-8">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border border-primary-green-medium/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-green-light mb-3">
                  Leadership
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We believe in developing strong, ethical leaders who lead by example and inspire 
                  others to reach their full potential.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border border-primary-green-medium/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-green-light mb-3">
                  Community
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We are committed to building strong, supportive communities where everyone feels 
                  valued, heard, and empowered.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border border-primary-green-medium/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-green-light mb-3">
                  Innovation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We embrace new ideas, creative solutions, and innovative approaches to address 
                  the challenges facing our communities.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10 
                            border border-primary-green-medium/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-green-light mb-3">
                  Impact
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We measure our success by the positive impact we create in the lives of individuals 
                  and the communities we serve.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Goals Section */}
        <AnimatedSection delay={0.4}>
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-8">
              Our Goals
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-green-medium rounded-full mt-2"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  <strong className="text-primary-green-light">Expand Our Network:</strong> Connect with 
                  more young leaders and create opportunities for collaboration and growth.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-green-medium rounded-full mt-2"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  <strong className="text-primary-green-light">Develop Leadership Skills:</strong> Provide 
                  workshops, mentorship, and resources to help members develop their leadership potential.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-green-medium rounded-full mt-2"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  <strong className="text-primary-green-light">Create Community Impact:</strong> Organize 
                  events and initiatives that make a tangible difference in our communities.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-green-medium rounded-full mt-2"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  <strong className="text-primary-green-light">Foster Inclusivity:</strong> Ensure our 
                  network is welcoming and accessible to all young people, regardless of background or 
                  experience.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-green-medium rounded-full mt-2"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  <strong className="text-primary-green-light">Build Lasting Relationships:</strong> Create 
                  a supportive community where members can form meaningful connections that last a lifetime.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* History Section */}
        <AnimatedSection delay={0.5}>
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-green-dark/20 to-primary-green-medium/20 
                          border border-primary-green-medium/30 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-display text-primary-green-light mb-4">
                Our Story
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
                Future Youth CLT was established in 2025 with a vision to create a network that 
                empowers young leaders to make a difference.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                From our founding, we have been committed to building a community where young people 
                can grow, learn, and lead together. We are just getting started, and we're excited 
                about the future we're building together.
              </p>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}

