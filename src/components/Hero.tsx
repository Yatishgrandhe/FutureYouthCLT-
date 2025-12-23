import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-700/20 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
                <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64 animate-fade-in-up">
                    <Image
                        src="/logo.png"
                        alt="FutureYouthCLT Logo"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-up delay-100">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        FutureYouthCLT
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 animate-fade-in-up delay-200">
                    Empowering the next generation of leaders through innovation, community, and action.
                </p>

                <a
                    href="https://linktr.ee/futureYouthCLT?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 animate-fade-in-up delay-300"
                >
                    Sign Up Now
                </a>
            </div>
        </section>
    );
};

export default Hero;
