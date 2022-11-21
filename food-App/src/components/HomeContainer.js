import React from 'react'
import { MdDeliveryDining } from 'react-icons/md'
import heroBg from "../assets/heroBg.png"
import { heroData } from '../utils/data'


const HomeContainer = () => {
  return (
    <>
      <section className='grid grid-col-1 md:grid-cols-2 gap-2 w-full' id="home">
        <div className=' py-2 flex-1 flex flex-col items-start justify-center gap-4'>
          <div className='flex items-center gap-2 justify-center bg-orange-100
          px-4 py-2 rounded-full 
         '>
            <p className='text-base text-orange-600'>  Bike Delivery  </p>
            <div className='w-7 h-7 rounded-full overflow-hidden bg-white overflow hodden drop-shadow-xl'>

              <MdDeliveryDining className='w-full h-full object-contain' />
            </div>

          </div>
          <p className='text-[2.5rem] lg:text-[5rem] font-bold tracking-wide text-headingColor'>
            The Fastest Delivery in
            <span className='text-orange-600 text-[3rem] lg:text-[5rem] px-3'>Your City</span>
          </p>

          <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
          Epic Delivery is a dynamic app that works to deliver things instantly to the users.
           Although not limited to food delivery, this app works perfectly if users want to
            avail food from the restaurants that do not do a home delivery within the user’s area.
            It enables users to browse through its updated menus, check out the restaurant and 
            meal pictures, and also get to know about the other users’ reviews.
          </p>

            {/* <button type="button"
              className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto
            px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out 
            duration-100'
            >
              Order Now
            </button> */}

        </div>

        {/* second Grid Part of home */}

        <div className='py-2 flex-1 flex items-center relative'>
          <img
            src={heroBg}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          />

          <div className='w-full h-full absolute top-0 left-0 flex 
          items-center justify-center lg:px-32 py-4 gap-4 flex-wrap'>

            {heroData && heroData.map(n => (

              <div key={n.id}
                className='lg:w-190   p-4 bg-cardOverlay
              backdrop-blur-md rounded-3xl 
              flex flex-col items-center justify-center drop-shadow-lg'>
                <img
                  src={n.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 " alt="i1"
                />
                <p className='text-base lg:text-xl font-semibold
                 text-textColor mt-2 lg:mt-4'
                >
                  {n.name}
                </p>

                <p className='text-[12px] lg:text-sm text-lighttextGray
                  font-semibold my-1 lg:my-3 '
                >
                  {n.decp}
                </p>

                <p className='text-sm font-semibold text-headingColor'>
                  <span className='text-xs text-green-500'>$ </span>
                  {n.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeContainer