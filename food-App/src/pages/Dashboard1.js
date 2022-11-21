import React, { useCallback, useReducer } from 'react'
import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Bar} from "react-chartjs-2"
import {useEffect, useState} from 'react'
import CartUserCollection from '../Collections/CartUserCollection';
import ProductCollection from '../Collections/ProductCollection';
import CategoryCollection from '../Collections/CategoryCollection';
import {collection, getDocs, query} from 'firebase/firestore';
import {db} from '../firebase';
import SignupCollection from '../Collections/SignupCollection';



chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,)

const Dashboard1 = () => {

    const [user, setUser] = useState("")
    const [product, setProduct] = useState("")
    const [category, setCategory] = useState("")
    const [order, setOrder] = useState("")
    const [chartData, setChartData] = useState({datasets: []});
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


    const [chartOptions, setChartOptions] = useState({});

    React.useEffect(() => {
        allShowUser()
        // allProduct()
        // allCart()

        allOrder()
        setChartData({
            labels: [
                "Users",
                "Products",
                "Cart Products",
                "order",
                // "Purple"
            ],
            datasets: [
                {
                    labels: "All Activity",
                    data: [
                        user, product, category, order,8


                    ],
                    borderColor: 'rgb(53, 192, 235)',
                    backgroundColor: "rgba(138, 72, 155, 0.78)" 
                }
            ]
        })
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "All Activity"
                }
            } 
        })
    }, [user,product,category,order])
   


   
    const allShowUser = useCallback(async () => {
        const data = await SignupCollection.getAllUser();
        const dataa = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log("loooppppp");
        const n = dataa.length
        setUser(n)
    console.log("user details", user);

        const dataw = await ProductCollection.getAllProducts();
        const productss = dataw.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        setProduct(productss.length)
        console.log("pro", data);
 
    console.log("product", product);

        const datas = await CategoryCollection.getAllCategory();
        const categoryss = datas.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        setCategory(categoryss.length)
      
    }, [])
    
    // allShowUser()
    console.log("user details", category);

    const allOrder = useCallback(async () => {
        const q = query(collection(db, "orderedList"))
        const querySnapshot = await getDocs(q);
       
        const dataa = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log("Order", dataa);
        setOrder(dataa.length) 
    }, [])
    allOrder()
    console.log("user details", order);

    return (
        <>
            <div className='centered text-4xl'>Dashboard</div>
            {/* <div  onClick={(e) => allShowUser()} >Hii</div> */}
            <div className='flex     '>
                <div className=''>

                    <div className="text-xl bg-blue-400 shadow-lg text-white m-8 p-8  md:bg-orange  rounded-3xl   border border-gray-300 w-[240px] h-[170px]">
                        <div className=''>Total Users</div>
                        <div className='text-black'> {user} </div>

                    </div>
                </div>

                <div className=''>
                    <div className="text-xl bg-blue-400 shadow-lg text-white m-8 p-8  md:bg-orange  rounded-3xl   border border-gray-300 w-[240px] h-[170px]">
                        <div>Total Products</div>
                        <div className='text-black'> {product} </div>
                    </div>
                </div>
                <div>

                    <div className="text-xl bg-blue-400 shadow-lg text-white m-8 p-8  md:bg-orange  rounded-3xl   border border-gray-300 w-[240px] h-[170px]">
                        <div>Total CartProduct</div>
                        <div className='text-black'> {category} </div>
                    </div>
                </div>
                <div>
                    <div className="text-xl bg-blue-400 shadow-lg text-white m-8 p-8  md:bg-orange  rounded-3xl   border border-gray-300 w-[240px] h-[170px]">
                        <div>Total Order</div>
                        <div className='text-black'> {order} </div>

                    </div>
                </div>
            </div>


            <div className='flex'>

                <div className='w-[800px] '>
                    {/* <Line data={data}/> */}
                    <Bar options={chartOptions}
                        data={chartData}/>
                </div>
{/* 
                <div className='py-8'>
                    <div className="bg-white shadow-lg  m-8 p-8 flex md:bg-orange  rounded-3xl   border border-gray-300 w-[360px] h-[310px]">
                        alfdknkj
                    </div>

                </div> */}

            </div>
        </>
    )

}

export default Dashboard1
