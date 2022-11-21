import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CategoryCollection from '../Collections/CategoryCollection';
// import ProductCollection from '../Collections/ProductCollection';

const CategoryManagement = () => {

  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [category, setCategory] = useState("")
  const [place , setPlace] = useState("")
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


  const handleSubmit = async (e) => {

    e.preventDefault()
    console.log("hi");
    setShowModal(false)
    setShowPopup(true)


    const categorys = {
      place,
    }

    setCategory("")
    await CategoryCollection.addCategory(categorys)
    console.log(categorys);

  }
  
 

 

  const getcategory = useCallback(async () => {
    const data = await CategoryCollection.getAllCategory();
    setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // forceUpdate()
    console.log("looop");
  }, [])
 React.useEffect(() => {
    getcategory();
    // deleteHandler()
  },[
    reducerValue, showModal
  ])

  const deleteHandler = async (id) => {
    await CategoryCollection.deleteCategory(id)
    console.log("delete loop");
    forceUpdate()
  }
 

  return (
    <>
      <br />

      <div className='centered text-4xl'>Category Management</div>
      <br />
      <div>
        <button
          onClick={() => setShowModal(true)}
          className=' inline-block px-12 py-2.5 bg-blue-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  shadow-blue-600/50 '
        >
          Add Category
        </button>
      </div>
      <br />
      <br />
      <br />

      <table className="border-collapse w-50">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">S.No</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Category</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>

          </tr>
        </thead>
        <tbody>

          {category && category?.map((doc, index) => {

            return (
              <tr
                key={index}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">S.No</span>
                  {index + 1}
                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Product</span>
                  {doc?.place}

                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static hover:cursor">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Product</span>

              <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold cursor-pointer "
               onClick={(e) => deleteHandler(doc.id)} 
              >Delete</span>
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
                      Add Product
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
                    <div className='flex flex-col text-grey-500 '>
                      <label className='text-gray-600'> Product Category </label>

                      <input className='rounded-md border border-gray-300  bg-blue-100 mt-2 p-1 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
                        type="text"
                        name="place"
                        defaultValue={place}
                        onChange={e => setPlace(e.target.value)}
                      />
                    </div>

                    <br />
                    <button
                      className='rounded-full w-full inline-block px-10 py-2 bg-green-600 text-white  leading-tight text-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-shadow-600/50 '

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
                      <label className='text-green-600 font-sans text-2xl'> Succefully Added to Category </label>

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
                      <label className='text-green-600 font-sans text-2xl'> Succefully Added to Category </label>

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


    </>

  )
}

export default CategoryManagement