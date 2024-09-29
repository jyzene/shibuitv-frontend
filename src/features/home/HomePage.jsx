import React from "react";
import img1 from "../../assets/img/air_chair.jpg"
import img2 from "../../assets/img/brunch_watercolor.jpg"
import img3 from "../../assets/img/cat.jpg"
import img4 from "../../assets/img/flowers.jpg"
import img5 from "../../assets/img/newspaper_girl.jpg"
import CategorySection from "../../components/mainPage/CategorySection"
import EventsSection from "../../components/mainPage/EventsSection";

const HomePage = () => {
    return(
        <>
            <div className="flex flex-col mr-4 lg:flex-row lg:mr-16">
                <section className="flex flex-col text-left ml-8 mr-8">
                    <h2 className="font-title text-dark-chocolate text-xl tracking-wide lg:text-xxxl mb-0">
                        Shibui
                    </h2>
                    <h3 className="font-subtitle text-md">ʃɪˈbuːi • adjetive</h3>
                    <p className="font-paragraph text-base2 pr-16 lg:text-md">Subtle aesthetic that combines simplicity with depth. 
                    Brought to television.</p>
                </section>
                <section className="flex flex-row ml-32 mr-8 lg:w-1/2">
                    <article className="flex flex-col justify-end mr-2">
                        <img src={img4} alt="flowers" />
                    </article>
                    <article className="flex flex-col justify-end mt-8 mr-2">
                        <img src={img5} alt="girl" />
                        <img src={img2} alt="brunch" />
                    </article>
                    <article className="flex flex-col">
                        <img src={img1} alt="chair" />
                        <img src={img3} alt="cat" />
                    </article>
                </section>
            </div>
            <CategorySection/>
            <EventsSection/>
        </>
    )
}

export default HomePage

