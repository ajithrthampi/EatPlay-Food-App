import React, { useState } from 'react'
import Header from './Header'
import Currency from "../assets/Currency.png"

import avatar11 from "../assets/avatar11.png"
import { MdPayment } from 'react-icons/md'
import { Link } from 'react-router-dom'






const Profile = () => {

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

    <div className='w-screen  h-[745px] flex flex-col bg-primary'>
      <Header />

      <div className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>
        <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />


        {/* <div className='grid grid-cols-3 gap-4 py-5'> */}

          {/* First Column-1 */}

          {/* <div className="col-span-1  ">

            <div className='flex'>

              <img className='w-10  object-cover' src={avatar11} alt="logo" />
              <div className='p-1'>Ajith R Thampi</div>

            </div>

          
            <div className='text-bold text-sm mt-2'> Balance</div>

            <div className='p-4 flex gap-4 '>
              <MdPayment className=' text-2xl text-blue-400' />
              <div className='text-sm'>Paypal</div>
              <div className='flex gap-2'> <span className='text-green-500 '> $ </span> 56 </div>

            </div> */}
            {/* <hr className="my-6 h-px bg-gray-300 border-0 dark:bg-gray-900" /> */}


            {/* dropdown */}
{/* 
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
                  </div> */}


                  {/* {showOption && (
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
            </div> */}

       
              
            {/* <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" /> */}

           {/* 2nd dropdown */}
            {/* <div>
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
 */}

                  {/* {inbox && (
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
            </div> */}


            {/* <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" /> */}
            
            {/* <div>
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
                  </div> */}


                  {/* {favorite && (
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

          </div> */}




          {/*2 nd column-2  */}
          <div className=" col-span-2 pl-4">

            <div className='flex gap-52 '>
              <div className='text-textColor font-bold'><Link to="/profile">Profile</Link></div>
              <div className='text-textColor font-bold'><Link to="/address">Address</Link></div>
              <div className='text-textColor font-bold'><Link to="/yourorder">Your Order</Link></div>
              <div className='text-textColor font-bold'><Link to="/wishlist">My Wishlist</Link></div> 
            </div>
            <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />


            <div className='pl-3 flex'>

              <div>
                <img className='w-[60px] mt-11   object-cover' src={avatar11} alt="logo" />
                <button className='text-sm mt-3 border border-blue-400 rounded-lg px-5 py-1 '
                 
                >Edit</button>
              </div>

              <ul className='px-28 pt-10 '>
                <li className='text-sm'>Username</li>
                <li className='pt-4 text-sm'>Date of birth</li>
                <li className='pt-4 text-sm'>Gender</li>
                <li className='pt-4 text-sm'>Email</li>
                <li className='pt-4 text-sm'>Phone number</li>
                <li className='pt-4 text-sm'>Address</li>
              </ul>

              <ul className=' pt-10 '>

                <li className=''>Ajith R Thampi</li>
                <li className='pt-4 text-sm'>02/09/1999</li>
                <li className='pt-4 text-sm'>Make</li>
                <li className='pt-4 text-sm'>ajithrthampi999@gmail.com</li>
                <li className='pt-4 text-sm'>7510757114</li>
                <li className='pt-4 text-sm'>Nandanam Palamel Padanilam Kollam Kerala</li>
              </ul>

              <div>

              </div>

            </div>


          </div>


        {/* </div> */}
      </div>

    </div>

  )
}

export default Profile