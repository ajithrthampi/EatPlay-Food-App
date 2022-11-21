import React, {useEffect, useReducer, useRef, useState} from 'react'
import {MdShoppingBasket} from "react-icons/md"
import {motion} from "framer-motion"
import {useStateValue} from '../context/StateProvider'
import {actionType} from '../context/reducer'
import ProductCollection from '../Collections/ProductCollection'
import {FaSadCry} from 'react-icons/fa'
import {db} from '../firebase'
import CartUserCollection from '../Collections/CartUserCollection'
import {useUserAuth} from '../context/UserAuthContext'
import {
    getFirestore,
    addDoc,
    collection,
    doc,
    setDoc,
    query,
    getDocs
} from 'firebase/firestore'
import {useNavigate} from "react-router-dom"
import Details from './Details'


const RowContainer = ({flag, data, scrollValue, addToCart}) => {
    const rowContainer = useRef()


    // const [cartItems, dispatch] = useStateValue();
    // const [ cartItems , dispatch] = useStateValue();
    const {user} = useUserAuth();
    const [
        {
            cartItems
        }, dispatch
    ] = useStateValue()
    const [items, setItems] = useState([])
    const [email, setEmail] = useState("")
    const [cartUser, setCartUser] = useState([])
    const navigate = useNavigate()
    const [userUid, setUserId] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [totprice, setTotPrice] = useState("")
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

    function GetUserUid() {
        const [uid, setUid] = useState(null)
        useEffect(() => {
            setUid(user?.uid)
            console.log("UUUSSEERR", uid);
        }, [uid])
        return uid;
    }

    const uid = GetUserUid();
    // setUserId(uid)
    useEffect(() => {
        handleAddCart()
        getUserCart()
        allData()

    }, [])

    useEffect(() => { 
        call()
    }, )

    // /////////////////////////////////////////////////////
    const allData = async () => {
        const uidEmail = localStorage.getItem("email")
        // console.log("Loged emai9lsssssssssssss", uidEmail);

        const q = query(collection(db, "userCart"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const dataa = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            const fil = dataa && dataa ?. filter(n => n.email === uidEmail)
            console.log("New cart dataaaa", fil);
            setCartProducts(fil)
            console.log("Cart Productsm mmmmmmmmmmmmmmmm", cartProducts );
        });
        console.log("All data Row Container");
    }

    const call = () => {
        const price = cartProducts.map((cartProduct) => {
            return cartProduct.TotalProductPrice
        })
        console.log("price mnncjhsbcjsgcjgsdcvgsj", price);

        const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;
        const totalPricee = price.reduce(reducerOfPrice, 0)
        console.log("total pericefffff", totalPricee);
        setTotPrice(totalPricee)
        console.log("Total cart product pricejjjjjjjjjjjj", totprice);

    }

    // ////////////////////////////////////////////////////end/

    const getUserCart = async () => {
        const dataaa = await CartUserCollection.getAllCarts();
        setCartUser(dataaa.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })))


    }
    // console.log("All Cart Data",cartUser);

    cartUser && cartUser ?. map((item) => { // console.log("MApped data",item);
    })

    // const result = cartUser.reduce((finalArray, current) => {
    //     let obj = finalArray.find((item) => item.id === current.id);
    // })

    // console.log("Filtered datata",result);


    //     if (obj) {
    //         return finalArray;
    //     }
    //     return finalArray.concat9([current]);
    // }, [])

    // console.log("Filtered datata",result);

    let itemm;
    const handleAddCart = async (itemm) => {
        console.log("question price",totprice);

        if (uid !== null) { // console.log("user id", itemm.id);
            itemm = itemm;
            itemm["qty"] = 1;
            itemm["TotalProductPrice"] = itemm.qty * itemm.price;


            const fieldEmail = {
                ... itemm,
                   email
            }
            // console.log("Field EMAIL", fieldEmail);
            // await CartUserCollection.addCart(fieldEmail)
            await setDoc(doc(db, "userCart", itemm.id,), {
                ... itemm,
                email,
                totprice
            },);

            await setDoc(doc(db, "helloUCart", itemm.id), {
                ...itemm,
                email,
                totprice
            })
            // db.collection("userCart", itemm.id,)   
            // .update({totprice});
        } else {
            console.log(" Noo user in cart");
        }
    }

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
    }, [scrollValue,])

    

    useEffect(() => {
        const getEmail = localStorage.getItem("email");
        if (getEmail) {
            setEmail(getEmail)
        }
        // console.log("Local Storag eemail", getEmail);

    }, [])



    return (<div ref={rowContainer}
        className={
            `w-full flex items-center my-12 gap-3 scroll-smooth
              ${
                flag ? 'overflow-x-scroll scrollbar-none ' : 'overflow-x-hidden flex-wrap justify-center'
            }`
    }>
        {/* {Object.keys(data).length>0 && data?.map(item => (   */}
        {
        data && data.length > 0 ? (data.map(item => (
            <div key={
                    item.id
                }
                className='w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay
                                                rounded-lg py-2 px-4 my-12 backdrop-blur-lg  hover:drop-shadow-lg flex flex-col
                                                items-center justify-evenly relative'>
                <div className='w-full flex items-center justify-between'>
                    <motion.img whileHover={
                            {scale: 1.2}
                        }
                        src={
                            item ?. imageAsset
                        }
                        alt=""
                        className='w-40 h-40 -mt-8 drop-shadow-2xl'

                        onClick={
                            (e) => navigate("/details", {
                                state: {
                                    id: item.id,
                                    product: item.name,
                                    price: item.price,
                                    category: item.category,
                                    imageAsset: item.imageAsset
                                }
                            })
                        }/>
                    <motion.div whileTap={
                            {scale: 0.7}
                        }
                        className='w-8 h-8 rounded-full bg-red-600 flex 
                    items-center justify-center cursor-pointer hover:shadow-md -mt-8'
                        onClick={
                            (e) => handleAddCart(item)
                    }>
                        <MdShoppingBasket className='text-white'/>
                    </motion.div>
                </div>

                <div className='w-full flex flex-col  items-end justify-end -mt-8'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                        {
                        item ?. name
                    } </p>
                    <p className='mt-2 text-gray-500 text-sm'>
                        {
                        item ?. category
                    }</p>
                    <div className='flex items-center gap-8'>
                        <p className='text-lg text-headingColor font-semibold '>
                            <span className='text-sm text-green-700'>$</span>
                            {
                            item ?. price
                        } </p>
                    </div>

                </div>
            </div>
        ))) : (
            <div className='w-full flex flex-col items-center justify-center'>
                <img src="" className="h-340"/>
                <p className='text-xl text-headingColor font font-semibold my-2'>
                    Item not available
                </p>

            </div>
        )
    } </div>
    )
    }
    
    export default RowContainer
