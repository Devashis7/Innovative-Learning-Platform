import React, { useContext } from 'react'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
// import { RxCross2 } from "react-icons/rx";
import profileImage from "/profileImage.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';


const UserProfileSubCard = () => {
  const {logout}=useContext(AuthContext);
  
  return (
<div className='relative'>

    <div>
      <div className="bg-[#3a4968] text-white rounded-lg w-72 p-4 pt-10 shadow-lg">
      <div className="flex items-center gap-4 flex-col">
        <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
            <img src={profileImage} alt=""  className="h-[50px]" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <AiOutlineUser className="text-xl" />
          <Link to="/profile" className="text-sm font-medium">Profile </Link>
        </div>
        <button onClick={logout} className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <AiOutlineLogout className="text-xl" />
          <p className="text-sm font-medium">Sign Out</p>
        </button>
      </div>
    </div>
    {/* <div className=' absolute -top-3 right-3'>
      <i className='p-3'><RxCross2 size={25} /></i>
    </div> */}
    </div>

</div>


  )
}

export default UserProfileSubCard
