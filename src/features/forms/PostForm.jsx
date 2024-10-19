import React, {useState,useEffect} from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import SubmitButton from "../../components/FormLayout/Button";
import InputForm from "../../components/FormLayout/InputForm";
import Containers from "../../components/FormLayout/Containers";
import TableForm from "../../components/FormLayout/TableForm";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

const PostForm = () => {
    const [error, setError] = useState('');
    const [post, setPost] = useState({
        idPostInfo: {  // Datos para crear el estado asociado al post
            tituloPost: '',
            descripPost: '',
            duracionPost: '',
            urlPost: '',
            thumbnailPost: '',
            idHostPost: '',  // ID del presentador
            idCategoriaPost: '',  // ID de la categoría
            idTipoPost: ''  // ID del tipo de post
        },
        idEstado: 5,  // pendiente
        idUsuarioPost: 20,  // ID del usuario que realiza la acción
        comentarioPost: ''
    });
    //const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hosts, setHosts] = useState([]);

    // Función para obtener los tipos desde el API
    const fetchTypes = async () => {
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/typePost/', {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        setTypes(response.data);
        } catch (error) {
            Swal.fire('Error', 'Content Types could not be loaded', 'error');
        }
    };

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/categoryPost/', {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        setCategories(response.data);
        } catch (error) {
            Swal.fire('Error', 'Categories could not be loaded', 'error');
        }
    };

    const fetchHosts = async () => {
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/hostPost/', {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        setHosts(response.data);
        } catch (error) {
            Swal.fire('Error', 'Hosts could not be loaded', 'error');
        }
    };

    useEffect(() => {
        fetchTypes();
        fetchCategories();
        fetchHosts();
    }, []);

    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
          console.log('info ', post)
          const response = await axios.post('http://127.0.0.1:8000/Posts/EstadoPost/', post, {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
          Swal.fire('Éxito', 'Post was added', 'success');
          setPost({
            idPostInfo: {  // Datos para crear el estado asociado al post
                tituloPost: '',
                descripPost: '',
                duracionPost: '',
                urlPost: '',
                thumbnailPost: '',
                idHostPost: '',  // ID del presentador
                idCategoriaPost: '',  // ID de la categoría
                idTipoPost: ''  // ID del tipo de post
            },
            idEstado: 5,  // pendiente
            idUsuarioPost: 20,  // ID del usuario que realiza la acción
            comentarioPost: ''
          });
        } catch (error) {
            Swal.fire('Error', 'Post could not be added', 'error');
        }
      };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        console.log(name,value,type)

        // Check if the field is a file input
        if (type === 'file') {
            const file = e.target.files[0]; // Get the selected file

            if (file) {
                const reader = new FileReader();

                // When the file is successfully read
                reader.onloadend = () => {
                    const base64Image = reader.result;

                    // Update the state with the Base64 encoded image
                    setPost((prevState) => ({
                        ...prevState,
                        idPostInfo: {
                            ...prevState.idPostInfo,
                            [name]: base64Image // Store the Base64 encoded image
                        }
                    }));
                };

                // Read the file as Data URL (Base64)
                reader.readAsDataURL(file);
            }
        } else {
            // Update the post state
            setPost((prevState) => {
                // Check if the field is within idPostInfo
                if (name in prevState.idPostInfo) {
                    let updatedValue = value; // Default to the current value
        
                    // Handle specific validations
                    if (name === 'duracionPost') {
                        // Convert to float
                        updatedValue = parseFloat(value) || ''; // Set to empty string if invalid
                    } else if (name === 'idHostPost' || name === 'idCategoriaPost' || name === 'idTipoPost') {
                        // Convert to integer
                        updatedValue = parseInt(value) || ''; // Set to empty string if invalid
                    }
        
                    // Return new state with updated idPostInfo
                    return {
                        ...prevState,
                        idPostInfo: {
                            ...prevState.idPostInfo,
                            [name]: updatedValue, // Set the updated value
                        }
                    };
                }
        
                // For other fields, maintain the value of text
                return {
                    ...prevState,
                    [name]: value // Set the updated value for non-idPostInfo fields
                };
            });

        }
    }

    return(
        <>
            <FormLayout>
                <Containers>
                    <TitleForm text="Create a new Post"/>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="tituloPost"
                                name="tituloPost"
                                label="Title"
                                value={post.idPostInfo.tituloPost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="descripPost"
                                name="descripPost"
                                label="Description"
                                value={post.idPostInfo.descripPost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="number"
                                id="duracionPost"
                                name="duracionPost"
                                label="Time length"
                                value={post.idPostInfo.duracionPost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="urlPost"
                                name="urlPost"
                                label="URL of the video"
                                value={post.idPostInfo.urlPost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imageUpload">Upload Thumbnail for Video</label>
                            <input
                                type="file"
                                id="thumbnailPost"
                                name="thumbnailPost"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            {/* <InputForm
                                type="text"
                                id="thumbnailPost"
                                name="thumbnailPost"
                                label="URL of the Thumbnail"
                                value={post.idPostInfo.thumbnailPost}
                                onChange={handleChange}
                            /> */}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="idHostPost">Select a Host</label>
                            <select
                                id="idHostPost"
                                name="idHostPost"
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                                required
                            >
                                <option value="">Select a host</option>
                                {hosts.map(host => (
                                    <option key={host.id} value={host.id}>{host.nombresHost} {host.apellidosHost}</option> // Adjust this line according to your data structure
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="idCategoriaPost">Select Category</label>
                            <select
                                id="idCategoriaPost"
                                name="idCategoriaPost"
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.nombreCategoria}</option> // Adjust this line according to your data structure
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="idTipoPost">Select Type</label>
                            <select
                                id="idTipoPost"
                                name="idTipoPost"
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                                required
                            >
                                <option value="">Select a type</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.nombreTipo}</option> // Adjust this line according to your data structure
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <InputForm
                                    type="text"
                                    id="comentarioPost"
                                    name="comentarioPost"
                                    label="Comments"
                                    value={post.comentarioPost}
                                    onChange={handleChange}
                                />
                        </div>
                        <SubmitButton text="submit"/>
                    </form>
                </Containers>
            </FormLayout>
        </>
    )
}

export default PostForm