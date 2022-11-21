import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useReducer, useState } from 'react'
import SignupCollection from '../Collections/SignupCollection'
import { db } from '../firebase';
import MyModal from './MyModal';
import ReactPaginate from 'react-paginate';

const UserManagement = () => {

  // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [user, setUser] = useState([]);
  const [view, setView] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [showMyModal, setShowMyModal] = useState(false)


  useEffect(() => {
    getUser();
  },[reducerValue])

  const getUser = async () => {
    const data = await SignupCollection.getAllUser();
    console.log(data.docs);

    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

  }
  console.log("User Details", user);

  const viewHandler = async (id) => {
    
    const auser = await SignupCollection.getuser(id)
    const view = auser._document.data.value.mapValue.fields
    // setView(view);
   
    console.log("hi");
  }
    const handleOnClose = () => setShowMyModal(false)
    

    const deleteHandler = async (id) => {
      console.log("delete",id);
      // await deleteDoc(doc(db, SignupCollection, id));
      forceUpdate()
      
    }

///<---------------------pagination------------------->


const [currentItems, setCurrentItems] = useState([]);
const [pageCount, setPageCount] = useState(0);
const [itemOffset, setItemOffset] = useState(0);
const itemsPerPage = 8;

useEffect(() => {
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  setCurrentItems(user.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(user.length / itemsPerPage));
}, [itemOffset, itemsPerPage, user]);

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % user.length;
  setItemOffset(newOffset);
};
     
  return (
    <>
      <br/>
      <div className='centered text-4xl '>User Management </div>
      
      <table className="border-collapse w-50">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">S.No</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Users</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Email</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
            {/* <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th> */}
          </tr>
        </thead>
        <tbody>

          {currentItems.map((doc, index) => {
            return (
              <tr key={doc.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">S.No</span>
                  {index + 1}
                </td>

                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Users</span>
                  {doc.name}

                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"> Email</span>

                  {doc.email}
                </td>

                {/* <td class="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
            <span className='"lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"'> Password</span>
           21212332#@!@$#$
            {doc.password}
            
            </td> */}
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>


                  <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold "
                   onClick={(e) => deleteHandler(doc.id)} 
                  >Delete</span>
                  &nbsp;
                  &nbsp;
                  <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold"
                  //  onClick={(e) => viewHandler(doc.id)} 
                   >
                    
                    View
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

       
     
    </>

  )
}

export default UserManagement