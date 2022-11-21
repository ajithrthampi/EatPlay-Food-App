import React, {useState, useEffect, useReducer, useCallback} from 'react'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {motion} from "framer-motion"
import {RiRefreshFill} from "react-icons/ri"
import {useStateValue} from '../context/StateProvider'
import {actionType} from '../context/reducer'
import emptyCart from "../assets/emptyCart.png"
import CardDif from "./CardDif"
import CartUserCollection from '../Collections/CartUserCollection'
import CartUidCollection from '../Collections/CartUid'
import {db} from '../firebase'
import {
    getFirestore,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    setDoc,
    updateDoc,
    DocumentSnapshot
} from 'firebase/firestore'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {query, where} from 'firebase/firestore'
import {useUserAuth} from '../context/UserAuthContext'
import {addDoc} from 'firebase/firestore'

toast.configure()

const CartContainer = (item) => {

    const [
        {
            cartShow,
            cartItems
        }, dispatch
    ] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [uid, setUid] = useState("")
    const {user} = useUserAuth();
    const [cartProducts, setCartProducts] = useState([])
    const [tot, setTot] = useState(0);
    const navigate = useNavigate()
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        });
    };
    useEffect(() => {

        allCartDisplay()

    }, [
        // tot,
        reducerValue
    ])

    useEffect(() => {
        setUid(user?.uid)
        // console.log("", uid);
    }, [])

   
    
    

    // init service
    const db = getFirestore()

    const allCartDisplay = async () => {
        const uidEmail = localStorage.getItem("email")
        // console.log("Loged emai9lsssssssssssss", uidEmail);
        // const data = await CartUserCollection.getAllCarts();
        // const dataa = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        const q = query(collection(db, "userCart"));
        const querySnapshot = await getDocs(q);
        const dataa = querySnapshot && querySnapshot ?. docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log("kkkkkkkkkkkkkkkkkkk",dataa);

        const fil = dataa && dataa ?. filter(n => n.email === uidEmail)
        console.log("Filetered dadata", fil);
        setCartProducts(fil)
    }
    console.log("llllllllllll",cartProducts);

    const orderedProduct = async (id) => {
        const uidEmail = localStorage.getItem("email")
        const docRef = await addDoc(collection(db, "orderedList"), { 
        
        ...cartProducts
        });
        console.log("ordered product")
    }
    // getting the quantity from cartProduct in a separate array
    const qty = cartProducts.map(cartProduct => {
        return cartProduct.qty;
    })
    // console.log("qty", qty);

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;
    const totalQty = qty.reduce(reducerOfQty, 0);

    // console.log("total Qty",totalQty);


    // getting TotalProductPrice from cart product in saperate array
    const price = cartProducts.map((cartProduct) => {
        return cartProduct.TotalProductPrice
    })
    console.log("CartContainer price",price);
    // reducing theh price in a singlr value

    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

    const totalPrice = price.reduce(reducerOfPrice, 0)
    // console.log("total price", totalPrice);

    // global Variable
    let Product;


    const cartProductIncrease = (cartProducts) => {
        console.log("Adddd", cartProducts);

        Product = cartProducts;
        Product.qty = Product.qty + 1
        Product.TotalProductPrice = Product.qty * Product.price;
       
        Product.totprice=Product.qty * Product.price;
         setTot(Product.TotalProductPrice)
        // update firestore collection
        const docRef = doc(db, "userCart", Product.id);
        setDoc(docRef, Product).then(docRef => { // console.log("Document has been updated succefully", tot);
        })
    }
    // cart decrease functionality
    const CartProductDecrease = (cartProducts) => {
        console.log("Adddd", cartProducts);
        Product = cartProducts;
        if (Product.qty > 1) {
            Product.qty = Product.qty - 1
            Product.TotalProductPrice = Product.qty * Product.price;
            Product.totprice=Product.qty * Product.price;
            // console.log("comein",Product.TotalProductPrice);
            setTot(Product.TotalProductPrice)
            // updating firebase collection
            const docRef = doc(db, "userCart", Product.id);
            setDoc(docRef, Product).then(docRef => { // console.log("Number has been decreased succefully");
            })
        }
    }
    const clearCart = async() => {
        // dispatch({type: actionType.SET_CARTITEMS, cartItems: []});
        // localStorage.setItem("cartItems", JSON.stringify([]))

        const uidEmail = localStorage.getItem("email")

        const collectionRef = collection(db, "userCart");
        const q = query(collectionRef, where("email", "==", uidEmail));
        const snapShot = await getDocs(q)
        
        const result = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id}))

        result.forEach(async (result) => {
            const docRef = doc(db, "userCart", result.id);
            await deleteDoc(docRef)
        })
        console.log("Clear cart data .....");

        forceUpdate()
    }

    // charging payment
    const handleToken = async (token) => {
        console.log("stripe", token);
        const cart = {
            name: "All Products",
            totalPrice
        }
        // const description = Product
        const response = await axios.post('http://localhost:8080/checkout', {token, cart})

        console.log(response);
        let {status} = response.data;
        if (status === 'success') {
            navigate('/login')
            toast.success('Your order has been placed Successfully', {
                positioon: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined
            })


        } else {
            alert('something went wrong in chekout')
        }

    }

    return (
        <motion.div initial={
                {
                    opacity: 0,
                    x: 200
                }
            }
            animate={
                {
                    opacity: 1,
                    x: 0
                }
            }
            exit={
                {
                    opacity: 0,
                    x: 200
                }
            }
            className='w-full md:w-375 h-screen bg-white drop-shadow-md
                                                            flex flex-col fixed top-0 right-0 z-[101]'>

            <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
                <motion.div whileTap={
                        {scale: 0.75}
                    }
                    onClick={showCart}>
                    <MdOutlineKeyboardBackspace className=" text-textColor text-3xl cursor-pointer"/>
                </motion.div>

                <p className='text-textColor text-lg font-semibold'>Cart</p>

                <motion.p whileTap={
                        {scale: 0.75}
                    }
                    className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md
                                                                                             hover:shadow-md cursor-pointer text-textColor text-base'
                    onClick={clearCart}>
                    Clear
                    <RiRefreshFill/> {" "} </motion.p>
            </div>

            {/* Bottom Section */}
            {
            cartProducts && cartProducts.length > 0 ? (
                <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
                    {/*  cart item session */}
                    <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-scroll
                                                                                                   scrollbar-none'>

                        {/*  cart item */}
                        {
                        cartProducts && cartProducts.length > 0 && cartProducts.map((item) => (
                            <CardDif cartProductIncrease={cartProductIncrease}
                                CartProductDecrease={CartProductDecrease}
                                Product={Product}
                                key={
                                    item.id
                                }
                                item={item}
                                setFlag={setFlag}
                                Flag={flag}
                                // cartProduct={allCartDisplay()}
                                />
                               
                        ))
                        
                    } </div>

                    {/* Cart Total sectioin*/}
                    <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col
                                                                                                   items-cente justify-evenly px-8 py-2'>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>Sub Total</p>
                            <p className='text-gray-400 text-lg'>
                                <span className='text-green-600'>
                                    $</span>
                                {totalPrice}</p>
                            {/* {console.log("here",TotalProductPrice)} */} </div>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>Delivery</p>
                            <p className='text-gray-400 text-lg'>
                                <span className='text-green-600'>
                                    $</span>
                                2</p>
                        </div>

                        <div className='w-full border-b border-gray-600 my-2'></div>

                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-200 text-xl font-semibold'>Total</p>
                            <p className='text-gray-200 text-xl font-semibold'>
                                <span className='text-green-600'>$</span>
                                {totalPrice + 2} </p>
                        </div>
                        <motion.button whiletap={
                                {scale: 0.8}
                            }
                            className='w-full p-2 rounded-full bg-blue-600 text-gray-50 text-lg my-2
                                                                                                                             hover:shadow-lg '
                            onClick={orderedProduct}>
                            {/* <StripeCheckout
                                stripeKey="pk_test_51Ld56nSHOTy6uJq1Ndi2sLPVgsdmcOh0ktdUL22ak0dZqg52DMAiLCmQgSoU5FWEg0UsvwyMVmUxHsshy9UbzIqx00QC7eOVoO"
                                token={handleToken}
                                billingAddress
                                shippingAddress
                                name='All Products'
                                amount={(totalPrice ) * 100}
                            >
                            </StripeCheckout> */}

                            <Link to="/checkout">
                                Checkout</Link>
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={emptyCart}
                        className="w-300"
                        alt=""/>
                    <p className="text-xl text-textColor font-semibold">
                        Add New Item to Your Cart
                    </p>
                </div>
            )
        } </motion.div>
    )
}
export default CartContainer
