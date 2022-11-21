import React, { useState } from 'react'
import Header from './Header'
import avatar11 from "../assets/avatar11.png"
import { MdPayment } from 'react-icons/md'
import { Link } from 'react-router-dom'

const YourOrder  = () => {

    const [showOption, setShowOption] = useState(false)
    const [inbox, setInbox] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const handleClick = () => {
        setShowOption(!showOption)
    }
    const handleInbox = () => {
        setInbox(!inbox)
    }

    const handleFavorite = () => {
        setFavorite(!favorite)
    }


    return (
        <div className='w-screen  h-[800px] flex flex-col bg-primary'>
            <Header />

            <div className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>
                <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />


                <div className='grid grid-cols-3 gap-4 py-5'>
                    {/* First Column-1 */}
                    <div className="col-span-1 ">

                        <div className='flex'>

                            <img className='w-10  object-cover' src={avatar11} alt="logo" />
                            <div className='p-1'>Ajith R Thampi</div>

                        </div>

                        <div className='text-bold text-sm mt-2'> Balance</div>

                        <div className='p-4 flex gap-4 '>
                            <MdPayment className=' text-2xl text-blue-400' />
                            <div className='text-sm'>Paypal</div>
                            <div className='flex gap-2'> <span className='text-green-500 '> $ </span> 56 </div>

                        </div>
                        {/* <hr className="my-6 h-px bg-gray-300 border-0 dark:bg-gray-900" /> */}

                        {/* dropdown */}

                        <div>
                            <div className="">


                                <div className="relative inline-block  text-left pt-12">
                                    <div >
                                        <button
                                            onClick={handleClick}
                                            type="button"
                                            className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            Transaction

                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>


                                    {showOption && (
                                        <div className="absolute left-36 z-10 mt-2 top-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-3 " role="none">

                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Waiting for payment</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Ongoing transaction</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-2">All transaction</a>

                                            </div>
                                        </div>

                                    )}
                                </div>

                            </div>
                        </div>

                        {/* <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" /> */}

                        {/* 2nd dropdown */}

                        <div>
                            <div className="">


                                <div className="relative inline-block text-left pt-24">
                                    <div >
                                        <button
                                            onClick={handleInbox}
                                            type="button"
                                            className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            Inbox

                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>


                                    {inbox && (
                                        <div className="absolute left-36 z-10 mt-2 top-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-3 " role="none">

                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Chat</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Discussion</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-2">Review</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Costumer help</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Update</a>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" /> */}

                        <div>
                            <div className="">


                                <div className="relative inline-block text-left  pt-24">
                                    <div >
                                        <button
                                            onClick={handleFavorite}
                                            type="button"
                                            className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            Favorite

                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>


                                    {favorite && (
                                        <div className="absolute left-36 z-10 mt-2 top-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-3 " role="none">

                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Wishlist</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Recently viewed</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Update</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>



                    {/*2 nd column-2  */}

                    <div className=" col-span-2 pl-4">

                        <div className='flex gap-52 '>
                            <div className='text-textColor font-bold'><Link to="/profile">Profile</Link></div>
                            {/* <div className='text-textColor font-bold'> Address</div> */}
                            <div className='text-textColor font-bold'><Link to="/yourorder">Your Order</Link></div>
                            {/* <div className='text-textColor font-bold'><Link to="/wishlist">My Wishlist</Link></div> */}
                        </div>
                        <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />


                        <div className='flex gap-56'>
                            <div className="flex border-1 border-purple-200 rounded">
                                <input
                                    type="text"
                                    className="block w-[200px] px-4 py-1 border-blue-300 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Search..."
                                />
                                <button className="px-4 text-white bg-blue-600 border-l rounded ">
                                    
                                </button>
                            </div>

                            <button className="px-4 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 ">
                                Add Address
                            </button>

                        </div>

                        <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange border border-gray-300">

                            {/* 1st box inner 1st grid */}
                            <div className=' grid-cols-3 '>
                                <div className="col-span-2 ">

           
                                    <div className=" sm:w-2/3">

                                        <h3 className='text-sm font-bold pb-6 text-textColor'>Home</h3>
                                        <h3 className="text-orange text-lg font-semibold ">Ajith R Thampi</h3>
                                        <p className='text-sm'>8510856114</p>
                                        <p className="text-grey-dark font-thin text-sm leading-normal">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                        </p>
                                    </div>

                                </div>

                                <div className=''>

                                </div>
                            </div>

                            {/*1st box Inner 2nd grid  */}
                            <div className='col-span-1 gap-5 space-y-10 pt-6 '>
                               
                                <button className="px-4 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 pt-1">Select</button>
                                <button className="px-6 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 pt-1">Edit</button>
                    
                            </div>
                        </div>


                        <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange border border-gray-300">

                            {/* 2nd box inner 1st grid */}
                            <div className=' grid-cols-3'>
                                <div className="col-span-2 ">
                                    <div className=" sm:w-2/3">

                                        <div className='flex gap-4'>
                                             <h3 className='text-sm font-bold pb-6 text-textColor '>Home</h3>
                                             <h3 className='bg-blue-500 rounded-2xl  text-sm py-2.5 '>
                                                Main address
                                             </h3>
                                        </div>
                                       
                                        <h3 className="text-orange text-lg font-semibold ">Ajith R Thampi</h3>
                                        <p className='text-sm'>9513757414</p>
                                        <p className="text-grey-dark font-thin text-sm leading-normal">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                        </p>
                                    </div>

                                </div>

                                <div className=''>

                                </div>
                            </div>

                            {/*2nd box Inner 2nd grid  */}
                            <div className='col-span-1 gap-5 space-y-10 pt-6 '>
      
                                <button className="px-4 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 pt-1">Select</button>
                             
                              

                                <button className="px-6 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 pt-1">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default YourOrder;