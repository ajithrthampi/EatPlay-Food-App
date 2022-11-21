import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
// import { useUserAuth } from '../context/UserAuthContext';
import App, { db } from "../firebase"
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import SignupCollection from "../Collections/SignupCollection"
import { getAuth, updateProfile } from 'firebase/auth'
import { useForm } from "react-hook-form"
import google from "../assets/google.png"
import  app  from "../firebase"
import pixel2  from "../assets/pixel2.jpg"
import { doc, setDoc } from 'firebase/firestore';




const Signup = () => {
  // const {register, formState: {errors}, handleSubmit, } = useForm();
  // const onSubmit = (data) => console.log(data);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false)
  const [messages, setMessages] = useState("")
  const [mes, setMes] = useState(false)
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [state, setState] = useState("")
  const [passMess, setPassMess] = useState(false)
  
  const { signUp } = useUserAuth();

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault()
    const auth = getAuth();

    if(!name){
      setMes(true)
    }
    if(!password) {
      setPassMess(true)
    }

    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setState(regEx)
     if(regEx.test(email) && name &&password){
      // setMessage(" ")
      setLoading(true);
      
     } else if(!regEx.test(email)) {
      setMessage(true)
     }
      else if (email < 0){
         setMessage("Input canot be empty")
      }
    
    setError("")
    try {
      if(name) {
      await signUp(email, password,name)
      const newUser = {
        name,
        email,
        name
      }
      console.log(newUser)
      try {
        if(name){
          const uid = auth.currentUser.uid;
        // await SignupCollection.addUser(newUser);
        console.log("User id", uid);
        await setDoc(doc(db, "signupUser", uid), {
          name,
          email,
          name
        });
        console.log("USer id", uid);
        updateProfile(auth.currentUser, { displayName: name }) // displaying na


        setMessage({ error: false, msg: "New User added successfully!" }) }
      } catch (err) {
        setMessage({ error: true, msg: err.message })
      }
      setName("");
      setEmail("")

      navigate('/login')
    } } catch (err) {
      setError(err.message)
      
    }
  }
  // setLoading(false)
  // useEffect(() => {
    
  // },[message])
 


  const googleLogin = async () => {
       const response = await signInWithPopup(firebaseAuth, provider)
       console.log(response);

       if (response) {
           navigate("/dashboard")
      }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">

      <div className='bg-white flex flex-col justify-center'>
        <form className=' border border-black max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'
          onSubmit={handleSubmit}
         >
          <h2 className='  text-4xl dark:text-white font-bold text-center '>Welcome Back</h2>

          <h5 className='  dark:text-white font-extralight text-center text-sm text-gray-600'>Signup with your email address and password</h5>
          <br />

          <div className='flex flex-col text-grey-500 py-2'>
            <label className='text-gray-600'> Full Name</label>

            <input className='rounded-full border border-gray-300  bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
              type="text"
              name='name'
              defaultValue={name}
              onChange={e => setName(e.target.value)}          
            />         
              {mes && name.length <=0 ? 
              <label style={{color: "red"}}> Name cannot be empty</label>: ""}
           </div>

           <div className='flex flex-col text-grey-500 py-2'>
            <label className='text-gray-600'> Email Address</label>

            <input className='rounded-full border border-gray-300  bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-700 focus:outline-none'
              type="text"
              name="email"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />             
            { message && !state.test(email)? 
              <span style={{color: "red"}}> Invalid email format </span>:""}           
           </div>

           <div className='flex flex-col text-grey-500 py-2'>
            <label className='text-gray-600'> Password</label>
            <input className='rounded-full border border-gray-300   bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-none'
              type="password"
              name="Password"
              defaultValue={password}
              onChange={e => setPassword(e.target.value)}
            />
          {passMess && password.length <=0 ? 
              <label style={{color: "red"}}> Password cannot be empty</label>: ""}

           </div>

           <button
            className='rounded-full w-full inline-block px-10 py-2 bg-green-600 text-white  leading-tight text-xl font-bold shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-shadow-600/50 '
           //  onClick={onSignup}
           >
            {loading ? "Creating User.." : " Sign Up"}
           </button>
            <br/>
           <br/>

       
           <div>
            <Link to="/login" >
              Already have an account ? <span className='text-green-600'>Login</span>
            </Link>
            {/* <p className='text-gray-600'>Already have an account ? Login</p> */}
           </div>
        </form>

      </div>

      {/* imaGE PART */}
      <div className='hidden sm:block' >
        <img className='w-full h-screen object-cover' src={pixel2} alt="" />
      </div>
    </div>
  )
}

export default Signup