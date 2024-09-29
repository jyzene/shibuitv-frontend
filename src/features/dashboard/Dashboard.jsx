import React from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleAddCategory = () => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        navigate('/admin/categories');
    };

    const handleAddTypes = () => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        navigate('/admin/types');
    };

    const handleAddHost = () => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        navigate('/admin/host');
    };

    const handleAddUsers = () => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        navigate('/admin/users');
    };

    return(
        <>
            <FormLayout>
                <h1 className="text-lg font-subtitle text-wood">Welcome, Keren</h1>
                <h4 className="text-m font-subtitle text-wood">What do you want to do today?</h4>
                <div className="space-y-4 space-x-2">
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddCategory}>
                    Add Category
                    </button>
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddHost}>
                    Add Creator
                    </button>
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddTypes}>
                    Add a Post Type
                    </button>
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddUsers}>
                    Create User
                    </button>
                    {/* <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64">
                    Create Post
                    </button> */}
                </div>
            </FormLayout>
        </>
    )
}

export default Dashboard

