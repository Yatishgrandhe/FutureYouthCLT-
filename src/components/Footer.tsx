import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-950 py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            FutureYouthCLT
                        </Link>
                        <p className="text-gray-400 mt-2 text-sm max-w-md">
                            Empowering the next generation of leaders through innovation, community service, and hands-on learning experiences.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                            <span className="sr-only">Instagram</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 3.808-.06h.63zm1.514 10.96a1.515 1.515 0 010-2.121 1.515 1.515 0 012.121 0 1.515 1.515 0 010 2.121 1.515 1.515 0 01-2.121 0zM8 12a4 4 0 118 0 4 4 0 01-8 0zm4.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Add more social icons as needed */}
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} FutureYouthCLT. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
