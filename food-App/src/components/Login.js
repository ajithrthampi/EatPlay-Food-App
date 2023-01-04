import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from '../context/UserAuthContext'
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import  app, { auth }  from "../firebase"
import pixel  from "../assets/pixel.jpg"



const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { logIn } = useUserAuth();
  const [error, setError] = useState("")
  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
     const token = localStorage.getItem("token");
    //  const email = localStorage.getyItem("email")

     if(token) {
      navigate("/dashboard")
     }
  }, [])
  // const auth = getAuth();
  // const uid = auth.currentUser.uid;
  // console.log(uid);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try { 
      await logIn(email, password)
      // setLoading(true)
        .then((userCredential) => {
          localStorage.setItem("token", userCredential._tokenResponse.idToken)
          localStorage.setItem("email", email)
          setLoading(true)
          navigate("/dashboard")
        })
        
    } catch (err) {
      setError("Entered email or password is incorrect")
    } 
    // if (errors) {
    //   setErrors("password")
    // }
    console.log("signup data");
  }

  console.log(getAuth().currentUser); 
  console.log("React Tailwind");

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">

      <div className='bg-white flex flex-col justify-center'>
        <form className=' border  border-black max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'
          onSubmit={handleSubmit}
        >
           
          <h2 className=' text-4xl dark:text-white font-bold text-center '>Login </h2>
          <br />
          <span className='text-red-500'>{error}</span>

          <div className='flex flex-col text-grey-500 py-2'>
            <label className='text-gray-600'> Email Address</label>
            <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-none'
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {/* <div className='text-red-700'>{error}</div> */}
  
          </div>
          <br />

          <div className='flex flex-col text-grey-500 py-2'>
            <label className='text-gray-600'> Password</label>
            <input className=' rounded-full bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-none'
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* {error} */}
          </div>

          <div className='flex justify-between text-gray-500 py-2'>
          </div>
          <br />

          <button className=' w-full inline-block px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
            {loading ? "Logging You in..." : "Login"}
          </button>
          <br />
          <br />

          {/* <button
            className=' border border-black rounded-full w-full inline-block px-10 py-3 text-blue-400 hover:text-white  leading-tight text-sm font-bold shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-shadow-600/50 '
            onClick={googleLogin}
          >
           Login With Google
          </button> */}

       

          <div>
            <Link to="/signup">
              Dont have an account? <span className='text-green-600'>Sign Up</span>
            </Link>

          </div>

        </form>

      </div>

      {/* imaGE PART */}
      <div className='hidden sm:block' >
        <img className='w-full h-screen object-cover' src={pixel} alt="" />
      </div>

    </div>
  )
}

export default Login