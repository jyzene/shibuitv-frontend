import React, { useState } from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import SubmitButton from "../../components/FormLayout/Button";
import InputForm from "../../components/FormLayout/InputForm";
import Containers from "../../components/FormLayout/Containers";
import { useLocation } from "react-router-dom";
import Base64Image from "../../components/Thumbnails/ImageObject";
import axios from 'axios';
import Swal from 'sweetalert2';

// const Base64Image = ({ base64 }) => {
//     return (
//         <div>
//             <img src={base64} alt="Imagen Base64" />
//         </div>
//     );
// };

const EventForm = () => {
    const location = useLocation();
    const post = location.state ? location.state.post : null;
    const base64Code = post.thumbnailPost
    console.log(post)

    const [event, setEvent] = useState({
        nombre_evento: '',  // Nombre del evento
        en_vivo: false,     // Evento en vivo (true o false)
        id_publicacion: post.tituloPost  // ID de la publicación asociada
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Si es checkbox, toma el valor de 'checked', si no, toma 'value'
        const val = type === 'checkbox' ? checked : value;

        setEvent((prevState) => ({
            ...prevState,
            [name]: val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Si usas autenticación

        try {
            const response = await axios.post('http://127.0.0.1:8000/Events/eventos/', event, {
                headers: {
                    Authorization: `Bearer ${token}`, // Si es necesario enviar un token
                },
            });
            Swal.fire('Éxito', 'Event created succesfully', 'success');
            setEvent({
                nombre_evento: '',
                en_vivo: false,
                id_publicacion: ''
            });
        } catch (error) {
            Swal.fire('Error', 'Event could not be added', 'error');
        }
    };

    return (
        <FormLayout>
            <Containers>
                <TitleForm text="Create a new Event"/>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <InputForm
                            type="text"
                            id="nombre_evento"
                            name="nombre_evento"
                            label="Event name"
                            value={event.nombre_evento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="en_vivo">¿Evento en vivo?</label>
                        <input
                            type="checkbox"
                            id="en_vivo"
                            name="en_vivo"
                            checked={event.en_vivo}
                            onChange={handleChange}
                            className="ml-2"
                        />
                    </div>
                    <div className="mb-4">
                        <InputForm
                            type="text"
                            id="id_publicacion"
                            name="id_publicacion"
                            label="Post"
                            value={post.tituloPost}  
                            readOnly  
                        />
                    </div>
                    <Base64Image base64={base64Code} />
                    <SubmitButton text="Guardar Evento"/>
                </form>
            </Containers>
        </FormLayout>
    );
};

export default EventForm;
