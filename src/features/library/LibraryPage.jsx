import React from "react";
import filter from '../../assets/filter.svg'
import search from '../../assets/search.svg'
import wine from '../../assets/img/wine.jpg'

const LibraryPage = () => {
    return(
        <>
            <div className="flex flex-col m-10 ml-20 max-md:m-10">
                <h2 className="font-title text-dark-chocolate text-xl text-left tracking-wide lg:text-xxxl mb-0">Library</h2>
                <p className="font-paragraph text-left text-base2 pr-16 lg:text-md">We’ve got a lot of content. Take a look!</p>
                <section className="flex flex-row w-1/2 mt-8">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        <img src={filter} alt="filter" />
                    </button>
                    <input
                        type="text"
                        // value={inputValue}
                        // onChange={handleInputChange}
                        className="bg-paper font-paragraph text-wood border-2 border-dark-green p-2 rounded-full w-full mt-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        <img src={search} alt="search" />
                    </button>
                </section>
                {/* publicaciones */}
                <div className="mt-10 flex flex-row justify-around max-md:flex-col max-md:align-center">
                    <section className="flex flex-col bg-white border-solid border p-5 mb-5">
                        <article className="md:max-lg:w-24 lg:w-48 mb-5">
                            <img src={wine} alt="wine" />
                        </article>
                        <h6 className="font-subtitle text-left text-md">Oleo painting!</h6>
                        <p className="font-paragraph text-left text-base2 ">by Keren Rodriguez</p>
                    </section>
                    <section className="flex flex-col bg-white border-solid border p-5 mb-5">
                        <article className="md:max-lg:w-24 lg:w-48 mb-5">
                            <img src={wine} alt="wine" />
                        </article>
                        <h6 className="font-subtitle text-left text-md">Oleo painting!</h6>
                        <p className="font-paragraph text-left text-base2 ">by Keren Rodriguez</p>
                    </section>
                    <section className="flex flex-col bg-white border-solid border p-5 mb-5">
                        <article className="md:max-lg:w-24 lg:w-48 mb-5">
                            <img src={wine} alt="wine" />
                        </article>
                        <h6 className="font-subtitle text-left text-md">Oleo painting!</h6>
                        <p className="font-paragraph text-left text-base2 ">by Keren Rodriguez</p>
                    </section>
                    <section className="flex flex-col bg-white border-solid border p-5 mb-5">
                        <article className="md:max-lg:w-24 lg:w-48 mb-5">
                            <img src={wine} alt="wine" />
                        </article>
                        <h6 className="font-subtitle text-left text-md">Oleo painting!</h6>
                        <p className="font-paragraph text-left text-base2 ">by Keren Rodriguez</p>
                    </section>
                    <section className="flex flex-col bg-white border-solid border p-5 mb-5">
                        <article className="md:max-lg:w-24 lg:w-48 mb-5">
                            <img src={wine} alt="wine" />
                        </article>
                        <h6 className="font-subtitle text-left text-md">Oleo painting!</h6>
                        <p className="font-paragraph text-left text-base2 ">by Keren Rodriguez</p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default LibraryPage

