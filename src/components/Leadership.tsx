import { leadershipTeam } from "@/data/leadership";

const Leadership = () => {
    return (
        <section className="py-20 bg-gray-900 text-white" id="leadership">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Our Leadership Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leadershipTeam.map((member, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 backdrop-blur-sm bg-opacity-80"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wide">
                                    {member.role}
                                </p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <svg
                                        className="w-4 h-4 group-hover:text-blue-400 transition-colors"
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
