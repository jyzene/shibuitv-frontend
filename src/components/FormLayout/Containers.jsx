import React from "react";

const Containers = ({ children }) => {

    return(
        <>
            <div className="flex flex-col mr-20 h-screen">
                {children}
            </div>
        </>
    )
}

export default Containers