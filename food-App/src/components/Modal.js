import { logDOM } from '@testing-library/react'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { db } from '../firebase'

const Modal = (props) => {

    const [cell, setCell] = useState(null)
    const [residentialAddress, setResidentialAddress] = useState("")
    const [cartPrice] = useState(props.totalPrice);
    const [cartQty] = useState(props.TotalQty);
    const { user } = useUserAuth();
    const auth = getAuth();




    // console.log("Quantity tota",totalQty.totalQty); 

    // close Modal
    const handleCloseModal = () => {
        props.hideModal()
        console.log("Clicked Close Butoon");
    }

    const handleCashOnDelivery = async (e) => {
        e.preventDefault();
        console.log("Cart P", cell, residentialAddress, cartPrice, cartQty);
        const uid = auth.currentUser.uid;

        console.log('uid dataaaaaaadada', uid);
        const docRef = doc(db, "signupUser", uid);
        const docSnap = await getDoc(docRef);
        const presentUser = docSnap.data()

        try {
            const docSnap = await getDoc(docRef);
            console.log( "Double Checkasdad",presentUser.newUser.name);
        } catch (error) {
            console.log(error)
        }

        //  await addDoc(collection(db, "Buyer-personal-Info"), {
        //     Name: "hiii",
        //     Email: presentUser.newUser.email,
        //     CellNo: cell,
        //     ResidentialAddress: residentialAddress,
        //     CartPrice: cartPrice,
        //     CartQty: cartQty,
        //   });

          const newCollection = doc(db, "userCart", "G9UWG7T0IZonKnvm17wU");
          const docSnaps = await getDoc(newCollection);
          const presentsUser = docSnaps.data()
          console.log("Present data",docSnaps.data());
          try {
            const docSnap = await getDoc(newCollection);
            console.log( "New user Cart details",docSnaps.data().name);
        } catch (error) {
            console.log(error)
        }


        

        
    }


    return (
        <>
            <div
                className=" h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <div className=''>
                                <h3 className="text-2xl font-semibold">
                                    Cash On Delivery
                                </h3>
                            </div>

                            <button
                                className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={handleCloseModal}
                            >
                                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <form className='  max-w-[400px] w-full   mx-auto bg-gray-200 p-8 px-8 rounded-3xl'
                                onSubmit={handleCashOnDelivery}
                            >
                                <div className='flex flex-col text-grey-500 '>


                                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                                        type="number"
                                        placeholder="Cell No"
                                        required
                                        name="place"
                                        defaultValue={cell}
                                        onChange={e => setCell(e.target.value)}
                                    />
                                    <br></br>
                                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                                        type="text"
                                        placeholder="Residential Address"
                                        required
                                        name="place"
                                        defaultValue={residentialAddress}
                                        onChange={e => setResidentialAddress(e.target.value)}
                                    />
                                    <br></br>
                                    <label>Total Quantity</label>
                                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                                        type="text"
                                        readOnly
                                        required
                                        value={cartQty}

                                    />
                                    <br></br>
                                    <label>Total Price</label>
                                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                                        type="text"
                                        readOnly
                                        required
                                        value={cartPrice}
                                    // defaultValue={place}
                                    // onChange={e => setPlace(e.target.value)}
                                    />
                                </div>
                                <br />
                                <button
                                    className='rounded-full w-full inline-block px-10 py-2 bg-green-600 text-white  leading-tight text-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-shadow-600/50 '
                                //   onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                                <div>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Modal