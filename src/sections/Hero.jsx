import React from 'react'
import { words } from '../constants'
import Button from '../components/Button'
import DownloadButton from '../components/DownloadButton'
import HeroExperience from '../components/HeroModels/HeroExperience'
import { useGSAP }  from '@gsap/react';
import gsap from 'gsap';
import AnimatedCounter from '../components/AnimatedCounter';
import ProfileImage from '../components/ProfileImage';


const Hero = () => {
  useGSAP (() => {
    gsap.fromTo('.hero-text h1',
      {
        y:50,
        opacity:0
      },
      {
        y:0,
        opacity:1,
        stagger:0.2,
        duration:1,
        ease:'power2.inout'
      },
    )
  })
  return (
    <section id='hero' className='relative overflow-hidden'>
      <div className='absolute top-0 left-0 z-10'>
        <img src='/images/bg.png' alt='background' />
      </div>

      <div className='hero-layout'>
        {/*LEFT: HERO CONTENT*/}
        <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5'>
          <div className='flex md:flex-row flex-col md:items-center items-center gap-6 mb-10'>
            <ProfileImage />
            <div className='md:text-left text-center'>
              <h2 className='text-white-50 md:text-3xl text-2xl font-semibold'>Vikas T G</h2>
              <p className='text-white-50/80 md:text-lg text-base mt-1'>Full Stack Developer</p>
              <a href="mailto:vikastg2000@gmail.com" className='text-white-50/70 md:text-base text-sm mt-1 hover:text-white-50 transition-colors duration-300'>
                vikastg2000@gmail.com
              </a>
            </div>
          </div>

          <div className='flex flex-col gap-7'>
            <div className='hero-text'>
              <h1>
                Shaping
                <span className='slide'>
                  <span className='wrapper'>
                    {words.map((word) => (
                      <span
                        key={word.text}
                        className='flex items-center md:gap-3 gap-1 pb-2'
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className='xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50'
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
              <p className='text-white-50 md:text-xl relative z-10 
                  pointer-events-none'>
                    Hi, I'm Vikas T G, a developer based in India with a passion for code. 
                  </p>
                  <div className='flex md:flex-row flex-col gap-4'>
                    <Button 
                      className='md:w-60 md:h-16 w-60 h-12'
                      id='button'
                      text='See my work'
                    />
                    <DownloadButton 
                      className='md:w-60 md:h-16 w-60 h-12 cta-wrapper'
                      text='Download Resume'
                      link='/Vikas_T_G_Resume.pdf'
                    />
                  </div>
          </div>
        </header>
        {/*RIGHT: 3D MODEL*/}
        <figure>
          <div className='hero-3d-layout'>
          <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  )
}

export default Hero