import { leadershipTeam } from "@/data/leadership";

const Leadership = () => {
    return (
        <section className="py-24 bg-gray-950 text-white relative" id="leadership">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Our Leadership Team
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Meet the dedicated students driving our mission forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leadershipTeam.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-gray-900/40 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-800 hover:border-blue-500/30 backdrop-blur-md relative overflow-hidden"
                        >
                            {/* Card Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-xl text-white transform group-hover:scale-110 transition-transform duration-300">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-4">
                                    {member.role}
                                </p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5"
                                >
                                    <svg
                                        className="w-4 h-4 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {member.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
