import React from 'react'

const About = () => {
  return (
    <div className='p-9 h-screen flex flex-col gap-5 justify-center items-center text-black rounded-lg shadow-lg'>
     <div className="flex flex-col gap-4 items-center p-5 w-full max-w-6xl sm:max-w-6xl md:max-w-4xl">
       <h1 className='text-3xl font-bold'>About Us</h1>
      <p className='mt-4 text-center'>
        Welcome to One211 — your trusted data-driven platform for community insights and resource connectivity. At One211, we specialize in organizing, managing, and delivering vital information that empowers individuals and organizations to access the support they need with clarity and precision.
      </p>
      <p className='mt-2 text-center'>
        Our mission is to streamline access to local services, educational tools, and community engagement opportunities through powerful data solutions. We believe in leveraging technology to strengthen connections, break down informational barriers, and build a smarter, more unified community
      </p>
     </div>
    </div>
  )
}

export default About
