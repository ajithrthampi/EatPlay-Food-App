
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import Header from './Header'
import avatar11 from "../assets/avatar11.png"
import { MdCloudUpload, MdPayment } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { async } from '@firebase/util'
import SignupCollection from '../Collections/SignupCollection'
import { doc, updateDoc } from 'firebase/firestore'
import { useUserAuth } from '../context/UserAuthContext'
import { data } from 'autoprefixer'
import { useStateValue } from '../context/StateProvider'


const Profilee = () => {

  const [showOption, setShowOption] = useState(false)
  const [inbox, setInbox] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [imageAsset, setImageAsset] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [userId, setUserId] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [{ cartShow, cartItems }, dispatch] = useStateValue();




  useEffect(() => {
    userData()
  }, [imageAsset,
  
  ])

  useEffect(() => {
    // getImage()
  }, [])

  const userData =useMemo ( () => async () => {

    const unId = localStorage.getItem("email")
    console.log("Local DATA", unId);
    const data = await SignupCollection.getAllUser()
    const userData = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = userData && userData?.filter(n => n.email === unId)
    console.log("First filter", fil);
    console.log(userData, "Hello  ");
    setCurrentUser(fil)
    console.log("Hello");
    //  forceUpdate()
  }, [])
   console.log("current user ", currentUser);
  const uploadImage = async (e) => {

    const imageFile = e.target.files[0];
    console.log(imageFile);

    const storageRef = ref(storage, `Images/ &{Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log("HIIIIIIIIIIIIIIIIIIIIIIIII", error);
      // setFields(true);
      // setMsg("Error while uploading: try Again")
      // setAlertStatus("danger")
      setTimeout(() => {
        // setFields(false)
        // setIsLoading(false)
      }, 1000)

    }, () => {
      `getDownloadURL`(uploadTask.snapshot.ref).then(getDownloadURL => {
        const profileImage = getDownloadURL
        console.log("Hello There",profileImage);
        console.log(currentUser[0]?.id, "NEw Id");

        const docRef = doc(db, "signupUser", currentUser[0]?.id);
        const dataaa = {
         
          imageUrl : profileImage
        };

        updateDoc(docRef, dataaa)
          .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
          })
          .catch(error => {
            console.log(error);
          })
          // setImageAsset(downloadURL);

      })
    })
  }

  

  
  const handleAddImage = async()

  const handleClick = () => {
    setShowOption(!showOption)
  }
  const handleInbox = () => {
    setInbox(!inbox)
  }

  const handleFavorite = () => {
    setFavorite(!favorite)
  }

  

  return (
    <div className='w-screen  h-[800px] flex flex-col bg-primary'>
      <Header />

      <div className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>
        {/* <hr className="my-1 h-px bg-gray-400 border-0 dark:bg-gray-900" /> */}  

        <div className='flex gap-52 lg:place-content-center pl-7 md:pl-72'>
              <div className='text-textColor font-bold'><Link to="/profile">Profile</Link></div>
              
              <div className='text-textColor font-bold'><Link to="/yourorder">Your Order</Link></div>
              
            </div>
            {/* <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900 md:pr-10" /> */}
            <hr className="my-1 h-px bg-gray-400 border-0 dark:bg-gray-900" />

        <div className='grid grid-cols-3 gap-4 py-5'>
          
          {/* First Column-1 */}
          <div className="col-span-1 ">

            

            <div className=' flex-col pt-28'>
              <label className='w-full h-full flex flex-col items-center
                         justify-center cursor-pointer '>
                          <a href="#" class="avatar avatar-circular avatar-lg">

            {currentUser.length>0?currentUser.map((doc, index) => {
              return(              
              <img 
               className='w-[14rem] h-[14rem] rounded-full'
              alt="Image placeholder"
              src={doc.imageUrl?doc.imageUrl :avatar11} />
               )
             }): 
             <img
             className='w-[14rem] h-[14rem] rounded-full'
            alt="Image placeholder"
            src={doc.imageUrl} />}

            </a>
            <div className='text-sm mt-3 border border-blue-400 rounded-lg px-5 py-1 ml-23'>
                  Edit
                  <input
                  type="file"
                  name="uploadimage"
                  accept='image/*'
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
                </div>                                             
              </label>

            </div>

          </div>

          
          {/*2 nd column-2  */}
          <div className=" col-span-2 pl-4 pt-16">
            

            

             {currentUser?.map((doc, index) => {
                      return (     
            <div key={doc.id} className='pl-3 flex'>

            
                     
                   
              <ul className='px-28 pt-10 '>
                <li className=' text-xl'>Username</li>
                <li className='pt-4 text-xl'>Date of birth</li>
                <li className='pt-4 text-xl'>Gender</li>
                <li className='pt-4 text-xl'>Email</li>
                <li className='pt-4 text-xl'>Phone number</li>
                <li className='pt-4 text-xl'>Address</li>
              </ul>

              <ul className=' pt-10 '>

                <li className='text-xl capitalize'>{doc.name}</li>
                <li className='pt-4 text-xl'>02/09/1999</li>
                <li className='pt-4 text-xl'>Make</li>
                <li className='pt-4 text-xl'>{doc.email}</li>
                <li className='pt-4 text-xl'>7510757114</li>
                <li className='pt-4 text-xl'>Nandanam Palamel Padanilam Kollam Kerala</li>
              </ul>

              <div>

              </div>

            </div>
             )
            })}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilee