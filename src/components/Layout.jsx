import React from "react";
import { Outlet } from "react-router-dom";
import NavSection from "./NavSection";
import FooterSection from "./FooterSection";

const Layout = () => {
    return (
        <>
            <NavSection/>
            <div className="bg-paper">
                <Outlet></Outlet>
            </div>
            <FooterSection/>
        </>
    )
}


export default Layout