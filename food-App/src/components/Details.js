import React from 'react'
import Header from './Header'
import f5 from "../assets/f5.png"
import { AiOutlineStar } from "react-icons/ai"
import { logDOM } from '@testing-library/react'
import { useEffect } from 'react'
import ProductCollection from '../Collections/ProductCollection'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CartUserCollection from '../Collections/CartUserCollection'
import { useUserAuth } from '../context/UserAuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'



const Details = (props) => {

    const [product, setProduct] = useState("")
    const [email, setEmail] = useState("")
    const location = useLocation()
    const { user } = useUserAuth();
    console.log("LOcation of details",location.state.id);


    const uid = GetUserUid();

    useEffect(() => {
        const getEmail = localStorage.getItem("email");
        if (getEmail) {
            setEmail(getEmail)
        }
        console.log("Local Storag eemail", getEmail);
    }, [])

    useEffect(() => {
        handleAddCart()
    }, [])
    
    function GetUserUid() {
        const [uid, setUid] = useState(null)
        useEffect(() => {
            setUid(user.uid)
            console.log("UUUSSEERR", uid);
        }, [uid])
        return uid;
    }

    
    const handleAddCart = async (itemm) => {

        if (uid !== null) {
            console.log("user id", itemm.id);
            itemm = itemm;
            itemm["qty"] = 1;
            itemm["TotalProductPrice"] = itemm.qty * itemm.price;

            const fieldEmail = {
                ...itemm,
                email
            }
            // console.log("Field EMAIL", fieldEmail);
            // await CartUserCollection.addCart(fieldEmail)
            await setDoc(doc(db, "userCart", itemm.id,), {
                ...itemm,
                email
              });

        } else {
            console.log(" Noo user in cart");
        }
        console.log("handle add cart");
    }

    return (
        <div className='w-screen  h-[745px] flex flex-col bg-primary'>
            {/* <Header /> */}
            <Header />

            <div className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>
                <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />

                <h1 className='text-lg font-bold text-textColor pb-3'>Product Details</h1>

               

                <div className="bg-black shadow-lg rounded m-8 p-8 flex md:bg-orange ">

                    <div className='  grid grid-cols-3'>
                        <div className="col-span-2 text-white">
                            <div>
                                <img className="rounded-xl border-white border-solid md:border-4 w-225 bg-white pt-6" src={location.state.imageAsset} />
                            </div>

                        </div>

                    </div>
                    <div className='col-span-1 '>
                        <div className='  grid grid-cols-3'>

                            {/*inner 1st grid  */}


                            <div className='flex'>

                                <div className='col-span-1 '>
                                    <div className='text-white text-xl'>{location.state.product}</div>
                                    <ul className='text-white text-sm py-11 space-y-4'>
                                        <li>Price</li>
                                        <li>Type</li>
                                        <li>Availability</li>
                                        {/* <li>Quantity</li> */}
                                    </ul>
                                </div>

                                {/*inner 2st grid  */}
                                <div className='col-span-1 '>
                                    <ul className='text-white text-sm py-16 px-10 space-y-4'>
                                        <li> <div className='text-xl'> <span className='text-green-500'>$</span> {location.state.price} </div></li>
                                        <li>{location.state.category}</li>
                                        <li>Available</li>
                                        <li></li>
                                        {/* <li className='space-x-7'>
                                            <button className='bg-blue-500 rounded-full w-6 h-6 text-xl'>+</button>
                                            <span>1</span>
                                            <button className='bg-blue-500 rounded-full w-6 h-6 text-xl'>-</button>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                <div className='p-7 space-x-10 pt-1 flex '>
                    {/* <button className=" text-bl border-lg border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white">
                        Add Review
                       
                    </button> */}
                    <button className="px-4 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white
                    "
                    onClick={(e) => handleAddCart(location.state)}
                    >
                        Add to cart
                    </button>
                    {/* <button className="px-4 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white ">
                        Buy now
                    </button> */}
                        {/* <button className="px-4 text-bl border-lg border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white">
                            Share
                        </button> */}
                </div>
                <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" />
            </div>
        </div>
    )
}

export default Details