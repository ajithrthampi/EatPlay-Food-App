import React from 'react'

const MyModal = ({ visible, onClose }) => {
    const handleOnClose = () => {
        onClose();
    }

    if (!visible) return null;
    return (

        <div>
            <div onClick={handleOnClose}
             className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm 
                flex justify-center items-center'>
                <div className='bg-white p-2 rounded '>
                     <p>User Details</p>
                    
                     </div>
            </div>
        </div>
    )
}

export default MyModal