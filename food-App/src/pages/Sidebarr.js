import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { HiMenuAlt3 } from "react-icons/hi"

import { MdOutlineDashboard } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"
import { MdOutlineCategory } from "react-icons/md"
import { BsBorderAll } from "react-icons/bs"
import { RiCoupon2Line } from "react-icons/ri"

import { AiOutlineCaretDown }  from "react-icons/ai"



const Sidebar = () => {
    const navigate = useNavigate()

    const logout = () => {
        navigate("/adminlogin")
    }



    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const menus = [
        { name: "Dashboard", link: "admindashboard", icon: MdOutlineDashboard, margin: true },
        { name: "User Management", link: "usermanagement", icon: AiOutlineUser, margin: true },
        { name: "Product Management", link: "productmanagement", icon: MdProductionQuantityLimits, margin: true },
        { name: "Category Management", link: "categorymanagement", icon: MdOutlineCategory, margin: true },
        { name: "Order", link: "order", icon: BsBorderAll, margin: true },
        // { name: "Coupon", link: "coupon", icon: RiCoupon2Line, margin: true },
        { name: "Coupon List", link: "couponlist", icon: RiCoupon2Line, margin: true},
        // { name: "Payment", link: "payment", icon: MdPayment, margin: true },
        // { name: "Offer Management", link: "offermanagement", icon: MdOutlineLocalOffer },
       

    ];
    const [open, setOpen] = useState(true);

    return (
        <div>
            <section className='flex gap-6  '>
              

            <div 
        className={`bg-[#0e0e0e] min-h-screen fixed  ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        {/* <div className='fixed'> */}
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-base ${
                  !open && "opacity-0 translate-x-28 overflow-hidden "
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                }   absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        {/* </div> */}
       </div >
     
                <div className='m-3 text-xl pl-72 text-gray-900 font-semibold  w-screen  '>
                    <nav className="relative flex flex-wrap items-center justify-between  py-3 bg-black mb-3 ">
                        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                                <a
                                    className=" font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                                    href="#pablo "
                                >
                                    Admin Pannel
                                </a>
                                <button
                                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                    type="button"
                                    onClick={() => setNavbarOpen(!navbarOpen)}
                                >
                                    <AiOutlineCaretDown/>
                                </button>
                            </div>
                            <div
                                className={
                                    "lg:flex flex-grow items-center " +
                                    (navbarOpen ? " flex" : " hidden")
                                }
                                id="example-navbar-danger"
                            >
                                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                    <li className="nav-item">
                                        <p
                                            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                            
                                        >
                                            <p onClick={logout} className="fab fa-facebook-square text-lg leading-lg text-white opacity-75">Logout</p>
                                        </p>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </nav>


                    <Outlet />


                </div>
               
            </section>
        </div>
    )
}

export default Sidebar