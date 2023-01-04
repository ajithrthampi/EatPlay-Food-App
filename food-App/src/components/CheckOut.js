import React, {useEffect, useState} from 'react'
import {GoLocation} from 'react-icons/go'
import {MdOutlineLocalShipping} from 'react-icons/md'

import Header from './Header'
import f5 from "../assets/f5.png"
import {RiCoupon2Line} from 'react-icons/ri'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartUserCollection from '../Collections/CartUserCollection'
import CouponCollection from '../Collections/CouponCollection'
import {HiVariable} from 'react-icons/hi'
import Modal from './Modal'
import {ip} from "../constants"
import {db} from '../firebase'
import {collection, deleteDoc, doc, getDocs, query, setDoc, where} from 'firebase/firestore'
toast.configure()


const CheckOut = () => {

    const [tot, setTot] = useState(0);
    const [cartProducts, setCartProducts] = useState([])
    const [couponValue, setCouponValue] = useState("");
    // const [coupon, setCouponPrice] = useState("")
    const [coupe, setCoupe] = useState("")
    const [state, setState] = useState("")
    const [couponedPrice, setCouponedPrice] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("")

    // trigger Modal
    const triggerModal = () => {
        setShowModal(true)
    }
    // Hide Modal
    function closeModal() {
        setShowModal(false)

    }

    const navigate = useNavigate()

    useEffect(() => {
        allCartDisplay();
        getCoupon()
        // userData()


    }, [
        // tot,
        // cartProducts
    ])
    useEffect(() => {
        const getEmail = localStorage.getItem("email");
        if (getEmail) {
            setEmail(getEmail)
        }
        console.log("Local Storag eemail", getEmail);
    }, [])

    // Coupon selection
    const handleChange = () => {}


    let lastAmounts;
    const addACoupon = () => {

        const initialPrice = totalPrice
        const couponedPrice = initialPrice * coupe / 100
        console.log("couponedPrice Price....", parseInt(couponedPrice));

        const lastAmount = initialPrice - parseInt(couponedPrice)
        console.log("lastAmount....", lastAmount);
        setState(lastAmount)

        setCouponedPrice(couponedPrice)
    }

    // Creating and adding  coupon collection
    // const getCart = async () => {
    //     const data = await CartUserCollection.getAllCarts();
    //     const dataa = (data.docs?.map((doc) => ({ ...doc.data(), id: doc.id })))
    //     setCartProducts(dataa)
    // }

    const allCartDisplay = async () => {
        const uidEmail = localStorage.getItem("email")
        console.log("Loged emai9lsssssssssssss", uidEmail);

        const data = await CartUserCollection.getAllCarts();
        const dataa = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log("all cart display");
        const fil = dataa && dataa ?. filter(n => n.email === uidEmail)
        console.log("New cart dataaaa", fil);
        setCartProducts(fil)
    }
    console.log("Cart Productsm mmmmmmmmmmmmmmmm", cartProducts);

    const orderedList = async () => {
        const uidEmail = localStorage.getItem("email")
            const collectionRef = collection(db, "userCart");
            const q = query(collectionRef, where("email", "==", uidEmail));
            const snapShot =  await getDocs(q)
            
            const result = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
    
            result.forEach(async (result) => {
                const docRef = doc(db, "userCart", result.id);
                await deleteDoc(docRef)
            }) 
    }


    // getting coupon collection
    const getCoupon = async () => {
        const data = await CouponCollection.getAllCoupon()
        const dataa = (data.docs ?. map((doc) => ({
            ...doc.data(),
            id: doc.id
        })))
        console.log("Coupon data");
        setCouponValue(dataa)
        console.log("Coupon datasssss", couponValue);
    }

    const handleToken = async (token) => {
        console.log("stripe vbbbbbbbbbbbbbbbbbbbbbbbbbb", token);
        const cart = {
            name: "All Products",
            totalPrice
        }
        const items = {
            name: "ALl items",
            cartProducts
        }
        const response = await axios.post(`${ip}/checkout`, {
            token,
            cart,
            items,
        }
        )
        console.log("Responce hwvefghwvhfgvwhf", response);
        let { status } = response.data;
        if (status === 'success') {
            navigate('/login')
            toast.success('Your order has been placed Successfully', {
                positioon: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
            console.log("Success update toastyfy")

           
            console.log("Delete cart items...");
        } else {
            alert('something went wrong in chekout')
        }
    }

    // getting the quantity from cartProduct in a separate array
    const qty = cartProducts.map(cartProduct => {
        return cartProduct.qty;
    })
    console.log("qty cccccccccccccc", qty);

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;
    const totalQty = qty.reduce(reducerOfQty, 0);
    const car = totalQty;

    console.log("totalff Qty", car);


    // getting TotalProductPrice from cart product in saperate array
    const price = cartProducts.map((cartProduct) => {
        return cartProduct.TotalProductPrice
        console.log("total price");
    })
    console.log("price mnncjhsbcjsgcjgsdcvgsj", price);

    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

    const totalPrice = price.reduce(reducerOfPrice, 0)
    console.log("total price",totalPrice);


    // const lastAmount = lastAmount;

    return (<>
        <div>
            <div className='w-screen  h-auto flex flex-col bg-primary'>
                <Header/>

                <div className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>
                    <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900"/>

                    <h1 className='text-lg font-bold text-textColor'>Checkout</h1>


                  

                        {/* 2nd Column */}

                        <div className=' flex justify-center'>
                            <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900"/>

                            <div className="bg-white shadow-lg  m-8 p-8 flex md:bg-orange rounded-3xl border border-gray-300 w-[35rem] ">

                                <div>
                                    <div>

                                        <div className='font-bold pt-3'>Shopping summary</div>
                                        <div className='grid grid-cols-3 gap-4 py-5'>

                                            {/*Coupon col-1  */}
                                            <div className='col-span-2'>
                                                <div className='text-textColor text-sm space-y-4'>
                                                    <p>Total Price(items)</p>
                                                    {/* <p>Shipping fee</p> */}
                                                    {/* // <p>Discount</p> */} 
                                                </div>

                                            </div>

                                            {/*Coupon col-2  */}
                                            <div className='col-span-1'>
                                                <div>
                                                    <div>
                                                        <span className='text-green-500'>$</span>
                                                        {
                                                        parseInt(totalPrice)
                                                    } </div>
                                                   {/* <div>
                                                        <span className='text-green-500 py-3'>$</span>
                                                        2
                                                    </div> */}
                                                  {/*    <div>
                                                        <span className='text-green-500'>$</span>
                                                        5
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900"/>

                                        <div className='grid grid-cols-3 gap-4 py-5'>

                                            {/*Coupon col-1  */}
                                            <div className='col-span-2 font-bold'>GrandTotal
                                            </div>

                                            <div className='col-span-1'>
                                                <span className='text-green-500'>$</span>
                                                {
                                                state ? parseInt(state) : parseInt(totalPrice)
                                            } </div>

                                        </div>
                                        {
                                        couponedPrice ? <div className='pl-40 pb-3'>
                                            <h4 className=' text-sm px-2 text-green-600 '>
                                                You will save
                                                <span className='text-red-400'>
                                                    {
                                                    parseInt(couponedPrice)
                                                }
                                                    $</span>
                                                on this order
                                            </h4>
                                        </div> : ""
                                    }
                                        <br/>
                                        <div className=' pl-16 flex'>
                                            {/*             <button className="text-textColor font-bold block w-[250px] px-4   border-blue-300 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mx-40 py-2 ">
                                    Use Coupon */}
                                            <select onChange={
                                                    (e) => setCoupe(e.target.value, "hhhhhhhhhhhhhhhhhhhhh")
                                                }
                                                // defaultValue={category}
                                                className=" text-sm   font-bold py-3
                                             px-14 rounded-xl flex justify-center items-center border-black"
                                            >
                                                <option value="other" className=' text-sm font-serif text-red-4 bg-blue-600'>
                                                {/* {coupe ? "Remove Coupon": "Have Coupon"} */}
                                                {!coupe ? "Have Coupon" : "Remove Coupon"}
                                                </option>
                                                {

                                                couponValue && couponValue.map((item, i) => (
                                                    <option //  onChange={(e)=> console.log(e.target.value)}
                                                        key={i}
                                                        className="text-base border-0
                                                            outline-none capitalize bg-white text-headingColor"
                                                        value={
                                                            item.couponPrice
                                                    }>
                                                        {
                                                        item.couponNo
                                                    }
                                                        <br/> {
                                                        item.couponPrice
                                                    } </option>
                                                ))
                                            } </select>

                                            {
                                            coupe ? <button className=" text-white ml-3 bg-blue-500 rounded-xl  px-9 flex justify-center items-center text-sm"
                                                onClick={addACoupon}>
                                                Apply Coupon
                                            </button> :  <button className=" text-white ml-3 bg-blue-500 rounded-xl  px-9 flex justify-center items-center text-sm"
                                                onClick={addACoupon}>
                                                Remove Coupon
                                            </button>
                                        } 
                                        </div>
                                        <br></br>
                                        <div className='pl-16 justify-center items-center'>
                                            {/* <button className=" text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-3  px-36 rounded-full flex justify-center items-center"> */}
                                            {/* Proceeed to Payment */}
                                            <div className=" text-sm  text-white font-bold py-3  px-28 rounded-full flex justify-center items-center "
                                                onClick={orderedList}>
                                                <StripeCheckout 
                                                    stripeKey="pk_test_51Ld56nSHOTy6uJq1Ndi2sLPVgsdmcOh0ktdUL22ak0dZqg52DMAiLCmQgSoU5FWEg0UsvwyMVmUxHsshy9UbzIqx00QC7eOVoO"
                                                    token={handleToken}
                                                    billingAddress
                                                    shippingAddress
                                                    name='All Products'
                                                    amount={
                                                        (coupe ? state : totalPrice) * 100
                                                    }
                                                    itemscart={cartProducts}></StripeCheckout>
                                            </div>
                                            {/* </button> */}
                                            {/* <h1 className='flex justify-center items-center mt-3'>OR</h1> */}
                                            {/* <button class=" text-base bg-gray-500 hover:bg-blue-700 text-white font-bold py-3  px-36 rounded-full flex justify-center items-center mt-7"
                                                onClick={
                                                    () => triggerModal()
                                            }>
                                                Cash on Delivery
                                            </button> */}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    {/* </div> */}
                </div>

            </div>
            {
            showModal ? (
                <Modal totalPrice={totalPrice}
                    TotalQty={totalQty}
                    hideModal={closeModal}/>
            ) : null
        } </div>

    </>
    )
    }
    
    export default CheckOut
