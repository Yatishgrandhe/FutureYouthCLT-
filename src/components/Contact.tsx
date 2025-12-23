const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Get in Touch
                    </h2>
                    <p className="text-gray-400">
                        Have questions or want to join us? Send us a message!
                    </p>
                </div>

                <div className="max-w-xl mx-auto bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-xl">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all placeholder-gray-500"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all placeholder-gray-500"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all placeholder-gray-500 resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
