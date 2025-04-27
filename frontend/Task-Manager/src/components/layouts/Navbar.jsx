import React, {useState} from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const {openSideMenu, setOpenSideMenu} = useState(false);
    return (
        <div className='flex gap-5 bg-white border boredr-b border-b border-gray-200/50 background-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button 
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2x1"/>
                ) : (
                    <HiOutlineMenu className="text2x1"/>
                )}
            </button>

            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}
        </div>
    )
}

export default Navbar