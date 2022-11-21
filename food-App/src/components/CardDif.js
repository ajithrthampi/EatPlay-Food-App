import React, { useEffect, useReducer, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { BiMinus, BiPlus } from "react-icons/bi"
import { motion } from "framer-motion"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { MdAirlineSeatFlatAngled } from 'react-icons/md'
import CartUserCollection from '../Collections/CartUserCollection'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import userEvent from '@testing-library/user-event'
import { useUserAuth } from '../context/UserAuthContext'


let items = [];

const CardDif = ({ item, setFlag, flag, cartProductIncrease, CartProductDecrease, Product, cartProduct }) => {

    const [qty, setQty] = useState(item.qty);
    const [{ cartItems }, dispatch] = useStateValue();
    const { user } = useUserAuth();
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    
    // const [uid, setUid] = useState("")
   
    useEffect(() => {
      setQty(item.qty)
    },[
      item.qty
    ])

    useEffect(() => {
      // setUid(user.uid)
      // console.log("UUUSSEERR", uid);
    },[reducerValue])
    
    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: items,
        });
      };
      // const [cartProducts, setCartProducts] = useState([])

      const handleCartProductIncrease = () => {
        cartProductIncrease(item);
      }

      const handleCartProductDecrease = () => {
        CartProductDecrease(item);
      }

      const  handleCartProductDelete =(id) => {
          const docRef = doc(db, "userCart",item.id)
          // console.log("English tell",docRef);
          deleteDoc(docRef)
         .then(() => {
          console.log("Document has been deleted succefully");
          // cartProduct()
         })

        //  forceUpdate()
        
      }

   
  useEffect(() => {
    items = cartItems;
  }, [qty, items]);


    return (
        <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
        <img
          src={item?.imageAsset}
          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          alt=""
        />
  
        {/* name section */}
        <div className="flex flex-col gap-2">
          
          <p className="text-base text-gray-50">{item?.name}</p>
          <p className="text-sm block text-gray-300 font-semibold">
            $ {parseInt(item?.price) * qty} 
            {}

          </p>
        </div>
  
        {/* button section */}
        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={handleCartProductDecrease}
          >
            <BiMinus className="text-gray-50 "  />
          </motion.div>
  
          <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
            {qty}
          </p>
        
          <motion.div
            whileTap={{ scale: 0.75 }}
             onClick={handleCartProductIncrease}
          >
            <BiPlus className="text-gray-50 " />
          </motion.div>
        </div>
        
        <div className='top-0 right-0 cursor-pointer text-white text-xs' onClick={ () =>handleCartProductDelete(doc.id)}>X</div>
      </div>
    )
}
export default CardDif