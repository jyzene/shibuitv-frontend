import React from "react";

const FormLayout = ({ children }) => {

    return(
        <>
            <div className="flex flex-col mt-24 pl-20 place-items-start justify-start h-screen bg-paper">
                {children}
            </div>
        </>
    )
}

export default FormLayout