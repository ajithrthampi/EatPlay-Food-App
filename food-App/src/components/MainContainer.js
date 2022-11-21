import React, { useEffect, useRef, useState } from 'react'
import { MdDeliveryDining } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import Bike from "../assets/bike.png"
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import ProductCollection from '../Collections/ProductCollection'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'
import {useStateValue} from '../context/StateProvider'
import { doc } from 'firebase/firestore'
import Footer from './Footer/Footer'
import { logDOM } from '@testing-library/react'

const MainContainer = () => {
 const [{cartShow}, dispatch] = useStateValue()

  const [foodItems, setFoodItems] = useState("")
  const [scrollValue, setScrollValue] = useState(0)

 
  // const [show, setShow ] = useState(true)


  useEffect(() => { }, [scrollValue , cartShow])

  useEffect(() => {
    getProducts();

  }, [cartShow])

  // const addToCart = (foodItems) => {
  //     console.log("itemss",foodItems);
  // }

  const getProducts = async () => {
    const dataa = await ProductCollection.getAllProducts();
    setFoodItems(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log("get products");
  }

  return (
    <>

      <div className='w-full h-auto flex-col items-center justify-center '>
        <HomeContainer />

        <section className='w-full my-6 '>

          <div className='w-full flex items-center justify-between'>
            <p className='text-2xl font-semibold capitalizelize text-headingColor relative
             before:absolute before:rounded-lg before:content before:w-32 before:h-1 
             before:-bottom-2  before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out
             duration-100

             '>
              Our Fresh & Healthy Fruits
            </p>
            <div className=' hidden md:flex  gap-3 items-center '>
              <motion.div
                whileTap={{ scale: 0.7 }}
                className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
               flex items-center justify-center transition-all duration-100 ease-in-out hover:shadow-lg  
               '
                onClick={() => setScrollValue(-200)}>
                <MdChevronLeft className='text-lg text-white' />
              </motion.div >

              <motion.div
                whileTap={{ scale: 0.7 }}
                className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
               flex items-center justify-center transition-all duration-100 ease-in-out hover:shadow-lg
               '
                onClick={() => setScrollValue(200)}
              >
                <MdChevronRight className='text-lg text-white' />
              </motion.div >
            </div>
          </div>
          <RowContainer
            
            scrollValue={scrollValue}
            flag={true}

            // addToCart= {addToCart}
            data={foodItems && foodItems?.filter(n => n.category === "Chicken")}
          />
        </section>

        {/* Menu Section  */}

        <MenuContainer />

        {cartShow&& (
          <CartContainer />
        )}

      </div> 
    
    </>

  )
}

export default MainContainer