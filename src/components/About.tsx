const About = () => {
    return (
        <section id="about" className="py-20 bg-gray-950 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Who We Are
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        FutureYouthCLT is a student-led non-profit organization dedicated to fostering leadership, creativity, and community engagement among youth in the Charlotte area. We believe that every young person has the potential to make a positive impact on the world, and we provide the platform, resources, and mentorship to help them realize that potential.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto text-blue-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Innovation</h3>
                            <p className="text-gray-400 text-sm">Encouraging creative problem solving and forward-thinking ideas.</p>
                        </div>
                        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto text-purple-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Community</h3>
                            <p className="text-gray-400 text-sm">Building strong connections and giving back to our local area.</p>
                        </div>
                        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto text-pink-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Leadership</h3>
                            <p className="text-gray-400 text-sm">Developing skills to lead with empathy, integrity, and vision.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
