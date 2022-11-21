import { getAuth, signOut } from 'firebase/auth'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Logoo from "../assets/Logoo.png"
import avatar11 from "../assets/avatar11.png"
import { MdShoppingBasket, MdLogout } from "react-icons/md"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { useUserAuth } from '../context/UserAuthContext'
import { CgProfile } from "react-icons/cg"
import Profilee from './Profilee'
import { actionType } from '../context/reducer'
import { collection, doc, getDocs, getFirestore, snapshotEqual } from 'firebase/firestore'
import { db } from '../firebase'
import CartUserCollection from '../Collections/CartUserCollection'
import SignupCollection from '../Collections/SignupCollection'



const Header = (data) => {
  const navigate = useNavigate()
  const { user } = useUserAuth();
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  // const [ cartItems , dispatchs] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)
  const [totalProducts, setTotal00Products] = useState(0);
  const [productNo, setProductNo] = useState("")
  const [currentUser, setCurrentUser] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  const avatar = () => {
    setIsMenu(current => !current)
  }
  const logout = () => {
    setIsMenu(false)
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token")
        navigate("/login")
      })
      .catch((e) => alert(e.message))
  }
  // useEffect(() => {
  //   setProductNo("")
  // }, [ ])

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
    // console.log("showcart",cartShow );
  };
  useEffect(() => {
    // setProductNo()
  }, [])




  const allCartDisplay = useCallback(async () => {
    const uidEmail = localStorage.getItem("email")
    const data = await CartUserCollection.getAllCarts();
    const dataa = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = dataa && dataa?.filter(n => n.email === uidEmail)
    // console.log("New cart data",data);
    setProductNo(fil)
    console.log("all cart display");
  },[])
  console.log("Liked LIsthjhjvjgvgvgjvjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",productNo);


  const userData = async () => {

    const unId = localStorage.getItem("email")
    console.log("Local DATA", unId);
    const data = await SignupCollection.getAllUser()
    const userData = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = userData && userData?.filter(n => n.email === unId)
   console.log("First filter", fil);
    console.log(userData, "Hello  ");
    setCurrentUser(fil)
    console.log("current user ", fil.imageUrl);
    //  forceUpdate()
    console.log("userData");
  }
  console.log("Profile image ",currentUser.email);


  useEffect(() => {
    allCartDisplay()
    userData()
  }, [])

  




  const auth = getAuth();
  //   const user = auth.currentUser;
  return (

    <header className='fixed z-50 w-screen p-3 px-4 md:px-16 bg-primary'>
      {/* desktop and tablet */}

      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={"/dashboard "} className='flex items-center gap-2'>
          <motion.img whileTap={{ scale: 0.6 }} className='w-10  object-cover' src={Logoo} alt="logo" />
          <p className='text-headingColor text-xl font-bold'> city</p>
        </Link>

        <div  >
          {/* <div className='w-96 bg-white shadow-lg' > */}
          <div>
            {/* <p> Hi {user && user.displayName}</p> */}
          </div>
          {/* </div> */}
        </div>

        <div className='flex items-center gap-8 '>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}

            className='flex items-center gap-8 '>


            <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:text-yellow-500"

              onClick={() => setIsMenu(false)}
            > <Link to="/login">Home</Link></motion.li>
            {/* <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-yellow-500 duration-100 transition-all ease-in-out cursor-pointer"

              onClick={() => setIsMenu(false)}
            >Menu</motion.li> */}

            <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-yellow-500 duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
             
              About Us

            </motion.li>
            {/* <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-yellow-500 duration-100 transition-all ease-in-out cursor-pointer"

              onClick={() => setIsMenu(false)}
            >Service</motion.li> */}
          </motion.ul>

          {/* <button className='inline-block px-12 py-2.5 bg-blue-600 text-white  text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  shadow-blue-600/50   font-semibold '
            onClick={logout}
          >Logout</button> */}


          <motion.div whileTap={{ scale: 0.6 }} className='relative flex items-center justify-center'
            onClick={showCart}
          >
            <MdShoppingBasket
              whileTap={{ scale: 0.6 }}
              className='text-textColor text-2xl  cursor-pointer' />

            {productNo && productNo.length > 0 && (

              <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>{productNo.length}</p>
              </div>

            )}

          </motion.div>

          <div className='relative'>
          {currentUser.length>0?currentUser.map((doc, index) => {
              return (
              < motion.img
              whileHover={{ scale: 0.6 }}
              src={doc.imageUrl?doc.imageUrl :avatar11}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              alt="ksvdnkhb"
              onClick={avatar}
            />
              )
            }) :  < motion.img
            whileHover={{ scale: 0.6 }}
            src={ avatar11}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            alt="profileee"
            onClick={avatar}
          />}
           
            {
              isMenu ? (
                < motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 1, scale: 1 }}
                  className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute 
              top-12 right-0 '>

                  <Link to={"/profile"}>
                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200
               transition-all duration-100 ease-in-out text-textColor text-base' >
                      Profile <CgProfile /> </p>
                  </Link>

                  <p className='m-2 p-2 rounded-md shadow-xl -5px flex items-center justify-center gap-3 cursor-pointer bg-orange-500 hover:bg-red-800
               transition-all duration-100 ease-in-out text-white text-base'  onClick={logout}>
                    Logout <MdLogout /> </p>

                </motion.div>

              ) : ""
            }
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='flex items-center justify-between md:hidden h-full w-full'>


        <motion.div whileTap={{ scale: 0.6 }} className='relative flex items-center justify-center'
          onClick={showCart}
        >
          < MdShoppingBasket
            whileTap={{ scale: 0.6 }}
            className='text-textColor text-2xl  cursor-pointer' />

          {productNo && productNo.length > 0 && (
            <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>{productNo.length}</p>
            </div>
          )}
        </motion.div>

        {/* <div >
            <p className='py-'> Hi {user && user.displayName}</p>
          </div> */}

        <div className='relative'>
        {currentUser&&currentUser.map((doc, index) => {
              return (
          < motion.img
            whileTap={{ scale: 0.6 }}
            src={currentUser ? doc.imageUrl : avatar11}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            alt="jbhkbkk"
            onClick={avatar}
          />
          )
        })}
          {
            isMenu ? (
              < motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 1 }}
                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute 
              top-12 right-0 '>

                <Link to={"/profile"}>
                  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200
               transition-all duration-100 ease-in-out text-textColor text-base' >
                    Profile <CgProfile /> </p>
                </Link>

                <ul className='flex flex-col '>
                  <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200  px-4 py-2"><Link to="/dashboard">Home</Link></motion.li>
                  {/* <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200  px-4 py-2">Menu</motion.li> */}
                  <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200  px-4 py-2">About Us</motion.li>
                  {/* <motion.li whileTap={{ scale: 0.6 }} className="flex-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200  px-4 py-2">Service</motion.li> */}
                </ul>

                <p className='m-2 p-2 rounded-md shadow-xl -5px flex items-center justify-center gap-3 cursor-pointer bg-orange-500 hover:bg-red-800
               transition-all duration-100 ease-in-out text-white text-base'  onClick={logout}>
                  Logout <MdLogout /> </p>

              </motion.div>
            ) : ""
          }
        </div>

      </div>
    </header>

  )
}

export default Header