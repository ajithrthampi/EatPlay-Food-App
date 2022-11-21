import { getAuth, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import CreateContainer from './CreateContainer'
import Header from './Header'
import MainContainer from './MainContainer'
import getAllProducts from '../Collections/ProductCollection';
import ProductCollection from '../Collections/ProductCollection';
import Footer from './Footer/Footer'

const Dashboard = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getProducts();
    
  },[])

  const getProducts = async () => {
    const data = await ProductCollection.getAllProducts();
    // console.log(data.docs);
    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log("get products");
  }
  const navigate = useNavigate()
  // const { user } =  useUserAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token")
        navigate("/login")
      })
      .catch((e) => alert(e.message))
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login")
    }
  }, [])
  

  const auth = getAuth();
  // const user = auth.currentUser;

  return (
    <div className='w-screen h-auto flex flex-col bg-primary'>
      <Header />
      <main className='mt-14 md:mt-20 px-4 md:px-16 w-full py-4'>

         <Routes>
           <Route path="/" element={<MainContainer/>} />
           {/* <Route path="/createitem" element={<CreateContainer/>} /> */}
         </Routes>
       
      {/* <div className='w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center ' >
        <div className='w-96 bg-white shadow-lg' >
          <div>
          <p> Hi {user && user.displayName}</p>
          </div>
            <div className="m-5">
             <button className='inline-block px-12 py-2.5 bg-blue-600 text-white  text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  shadow-blue-600/50   font-semibold '
             onClick={logout}
             >
              Logout
              </button>
            </div>

        </div>
      </div> */}
      
      </main>
      <div className=''>
         <Footer />
      </div>
    </div>
  )
}

export default Dashboard