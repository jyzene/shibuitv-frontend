import React, { useState } from "react";
import send from '../assets/send.svg'

const FooterSection = () => {
    const [inputValue, setInputValue] = useState('');
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleEmail = (e) => {
        e.preventDefault();
        console.log("Email: ", inputValue)
    }

    return(
        <>
            <footer>
                <div className='w-full flex flex-col'>
                    <div className='flex flex-row my-6 md:justify-between md:ml-12 md:items-center max-xxxsm:flex-col 
                                    xxxsm:max-md2:flex-col md2:content-center'>
                        <h2 className="font-title text-dark-chocolate text-xl tracking-wide">Shibui</h2>                
                        <section className="px-8 sm:px-16">
                            <form onSubmit={handleEmail}>
                                <div className="mb-4">
                                <label className="text-gray-700 font-subtitle">Subscribe to our newsletter</label>
                                <input
                                    type="email"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="bg-paper font-paragraph text-wood border-2 border-dark-green p-2 rounded-full w-full mt-4"
                                />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    <img src={send} alt="salir" />
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </footer> 
        </>
    )
}

export default FooterSection