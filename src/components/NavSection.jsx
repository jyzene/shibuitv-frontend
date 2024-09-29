import React, { useState } from "react";
import x from '../assets/x.svg'
import menu from '../assets/menu.svg'
import { Link } from 'react-router-dom'

const NavSection = () => {

    const [ hideMenu, setHideMenu] = useState(true);
    const [ showMenu, setShowMenu] = useState(false);

    const Hide_Show_Nav = () => {
        setHideMenu(!hideMenu);
        setShowMenu(!showMenu);
    }

    if(hideMenu) {
        console.log('esconder menu')
    }else{
        console.log('no funciono')
    }

    return(
        <>
            {hideMenu &&
                <div className='flex flex-row-reverse p-2 m-9'>
                    <button onClick={Hide_Show_Nav}>
                        <img src={menu} alt="ver menu" />
                    </button>
                </div>
            }

{showMenu &&
            <div className='flex flex-col bg-wood overflow-y-auto fixed inset-0 w-screen h-screen animate-fadeIn'>
                <section className='flex justify-end m-12 xxxsm:max-xsm:m-6'>
                    <button onClick={Hide_Show_Nav}><img src={x} alt="salir" /></button>
                </section>
                <div>
                    <nav className='flex flex-row-reverse'>
                        <ul className='font-subtitle text-lg text-right text-paper m-12 xxxsm:max-xsm:m-0 md:max-lg:text-xl lg:text-xxxl lg:m-0'>
                            <li className='m-12 p-3 px-5 hover:bg-green hover:text-wood transition duration-500 hover:text-orange rounded-base'><Link to="/library">Library</Link></li>
                            <li className='m-12 p-3 px-5 hover:bg-green hover:text-wood transition duration-500 hover:text-orange rounded-base'><Link to="/schedule">Schedule</Link></li>
                            <li className='m-12 p-3 px-5 hover:bg-green hover:text-wood transition duration-500 hover:text-orange rounded-base lg:my-0'>Help</li>
                        </ul>
                    </nav>
                </div>
            </div>
        }
        </>
    )
}

export default NavSection