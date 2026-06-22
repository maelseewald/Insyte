import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Leistungen from '@/components/sections/Leistungen'
import Portfolio from '@/components/sections/Portfolio'
import UeberMich from '@/components/sections/UeberMich'
import Kontakt from '@/components/sections/Kontakt'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Leistungen />
        <Portfolio />
        <UeberMich />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
