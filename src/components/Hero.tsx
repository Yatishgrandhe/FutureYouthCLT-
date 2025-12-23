import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden pt-20">
            {/* Background Gradient Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
                <div className="mb-8 relative w-48 h-48 md:w-56 md:h-56">
                    <Image
                        src="/logo.png"
                        alt="FutureYouthCLT Logo"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-sm">
                        FutureYouthCLT
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed font-light">
                    Empowering the next generation of leaders through{" "}
                    <span className="text-blue-400 font-medium">innovation</span>,{" "}
                    <span className="text-purple-400 font-medium">community</span>, and{" "}
                    <span className="text-pink-400 font-medium">action</span>.
                </p>

                <div className="flex flex-col md:flex-row gap-6">
                    <a
                        href="https://linktr.ee/futureYouthCLT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-blue-500/50"
                    >
                        Join the Movement
                    </a>
                    <a
                        href="#about"
                        className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
