
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginImage from "../assets/LoginImage.jpg"
import AdminCollectioin from '../Collections/AdminCollectioin'
import { useUserAuth } from '../context/UserAuthContext'




const AdminLogin = () => {

 
    const [emails, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { adminlogIn } = useUserAuth();
    const [state, setState] = useState("")
  

    useEffect(() => {
        // adminData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = await AdminCollectioin.getAllAdmin();
        const dataa = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       

        let checkAdmin = dataa.find(o => (o.email === emails && o.password === password));

        if (checkAdmin) {
            console.log("Login Succeful");
            navigate("/admindash/admindashboard")
        } else {
            console.log("Wrong password or username");
            setError("Wrong password or email")
            navigate("/adminlogin")
        }
        console.log("obj dataa", checkAdmin);

    }
    console.log("email", emails);
    console.log('password', password);



    return (
        <div className="relative w-full h-screen bg-zinc-900/90">
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src={LoginImage} alt="/" />

            <div className='flex justify-center items-center h-full '>
                <form className=" rounded-lg max-w-[400px] w-full mx-auto bg-white p-12"
                    onSubmit={handleSubmit}
                >
                    {/* <h3> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg> </h3> */}
                    <h2 className='text-4xl font-bold text-center text-black py-4 relative p-8 '> Admin Login</h2>
                    <div className='flex justify-between'>
                        {/* <p>Icon facebook</p>
                    <p></p> */}
                    </div>
                    <div className='text-red-500 relative'>{error}</div>

                    <div className='flex flex-col mb-4'>
                        <label className='relative '>Email</label>
                        <input className=' rounded-lg border relative bg-gray-100 p-2'
                            type="text"
                            name="email"
                            defaultValue={emails}
                            onChange={e => setEmail(e.target.value)}

                        />
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='relative'>Password</label>
                        <input className='rounded-lg border relative bg-gray-100 p-2'
                            type="password"
                            name="password"
                            defaultValue={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button className=' rounded-lg text-white w-full py-3 mt-8  bg-indigo-600 hover:bg-indigo-500 relative '>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin