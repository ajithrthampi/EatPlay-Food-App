  
import React, { useEffect, useReducer, useState } from 'react'
import CouponCollection from '../Collections/CouponCollection';

const CouponList = () => {

  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [coupon, setCoupon] = useState("")

  const [couponNo, setCouponNo] = useState("");
  const [couponPrice, setCouponPrice] = useState("")
  const [expiryDate, setExpiryDate] = useState("");
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowModal(false)
    setShowPopup(true)

    const couponsDif = {
      couponNo,
      couponPrice,
      expiryDate
    }
    await CouponCollection.addCoupon(couponsDif)
    console.log("HEllo Coupon ", couponsDif);
  }

  useEffect(() => {
    setCouponNo("")
    setCouponPrice("")
    setExpiryDate("")
  }, [])


  useEffect(() => {
    getCoupon()
  }, [reducerValue, showModal])


  const getCoupon = async () => {
    const data = await CouponCollection.getAllCoupon();
    setCoupon(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log("get coupon...");
  }

  const deleteHandler = async (id) => {
    await CouponCollection.deleteCoupon(id)
    console.log("Coupon deleted ")
    forceUpdate()
  }

  return (
    <>
      <br />
      <div className='centered md:text-4xl '>Coupon List</div>
      <br />
      <button
        onClick={() => setShowModal(true)}
        className=' inline-block px-12 py-2.5 bg-blue-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  shadow-blue-600/50 '
      >
        Coupon List
      </button>
      <br />
      <br />
      <br />


      <table className="border-collapse w-50 ">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">S.No</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Coupon No</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Coupon Price (%)</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Expiry Date</th>
          


            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>

          </tr>
        </thead>
        <tbody className=''>

          {/* {product && product?.map((doc, index) => { */}
          {/* return ( */}

          {coupon && coupon?.map((doc, index) => {
            return (
              <tr

                // key={doc.id}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">S.No</span>
                  {index + 1}
                </td>


                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Coupon No</span>
                  {doc.couponNo}


                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Coupon Price</span>
                  {doc.couponPrice}

                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Expiry Date</span>
                  {doc.expiryDate}

                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static hover:cursor">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Expiry Date</span>

                  {/* <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold "
                  //  onClick={(e) => deleteHandler()} 
                  >Edit</span> */}
                  &nbsp;
                  &nbsp;
                  <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold cursor-pointer text-white"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {showModal ? (
        <>
          <div
            className=" h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className=''>
                    <h3 className="text-3xl font-semibold">
                      Add Coupon
                    </h3>
                  </div>

                  <button
                    className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">


                <form className='  max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'
                  onSubmit={handleSubmit}
                >

                  {/* Couppon ---------------------------x--------------------------- */}
                  <div className='flex flex-col text-grey-500 '>

                    <label className='text-gray-600'> Coupon No </label>

                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                      type="text"
                      name="place"
                      defaultValue={couponNo}
                      onChange={e => setCouponNo(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col text-grey-500 '>

                    <label className='text-gray-600'> Coupon Price </label>

                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                      type="text"
                      name="place"
                      defaultValue={couponPrice}
                      onChange={e => setCouponPrice(e.target.value)}
                    />
                  </div>

                  <div className='flex flex-col text-grey-500 '>

                    <label className='text-gray-600'> Starting date</label>

                    {/* <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                      type="text"
                      name="place"
                      defaultValue={expiryDate}
                      onChange={e => setExpiryDate(e.target.value)}
                    /> */}

                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                      type="date"
                      name="date"
                      defaultValue={expiryDate}
                      onChange={e => setExpiryDate(e.target.value)}
                    />

                    <label className='text-gray-600'> Expiry date</label>
                    <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                      type="date"
                      name="date"
                      defaultValue={expiryDate}
                      onChange={e => setExpiryDate(e.target.value)}
                    />
                  </div>
                  <br />
                  <button
                    className='rounded-lg w-full inline-block px-10 py-2 bg-blue-800 text-white  leading-tight text-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-shadow-600/50 '

                    onClick={handleSubmit}
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

{showPopup ? (
    <>
      <div
            className=" h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className=''>
                    <h3 className="text-3xl font-semibold">
                      
                    </h3>
                  </div>

                  <button
                    className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowPopup(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">


                  <form className='  max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'
                    // onSubmit={handleSubmit}
                  >
                    <div className='flex flex-col text-grey-500 '>
                      <label className='text-green-600 font-sans text-xl'> Succefully Added to Coupon List </label>

                      {/* <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                        type="text"
                        name="place"
                        defaultValue={place}
                        placeholder="name"
                        // onChange={e => setPlace(e.target.value)}
                      /> */}
                    </div>

                    <br />
                    <div className='py-3 mx-16'>
                     <button
                      className="ml-0 md:ml-auto w-full md:w-auto
                      border-none outline-none bg-blue-500 px-12 py-2 rounded-lg 
                      text-lg text-white font-semibold hover:bg-blue-500  active:bg-blue-800"
                     onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    </div>
                  
                    <div>
                    </div>
                  </form>

                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null}


      <br />
    </>
  )
}

export default CouponList