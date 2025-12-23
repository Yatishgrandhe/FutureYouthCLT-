import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-gray-950 min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <About />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
