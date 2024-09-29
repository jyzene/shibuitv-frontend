import React from "react";
import ScheduleTable from "../../components/schedulePage/scheduleTable";

const SchedulePage = () => {
    return(
        <>
            <div className="max-lg:m-10 m-20 flex flex-col">
                <section className="flex flex-col">
                    <h2 className="font-subtitle text-lg lg:text-lg text-left text-wood">take a look at our schedule!</h2>
                    <ul className="flex flex-col md2:flex-row justify-between text-left my-5 font-subtitle text-base3 ">
                        <li className="px-4 py-4 border-b-0 border-2 border-solid border-wood">monday</li>
                        <li className="px-4 py-4 border-b-0 border-2 border-solid border-wood">tuesday</li>
                        <li className="px-4 py-4 border-b-0 border-2 border-solid border-wood">wednesday</li>
                        <li className="px-4 py-4 border-b-0 border-2 border-solid border-wood">thursday</li>
                        <li className="px-4 py-4 border-b-0 border-2 border-solid border-wood">friday</li>
                        <li className="px-4 py-4 border-b-0 border-2 border-solid border-wood">saturday</li>
                        <li className="px-4 py-4 border-2 border-solid border-wood">sunday</li>
                    </ul>
                    <h6 className="font-subtitle text-base2 text-left">09.02.2024</h6>
                </section>
                <div>
                    <section className="flex flex-row-reverse justify-around items-center mx-10 mt-10">
                        <h2 className="font-title text-dark-chocolate text-lg md:max-md2:text-xl md2:max-lg:text-xxl lg:text-xxxl">Morning!</h2>
                        <div className="w-16 h-16 xxxsm:max-md:w-8 xxxsm:max-md:h-8 md:max-lg:w-18 md:max-lg:h-18 lg:w-32 lg:h-32  bg-watermelon rounded-full"></div>
                    </section>
                    <ScheduleTable/>
                    <section className="">
                        <h2 className="font-subtitle text-dark-chocolate text-left text-md md:max-md2:text-xl md2:max-lg:text-xl lg:text-xl">having a good evening?</h2>
                        <section className="flex justify-end bg-wood mr-1 p-1 pt-6 rounded-t-full h-58 w-40 
                                                    xxxsm:max-md:h-49 xxxsm:max-md:ml-4 xxxsm:max-md:w-40 xxxsm:max-md:pt-5 lg:w-60 lg:h-80 lg:mr-6">
                            <article className="flex flex-col-reverse bg-green rounded-t-full h-48 w-32 
                                                        mt-0 xxxsm:max-md:h-35 xxxsm:max-md:w-30 lg:w-48 lg:h-72">
                            </article>
                        </section>
                    </section>
                    <ScheduleTable/>
                </div>
            </div>
        </>
    )
}

export default SchedulePage
