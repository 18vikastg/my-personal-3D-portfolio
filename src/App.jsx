import React from 'react'
import Hero from './sections/Hero'
import ShowCaseSection from './sections/ShowCaseSection'
import NavBar from './components/NavBar'
import FeatureCards from './sections/FeatureCards'
import ExperienceSection from './sections/ExperienceSection'
import TechStack from './sections/TechStack'
const  App= () => {
  return (
    <>
    <NavBar />
    <Hero />
    <ShowCaseSection />
    <FeatureCards />
    <ExperienceSection />
    <TechStack />
    </>
  )
}

export default App