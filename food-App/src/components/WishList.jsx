import React from 'react'
import Header from './Header'
import i1 from "../assets/i1.png"

const WishList = () => {
    return (

        <div className='w-screen  h-[800px] flex flex-col bg-primary'>
            <Header />

            <div className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>
                <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />

                <h1 className='text-lg'>Wish List</h1>
                
                <div className='grid grid-cols-3 gap-4 py-5'>

                    {/* First Column-1 */}
                    <div className="col-span-2  ">

                       

                        <div className="   m-8 p-8 flex md:bg-orange rounded-3xl ">



                            {/* 2nd box inner 1st grid */}
                            <div className=' grid grid-cols-3'>
                                <div className="col-span-1 ">
                                    {/* <div className=" sm:w-2/3"> */}

                                    <div className='flex gap-4'>


                                    </div>

                                    <div className=" flex gap-3">
                                        <div className=' border border-gray-300 rounded-xl'>
                                            <img className="rounded-xl md:border-white md:border-solid md:border-4 w-150 " src={i1} />
                                        </div>

                                        <div className='py-4 '>
                                            <h3 className="text-textColor text-sm font-semibold ">Icecream</h3>
                                            <h3 className="font-bold text-xs ">Chocolate</h3>
                                            <p className='text-sm '>1 item - <span className=' text-green-500'>$</span>15</p>

                                            <div className='flex gap-10'>
                                            <button className='bg-blue-400 rounded-full px-3'> <span className='text-white'>-</span> </button>
                                            <button className='bg-blue-400 rounded-full px-3'> <span className='text-white'>+</span> </button>
                                            </div>
                                           
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/*2nd box Inner 2nd grid  */}
                            <div className='col-span-2 gap-5 space-y-10 pt-16 '>

                                {/* <button className="px-4 text-white text-bl border-lg border border-blue-500 rounded-lg  pt-1 bg-blue-500">Review</button> */}

                            </div>
                        </div>

                    </div>

                    <div className="col-span-1 pl-4">
                    <button className="px-5  text-white text-bl border-lg border border-blue-500 rounded-lg  bg-blue-500">Review</button>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default WishList