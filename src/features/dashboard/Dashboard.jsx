import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    // Estado para almacenar los datos obtenidos del localStorage
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('');
    
    // Leer el localStorage cuando el componente se monta
    useEffect(() => {
        const nombreGuardado = localStorage.getItem('username');
        const rolGuardado = localStorage.getItem('user rol');
    
        if (nombreGuardado) {
            setNombre(nombreGuardado);
        }
    
        if (rolGuardado) {
            setRol(rolGuardado);
            console.log(typeof(rol))
        }
    }, []);

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

    const handleAddPost = () => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        navigate('/admin/Posts');
    };

    const handlePostList = () => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        navigate('/admin/PostList');
    };

    return(
        <>
            <DashboardLayout>
                <h1 className="text-lg font-subtitle text-wood">Welcome, { nombre }</h1>
                <h4 className="text-m font-subtitle text-wood">What do you want to do today?</h4>
                <div className="space-y-4 space-x-2">
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddCategory}>
                    Add Categories
                    </button>
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddHost}>
                    Add Hosts
                    </button>
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddTypes}>
                    Add a Post Type
                    </button>
                    { rol === '1' && (
                        <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddUsers}>
                        Users
                        </button>
                    )}
                    
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleAddPost}>
                    Create a new Post
                    </button>
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handlePostList}>
                    Post List
                    </button>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard

