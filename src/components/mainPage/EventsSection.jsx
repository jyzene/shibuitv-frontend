import React from "react";
import watercolor_house from '../../assets/img/watercolor_house.jpg'
import matcha from '../../assets/img/matcha.jpg'
import coffee from '../../assets/img/coffee_art.jpg'
import wine from '../../assets/img/wine.jpg'

const EventsSection = () => {
    return(
        <>
            <div className="w-full bg-wood mt-24 p-8 flex flex-col">
                <h2 className="font-title text-paper text-lg tracking-wide mt-10 mb-4 md:max-lg:text-xl lg:text-xxl">Join us</h2>
                <section className="md:max-lg:px-32 lg:px-64 lg:mb-10">
                    <p className="font-subtitle text-base3 bg-sunny-yellow p-3 md:max-lg:text-md xl:text-md xl:px-48">Relax with a cup of coffee while we worry about entertainment</p>
                </section>
                <div className="flex flex-row justify-around">
                    <section className="flex flex-col w-48 max-lg:hidden">
                        <article className="flex flex-row">
                            <img src={coffee} alt="coffee" />
                            <img src={matcha} alt="matcha" />
                        </article>
                        <article className="pb-10">
                            <img src={wine} alt="wine" />
                        </article>
                    </section>
                    <section className="flex flex-col mt-10 mx-4 bg-paper p-6 mb-20">
                        <article className="flex flex-row justify-between">
                            <div className="w-18 h-18 xxxsm:max-md:w-10 xxxsm:max-md:h-10 md:max-lg:w-8 md:max-lg:h-8 lg:w-6 lg:h-6  bg-watermelon rounded-full"></div>
                            <div className="w-18 h-18 xxxsm:max-md:w-10 xxxsm:max-md:h-10 md:max-lg:w-8 md:max-lg:h-8 lg:w-6 lg:h-6  bg-watermelon rounded-full"></div>
                        </article>
                        <article className="flex flex-col text-right mr-4 mt-2">
                            <h1 className="font-title text-lg text-dark-chocolate">01</h1>
                            <h2 className="font-subtitle text-md text-dark-chocolate">August</h2>
                        </article>
                        <section className="flex flex-row text-left justify-between">
                            <article className="flex flex-col ml-6">
                                <h3 className="font-subtitle text-base2 text-dark-chocolate lg:text-md">Current Event</h3>
                                <p className="font-paragraph text-base text-wood lg:text-base3">"Watercolor techniques"</p>
                                <article className="mt-4">
                                    <h3 className="font-subtitle text-base2 text-dark-chocolate lg:text-md">Schedule</h3>
                                    <p className="font-paragraph text-wood text-base lg:text-base3">Every Monday</p>
                                    <p className="font-paragraph text-wood text-base lg:text-base3">14:00 - 16:00</p>
                                </article>
                                <article className="mt-6 flex flex-row flex-wrap">
                                    <p className="bg-green mr-4 mt-1 rounded-full font-paragraph p-1 px-2 text-sm text-paper">Watercolor</p>
                                    <p className="bg-green mr-4 mt-1 rounded-full font-paragraph p-1 px-2 text-sm text-paper">tutorials</p>
                                </article>
                            </article>
                            <article className="ml-4 md:max-lg:w-24 lg:w-48">
                                <img src={watercolor_house} alt="watercolor_house" />
                            </article>
                        </section>
                    </section>
                </div>
            </div>
        </>
    )
}

export default EventsSection
