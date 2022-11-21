import React, { useEffect, useState } from 'react'
import { FaHamburger } from "react-icons/fa"
import CategoryCollection from '../Collections/CategoryCollection';
import ProductCollection from '../Collections/ProductCollection';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';



const MenuContainer = () => {

    const [allpro, setAllPro] = useState('');
    const [foodItems, setFoodItems] = useState('')
    const [scrollValue, setScrollValue] = useState(0)
    const [item, setItem] = useState("Fruits")

    useEffect(() => {
        getcategory();
        getProducts();
    }, [item])

  
    const getProducts = async () => {
        const dataa = await ProductCollection.getAllProducts();
        setFoodItems(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log("get products");
    }

    // const getProducts = async () => {
    //     const data = await ProductCollection.getAllProducts();
    //     setFilter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //     // console.log(filter);
    // }

    const getcategory = async () => {
        const car = await CategoryCollection.getAllCategory();
         setAllPro(car.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // console.log("car docs",d);

    }

    return (
        <section className='w-full my-6 ' id="menu">
            <div className='w-full flex flex-col items-center justify-center'>
                <p className='text-2xl font-semibold capitalizelize text-headingColor relative
             before:absolute before:rounded-lg before:content before:w-16 before:h-1 
             before:-bottom-2  before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out
             duration-100 mr-auto
             '>
                    Our Hot Dishes
                </p>
                <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll
                   scrollbar-none'>

                    {allpro && allpro?.map(item => (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            key={item.id}
                            className={` group ${allpro === item.place ? "bg-cartNumBg" : "bg-white"}  w-24 min-w-[94px] h-28 cursor-pointer rounded-lg
                            drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-600
                             ease-in-out `}
                            onClick={() => setItem(item.place)}
                        >

                            <div className={` w-10 h-10 rounded-full shadow-lg
                             ${allpro === item.place ? "bg-white" : "bg-cartNumBg"}
                              group-hover:bg-white flex items-center justify-center `}>

                                <FaHamburger className={` ${allpro === item.place ? "text-textColor" : "text-white"
                                    } 
                                 text-gray-300 group-hover:text-textColor text-lg`} />
                            </div>
                            <p className={` text-sm ${allpro === item.place ? "text-white" : "text-textColor"} group-hover:text-white `}>
                                {item.place}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* { /* RowContainer */}

            <div className='w-full '>
                    {
                        <RowContainer
                            scrollValue={scrollValue}
                            flag={false}
                            data={foodItems && foodItems?.filter(n => n.category === item)}
                            
                        />}
                    {console.log("ffod",item)}
                    
                </div> 

            </div>
        </section>
    )
}

export default MenuContainer