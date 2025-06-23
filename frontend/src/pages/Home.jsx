import React from 'react'
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { Process } from '../components/sections/Process';
import { Impact } from '../components/sections/Impact';
import { CTA } from '../components/sections/CTA';
import { Footer } from '../components/sections/Footer';
import { Navbar } from '../components/sections/Navbar';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
}