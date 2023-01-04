import React, { useEffect, useReducer, useState } from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney
}
  from 'react-icons/md';
import { categories } from '../utils/data';
import Loading from './Loading';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import ProductCollection from '../Collections/ProductCollection';
import CategoryCollection from '../Collections/CategoryCollection';

const CreateContainer = (props) => {
  const modalState = props.toggle
  const action = props.action

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState("")

  const uploadImage = (e) => {
    // setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);

    const storageRef = ref(storage, `Images/ &{Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: try Again ")
      setAlertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 1000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false)
        setFields(true);
        setMsg("Image UPloaded succesfully")
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 1000)
      })
    })
  }

  const handleChange = event => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const deleteImage = () => {
    setIsLoading(false);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted succesfully")
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false)
      }, 1000)
    })
    console.log("image created");

  }

  // const products = {

  //   name,
  //   date,
  //   price,
  //   imageAsset,
  //   category,

  // }

  const saveDetails = async (e) => {
    e.preventDefault()

    // setIsLoading(true);
    try {
    if((!name || !date || !price || !imageAsset || !category)) {
      setFields(true);
      setMsg("Required field cant be empty")
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 1000);
    } else {
      const data = {
        id : `${Date.now()}`,
        name : name,
        date : date,
        price : price,
        imageAsset : imageAsset,
        qty : 1,
        category : category

      }
      await ProductCollection.addProducts(data);
      console.log(data);
      
      forceUpdate()

    }
  } catch (error) {
    setFields(true);
    setMsg("Error while uploading : try aAgain ");
    setAlertStatus("danger");
    setTimeout(() => {
      setFields(false);
      setIsLoading(false);
    }, 4000)
    
  }

  

    // const products = {

    //   name,
    //   date,
    //   price,
    //   imageAsset,
    //   category,
    // }
    setName("")
    setDate("")
    setCategory("")
    setImageAsset("")
    setPrice("")


    // await ProductCollection.addProducts(products);
    // console.log(products);
    
    // forceUpdate()
    console.log("image Created");

  }


  // const saveDetails = async () => {
  //   await ProductCollection.addProducts(products);
  //   console.log(products);
  //   forceUpdate()
  // }

  useEffect(() => {

    getcategory();
    
  }, [state])



  const getcategory = async () => {
    const datat = await CategoryCollection.getAllCategory();
    setState(datat.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

  }

  return (
    <div
            className=" h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-900/90"
          >
    <div className='flex flex-co '>
      {/* <Header /> */}

      <diV className='mt-14 md:mt-20 px-4 md:px-16 w-full 
      py-4 flex items-center justify-center min-h-screen'>
        <div className='w-[90%] md:w-[75%] border border-gray-500 rounded-lg p-4 
       flex flex-col items-center justify-center gap-4  bg-primary'>

          {
            fields && (

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`w-full p-2 rounded-lg text-center text-lg font-semibold
             ${alertStatus === "danger" ?
                    "bg-red-300 text-red-600" : "bg-emerald-200 text-emerald-500"}`}>

                {msg}

              </motion.p>

            )}

          {/* <button
                    className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal({color:`false`})}
                  >
                  
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
           <button type="button" className="ml-0 md:ml-auto w-[10px] md:w-auto
              border-none outline-none bg-blue-500 px-12 py-2 rounded-lg 
              text-lg text-white font-semibold hover:bg-red-500  active:bg-blue-800"
                onClick={action}
                >
                Close
              </button>
          <div className='w-full py-2 border-b border-gray-300 flex
          items-center gap-2'>

            {msg}
            <MdFastfood className="text-xl text-gray-700" />

            <input
              type="text"
              required
              value={name}
              placeholder="Product Name..."
              onChange={(e) => setName(e.target.value)}
              className="w-full h-full text-lg bg-transparent font-semibold
             outline-none border-noneplaceholder:text-gray-500 text-textColor"
            />
          </div>
          <div className='w-full '>
            <select
              //  onChange={(e) => setCategory(e.target.value)}

              defaultValue={category}
              onChange={handleChange}

              className="outline-non w-full text-base border-b-2
              border-gray-800 p-2 rounded-md cursor-pointer "
            >
              <option
                value="other"
                className='bg-white' >
                Select Category
              </option>

              {state && state.map((item, i) => (
                <option key={i}
                  className="text-base border-0
                outline-none capitalize bg-white text-headingColor"
                  value={item.place}
                >
                  {item.place}

                </option>
              ))}

            </select>
          </div>
          {/* Image Placing */}

          <div className='group flex justify-center items-center flex-col
           border-2 border-dott ed border-gray-300 w-full h-225 md:h--420 
           curser-pointer rounded-lg'>
            {isLoading ? <Loading /> : <>
              {!imageAsset ? <>
                <label className='w-full h-full flex flex-col items-center
                         justify-center cursor-pointer'>
                  <div className='w-full h-full flex flex-col items-center
                         justify-center gap-2'>
                    <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700 ' />
                    <p className='text-gray-500  hover:text-gray-700'>
                      Click Here to upload
                    </p>
                  </div>
                  <input
                    type="file"
                    name="uploadimage"
                    accept='image/*'
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              </>
                :
                <>
                  <div className='relative h-full'>
                    <img src={imageAsset} alt="uploaded image"
                      className='w-full h-full object-cover' />

                    <button type="button" className='absolute bottom-3
                         right-3 p-3 rounded-full bg-red-500 text-xl
                         cursor-pointeroutline-none hover:shadow-md duration-500
                         transition-all ease-in-out'
                      onClick={deleteImage}
                    >
                      <MdDelete className='text-white ' />

                    </button>

                  </div>
                </>}
            </>}
          </div>

          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
            <div className='w-full py-2 border-b border-gray-300
             flex items-center gap-2'>
              <MdFoodBank className='text-gray-700 text-2xl ' />
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                className='w-full h-full text-lg bg-transparent outline-none
                   border-none placeholder:text-gray-400 text-textColor'
              />
            </div>

            <div className=''>
              <div className='w-full py-2 border-b border-gray-300
             flex items-center gap-2'>
                <MdAttachMoney className='text-gray-700 text-2xl ' />
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className='w-full h-full text-lg bg-transparent outline-none
                   border-none placeholder:text-gray-400 text-textColor'
                />

              </div>

            </div>
            <div className='flex items-center w-full'>
              <button type="button" className="ml-0 md:ml-auto w-full md:w-auto
              border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg 
              text-lg text-white font-semibold hover:bg-green-500  active:bg-green-800"
                onClick={saveDetails}>
                Submit
              </button>
            </div>
          </div>

        </div>

      </diV>

    </div>
    </div>
  )
}

export default CreateContainer