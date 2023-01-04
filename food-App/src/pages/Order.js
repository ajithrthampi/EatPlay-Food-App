import {
    collection,
    doc,
    getDoc,
    getDocs,
    query
} from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import {db} from '../firebase';


const Order = () => {

    const [orderData, setOrderData] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        getOrders()
        // totalProductPrice_Sum()
        allData()
    }, [])

    const getOrders = async () => {
        const q = query(collection(db, "orderedList"))
        const querySnapshot = await getDocs(q);
        const dataa = querySnapshot && querySnapshot ?. docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc.id, "Ordered data =>", dataa);
        setOrderData(dataa)
        // console.log("summed datat", orderData[0].email)
    }
    console.log("ordered data in state", orderData);

    // /////////////////////////////////////////////////////////
    const allData = async () => {
        const uidEmail = localStorage.getItem("email")
        console.log("Loged emai9lsssssssssssss", uidEmail);

        const q = query(collection(db, "userCart"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const dataa = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            const fil = dataa && dataa ?. filter(n => n.email === uidEmail)
            console.log("New cart dataaaa", fil);
            setCartProducts(fil)
        });
    }
    console.log("Cart Productsm mmmmmmmmmmmmmmmm", cartProducts);


    const price = cartProducts.map((cartProduct) => {
        return cartProduct.TotalProductPrice
    })
    console.log("price mnncjhsbcjsgcjgsdcvgsj", price);
    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = price.reduce(reducerOfPrice, 0)
    console.log("total perice", totalPrice);


    // const totalProductPrice_Sum = async () => {
    //     var sum = 0;
    //     const q = query(collection(db, "orderedList"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " =>sdd ", doc.data()["TotalProductPrice"]);

    //         // var value = doc.data()["TotalProductPrice"]
    //         // sum = sum + value;

    //     });
    //     // console.log("Summed value", sum);

    // }

    return (
        <>
            <br/>
            <div className='centered md:text-4xl '>Order</div>
            <br/>

            <table className="border-collapse w-50">
                <thead>
               
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">S.No</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Users</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Price($)</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Products</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Payment Method</th>
                        {/* <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th> */}
                        {/* <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th> */} </tr>
                </thead>

                <tbody> {
                    orderData && orderData ?. map((doc, index) => {
                        return (


                            <tr key={
                                    doc.id
                                }
                                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">S.No</span>
                                    {
                                    index + 1
                                }
                                 </td>

                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Users</span>
                                    {
                                    doc[0]?.email
                                } </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Price</span>

                                    {
                                    doc[0]?.totprice 
                                } </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Price</span>

                                    {doc[0]?.name}
                                    <br/>
                                    {doc[1]?.name}
                                    <br/>
                                    {doc[2]?.name}
                                    <br/>
                                    {doc[3]?.name}
                                    <br/>
                                    {doc[4  ]?.name}
                                    

                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                        Price</span>

                                  Card
                                    

                                </td>
                                {/* <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">

                                    &nbsp;
                                                                                                                                                                                                                                                                                                                                              &nbsp;
                                    <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold cursor-pointer"
                                        onClick={
                                            () => setShowModal(true)
                                    }>
                                        View
                                    </span>
                                </td> */}
                            </tr>

                        )
                    })
                } </tbody>
            </table>
          </>
    )
}

export default Order
