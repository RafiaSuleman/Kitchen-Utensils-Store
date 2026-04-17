import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className="relative w-full h-[80vh]">
      
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Kitchen Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Smart Tools for Modern Kitchens
        </h1>

        <p className="text-sm md:text-lg mb-6 max-w-xl">
          Upgrade your cooking experience with high-quality, smart kitchen essentials.
        </p>

        <Link
          href="/products"
          className="bg-[#915719] hover:bg-[#7a4a15] transition text-white text-sm px-6 py-3 rounded-lg"
        >
          Shop Now
        </Link>

      </div>
    </div>
  )
}

export default Hero