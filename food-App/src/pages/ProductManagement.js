import { CollectionReference } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useReducer, useState } from 'react'
import CategoryCollection from '../Collections/CategoryCollection';
import ProductCollection from '../Collections/ProductCollection';
import CreateContainer from '../components/CreateContainer';
import { storage } from '../firebase';
import ReactPaginate from 'react-paginate';
import './product.css'


const ProductManagement = (props) => {



  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [reducerValue , forceUpdate] = useReducer(x => x + 1, 0)

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [categorys, setCategory] = useState("")
  const [number, setNumber] = useState("");
  const [product, setProduct] = useState("")
  const [imageURL, setImage] = useState(null)
  const [state, setState] = useState("")

  const [msg, setMsg] = useState(null);

  const uploadImage = (e) => {
   const imageFile = e.target.files[0];
   console.log(imageFile);

   const storageRef = ref(storage, `Images/ &{Date.now()}-${imageFile.name}`)
   const uploadTask = uploadBytesResumable(storageRef, imageFile);

   uploadTask.on('state_changed', (snapshot) => {
    const uploadProgress = (snapshot.bytesTransferred / snapshot. totalBytes) * 100;
   }, (error) => {
    console.log(error);
    setMsg("Error while uploading : try Again")
   }, () => {
    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
      setImage(downloadURL);
      setMsg("Image Uploaded succesfully")
     })
    })
  }

  

  const handleChange = event => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleSubmit = async (e) => {
   
// console.log(products);
    e.preventDefault()
    console.log(categorys.length);
    if(categorys){

      
  
    console.log("hi");
    // setShowModal(false)

    const products = {
      name,
      date,
      categorys,
      number,
      imageURL,
    }
    setName("")
    setDate("")
    setCategory("")
    setNumber("")


    await ProductCollection.addProducts(products);
    console.log(products);
    // forceUpdate()

  }

}
  useEffect(() => {
    getProducts();
    getcategory();
  }, [
    reducerValue 
  ])

  const getProducts = async () => {
    const data = await ProductCollection.getAllProducts();
    setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log("Hello TbVDB",product);
  }


  const deleteHandler = async (id, url) => {
    await ProductCollection.deleteUser(id)
    console.log("deleted");

    forceUpdate()
  }

  const getcategory = async () => {
    const datat = await CategoryCollection.getAllCategory();
    setState(datat.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  
  const openModal = () => {
    setShowModal(!showModal)
  }

  ///<-------------Pagination------------->


   const [currentItems, setCurrentItems] = useState([]);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
   const itemsPerPage = 4;
 
   useEffect(() => {
     const endOffset = itemOffset + itemsPerPage;
     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
     setCurrentItems(product.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(product.length / itemsPerPage));
   }, [itemOffset, itemsPerPage, product]);
 
  
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % product.length;
     setItemOffset(newOffset);
   };


  return (
    <>

      <br />
      <div className='centered md:text-4xl '>Product Management</div>

      <br />
      <div>
        <button
          onClick={openModal}
          className=' inline-block sm:px-12 px-5 py-2.5 bg-blue-600 md:bg-red-400 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  shadow-blue-600/50 md:shadow-red-400/50  '

        >
          Add Product
        </button>
      </div>
      <br />
      <br />
      <br />


      <table className="border-collapse w-50 ">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">S.No</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Category</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Date</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Amount</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>

            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
          </tr>
        </thead>
        <tbody className=''>

          {currentItems && currentItems?.map((doc, index) => {
            return (
              <tr

                key={doc.id}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">S.No</span>
                  {index + 1}
                  
                </td>


                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Product</span>
                  {doc.category}

                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Product</span>
                  {doc.name}

                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Date</span>

                  {doc.date}

                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Amount</span>
                  {doc.price }
                </td>

                <td className="w-full lg:w-auto p-3 text-black text-lg border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Image</span>    
                  <img className='w-[150px] ' src={doc.imageAsset} alt="image"  />
                 
                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static hover:cursor">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Product</span>

                  <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold "
                  //  onClick={(e) => deleteHandler()} 
                  >Edit</span>
                  &nbsp;
                  &nbsp;
                  <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold cursor-pointer"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>

            )
          })}

        </tbody>
      </table>

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
      {showModal ? (
        <>

        {/* <CreateContainer    /> */}
         <div
            className=" h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            
             


                   <CreateContainer   action={openModal}/>
             
            </div>
          </div>
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </>
      ) : null   }




    </>

  )
}

export default ProductManagement