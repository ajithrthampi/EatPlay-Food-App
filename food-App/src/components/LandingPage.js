import React from 'react'
import { Link } from 'react-router-dom'
import landingimage from "../assets/landingimage.png"

const LandingPage = () => {
    return (
        <div>
                <div className='hidden md:block sm:block '>
                    <div className="flex justify-end">
                    <img className='h-[46rem] w-[70rem] absolute '
                        src={landingimage}
                        alt=""/>
                </div>
                </div>

            <div className='bg-yellow'>

                <div className="min-h-screen flex flex-col text-black lg:pt-12">
                    {/* <img className='absolute w-full h-full object-cover mix-blend-overlay' src={LoginImage} alt="/" /> */}


                    <main className="container mx-auto px-6 pt-28 flex-1 md:text-left text-center">


                        <h1 className="text-4xl md:text-6xl lg:text-7xl md:pl-11  font-light mb-8 text-white ">Safe Food
                        </h1>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl  md:pl-11  font-bold mb-8 text-white ">Delivery</h1>


                        <div className="flex flex-col md:flex-row justify-center mb-4"></div>

                        <div className=" pt-9 opacity-75 font-bold text-gray-700 text-xl  uppercase md:px-12">
                            Popular cities in India  and
                        </div>
                        <div className=" pt-2 opacity-75 font-bold text-white text-xl md:px-12 ">
                            Jaipur Delhi Assam
                        </div>
                        <br/>
                        <br/>
                        <div className="text-lg  md:text-2xl lg:text-3xl py-2 px-7  md:px-10 lg:py-4 lg:px-8 lg:ml-12 md:ml-9 text-white bg-orange-500 w-fit mx-auto mb-8 rounded-3xl">
                           <Link to="/login"> Start Ordering</Link>
                        </div>

                    </main>

                    {/* <footer className="container mx-auto p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <p className="mb-4 md:mb-0 md:text-xl md:px-12">Built with 💖 by Tyler Potts</p>

                            <div className="flex -mx-6">
                                <a href="#" className="mx-3 hover:opacity-80 duration-150">About us</a>
                                |
                                <a href="#" className="mx-3 hover:opacity-80 duration-150">Privacy</a>
                                |
                                <a href="#" className="mx-3 hover:opacity-80 duration-150">Contact</a>
                            </div>
                        </div>
                    </footer> */} </div>
            </div>
        </div>
    )
}

export default LandingPage
