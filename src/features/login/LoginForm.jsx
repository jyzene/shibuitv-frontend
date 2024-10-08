import React, {useState} from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/useAuth";

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        nombreUser: '',
        passwordUser: ''
    });

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar los datos a tu API para autenticar el usuario
            const response = await axios.post('http://127.0.0.1:8000/adminUsers/login', formData);

            if (response.status === 200) {
                const data = response.data;
                login(data.access);
                localStorage.setItem('user rol', JSON.stringify(data.user_rol));
                localStorage.setItem('username', JSON.stringify(data.nombreUser));
                navigate('/admin/dashboard');
            }
        } catch (error) {
        // Manejo de errores si las credenciales no son válidas
            console.log(error)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "username or password are wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleChange = (e) => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        setFormData({ //es basicamente el setter
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    return(
        <>
            <div class="min-h-screen bg-gray-100 py-2 flex flex-col justify-center sm:py-12">
                <h2 className="font-title text-paper text-center text-xl mt-4 tracking-wide lg:text-xxxl mb-0">
                    Shibui
                </h2>
                <div class="relative py-1 sm:max-w-xl sm:mx-auto">
                    <div class="relative px-4 py-2">
                        <div class="max-w-md mx-auto">
                            <div class="divide-y divide-gray-200">
                                <div class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-m sm:leading-7">
                                    <form onSubmit={handleSubmit}>
                                        <div class="relative mb-8">
                                            <input autocomplete="off" 
                                                    type="text"
                                                    id="nombreUser"
                                                    name="nombreUser" 
                                                    value={formData.nombreUser}
                                                    onChange={handleChange}
                                                    class="peer placeholder-transparent h-10 w-full px-4 border-2 border-paper rounded-base focus:outline-none text-paper font-subtitle bg-transparent" placeholder="" 
                                                    required
                                            />
                                            <label for="email" class="absolute left-0 -top-3.5 text-paper px-4 text-sm font-subtitle peer-placeholder-shown:text-base
                                             peer-placeholder-shown:text-paper peer-placeholder-shown:top-2 transition-all peer-focus:-top-6 
                                             peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                                        </div>
                                        <div class="relative mb-8">
                                            <input autocomplete="off" 
                                                    type="password"
                                                    id="passwordUser"
                                                    name="passwordUser"
                                                    value={formData.passwordUser}
                                                    onChange={handleChange}
                                                    class="peer placeholder-transparent h-10 w-full px-4 border-2 border-paper rounded-base focus:outline-none text-paper font-subtitle bg-transparent" placeholder="" 
                                                    required/>
                                            <label for="password" class="absolute left-0 -top-3.5 text-paper px-4 text-sm font-subtitle peer-placeholder-shown:text-base peer-placeholder-shown:text-paper peer-placeholder-shown:top-2 transition-all peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                        </div>
                                        <div class="relative">
                                            <button type="submit" class="bg-green text-paper font-subtitle rounded-base px-4 py-1 hover:bg-watermelon hover:animate-fadeIn">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm