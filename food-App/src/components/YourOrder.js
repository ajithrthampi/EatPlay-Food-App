import React, {useEffect, useState} from 'react'
import Header from './Header'
import avatar11 from "../assets/avatar11.png"
import {MdPayment} from 'react-icons/md'
import i1 from "../assets/i1.png"
import f5 from "../assets/f5.png"
import {Link} from 'react-router-dom'
import {collection, getDocs, query} from 'firebase/firestore'
import {db} from '../firebase'
import ReactPaginate from 'react-paginate';
import SignupCollection from '../Collections/SignupCollection'

const YourOrder = () => {

    const [showOption, setShowOption] = useState(false)
    const [inbox, setInbox] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [orderData, setOrderData] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [currentUser, setCurrentUser] = useState([]);

    const handleClick = () => {
        setShowOption(!showOption)
    }
    const handleInbox = () => {
        setInbox(!inbox)
    }

    const handleFavorite = () => {
        setFavorite(!favorite)
    }
    useEffect(() => {
        getOrders()
        userData()
    }, [])
     
    const getOrders = async () => {
        const uidEmail = localStorage.getItem("email")
        const q = query(collection(db, "helloUCart"))
        const querySnapshot = await getDocs(q);
        const dataa = querySnapshot && querySnapshot ?. docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log("Logged datasss",dataa);

        console.log("Order data", dataa);    
        setOrderData(dataa)
        const fil = dataa && dataa ?. filter(n => n?.email === uidEmail)
        console.log("New cart dataaaa", fil);
        setCartProducts(fil)  
    }
console.log("Cart Productsm mmmmmmmmmmmmmmmm",cartProducts);

const userData = async () => {
    const unId = localStorage.getItem("email")
    console.log("Local DATA", unId);
    const data = await SignupCollection.getAllUser()
    const userData = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const fil = userData && userData?.filter(n => n.email === unId)
   console.log("First filter", fil);
    console.log(userData, "Hello  ");
    setCurrentUser(fil)
  
    //  forceUpdate()
  }

  //<-----------------Pagibation--------------->
  
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(cartProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(cartProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, cartProducts]);

 
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cartProducts.length;
    setItemOffset(newOffset);
  };



    return (
        <div className='w-screen h-[1000px]  flex flex-col bg-primary'>
            <Header/>

            <div className='mt-14 md:mt-20 px-4 md:px-16 w-full  py-4'>
                <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900"/>


                <div className='grid grid-cols-3 gap-4 py-5'>

                    {/* First Column-1 */}
                    <div className="col-span-1 ">
                    {currentUser ?. map((doc, index) => {
                            return(
                                
                           <div>
                        <div className='flex'>

                            <img className='w-14 h-14  object-cover rounded-full'
                                src={doc.imageUrl} 
                                alt="logo"/>
                            <div className='pl-5 py-2 capitalize text-xl text-gray-600'>{doc.name}</div>
                            {/* <div className='text-sm pt-9 '>{doc.email}</div> */}
                        </div> 
                        <div className='text-sm pl-16 font-extralight'>{doc.email}</div> 
                        </div>
                         )
                        })
                    }   
                        <div>
                            <div className="">


                                <div className="relative inline-block  text-left pt-12">
                                    <div>
                                        <button onClick={handleClick}
                                            type="button"
                                            className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true">
                                            Transaction

                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                    </div>


                                    {
                                    showOption && (
                                        <div className="absolute left-36 z-10 mt-2 top-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-3 " role="none">

                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Waiting for payment</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Ongoing transaction</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-2">All transaction</a>

                                            </div>
                                        </div>

                                    )
                                } </div>

                            </div>
                        </div>


                        <div>
                            <div className="">
                                <div className="relative inline-block text-left pt-24">
                                    <div>
                                        <button onClick={handleInbox}
                                            type="button"
                                            className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true">
                                            Inbox

                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                    </div>


                                    {
                                    inbox && (
                                        <div className="absolute left-36 z-10 mt-2 top-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-3 " role="none">

                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Chat</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Discussion</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-2">Review</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Costumer help</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Update</a>

                                            </div>
                                        </div>
                                    )
                                } </div>


                            </div>
                        </div>

                        {/* <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900" /> */}

                        <div>
                            <div className="">


                                <div className="relative inline-block text-left  pt-24">
                                    <div>
                                        <button onClick={handleFavorite}
                                            type="button"
                                            className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true">
                                            Favorite

                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                                            </svg>
                                        </button>
                                    </div>


                                    {
                                    favorite && (
                                        <div className="absolute left-36 z-10 mt-2 top-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-3 " role="none">

                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Wishlist</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-1">Recently viewed</a>
                                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1" id="menu-item-0">Update</a>
                                            </div>
                                        </div>
                                    )
                                } </div>
                            </div>
                        </div>
                    </div>


                    {/*2 nd column-2  */}
                    <div className=" col-span-2 pl-4">

                        <div className='flex gap-52 '>
                            <div className='text-textColor font-bold'>
                                <Link to="/profile">Profile</Link>
                            </div>
                            {/* <div className='text-textColor font-bold'><Link to="/address">Address</Link> </div> */}
                            <div className='text-textColor font-bold'>
                                <Link to="/yourorder">Your Order</Link>
                            </div>
                            {/* <div className='text-textColor font-bold'><Link to="/wishlist">My Wishlist</Link></div> */} </div>
                        <hr className="my-6 h-px bg-gray-400 border-0 dark:bg-gray-900"/> {/* <div className='flex space-x-10 '>
                            
                            
                        </div> */}
                        <div>
                            
                       {currentItems && currentItems.length > 0 ? (currentItems?.map((doc, index) => {
                        return (             
                                         
                            <div 
                            // key={doc[1].id}
                             className="bg-white shadow-lg  m-8 p-8 flex md:bg-orange  rounded-3xl   border border-gray-300">
                                                <div className=' grid grid-cols-3 '>
                                                    <div className="col-span- ">
                                                        {/* <div className=" sm:w-2/3"> */}

                                                            <div className='flex gap-4'>
                                                            <h3 className='text-sm font-bold pb-6 '>{doc?.date}
                                                            </h3>
                                                            <p className=' text-xs font-bold text-green-500'>Completed</p>
                                                            <h3 className=" text-xs text-textColor font-bold">INV/20210703/MPL/1374771502</h3>

                                                        </div>

                                                        <div className=" flex gap-">

                                                            <img className="rounded-xl md:border-white md:border-solid md:border-4 w-150"
                                                                src={doc?.imageAsset}
                                                         
                                                                />
                                                            <div className='py-4 '>
                                                                <h3 className="text-orange text-sm font-semibold ">
                                                                   {doc?.name}
                                                                   {/* {doc[1]?.name}
                                                                   {doc[2]?.name}
                                                                   {doc[3 ]?.name} */}
                                                                   
                                                                   </h3>
                                                                <p className='text-sm'><span>{doc?.qty}</span> item -
                                                                    <span className=' text-green-500'>$</span>
                                                                    {doc?.price}
                                                                    </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                )
                                            })) : ( <div className='w-full flex flex-col items-center justify-center'>
                                            <img src="" className="h-340"/>
                                            <p className='text-xl text-headingColor font font-semibold my-2'>
                                                Order History is Empty
                                            </p>
                            
                                        </div>)
                                        }
                            </div>

                            <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName= "page-num"
        previousLinkClassName='page-num'
        nextClassName='page-num'
        activeLinkClassName='active'
      />



                        </div>
                    </div>
                </div>
            </div>
       
    )
}

export default YourOrder
