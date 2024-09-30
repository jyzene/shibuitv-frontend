import React from "react";

const DashboardLayout = ({ children }) => {

    return(
        <>
            <div className="flex flex-col mt-24 pl-20 place-items-start h-screen bg-paper">
                {children}
            </div>
        </>
    )
}

export default DashboardLayout