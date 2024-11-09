import {React, useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import Containers from "../../components/FormLayout/Containers";
import PostSubtitle from "../../components/PostLayout/PostSubtitle";
import PostDetailText from "../../components/PostLayout/PostDetailText";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const convertGoogleDriveLink = (driveLink) => {
    const fileId = driveLink.match(/d\/([a-zA-Z0-9_-]+)/)[1]; // Extrae el ID del archivo
    return `https://drive.google.com/file/d/${fileId}/preview`;
};

const decimalToTimeString = (newTime) => {
    const minutes = Math.floor(newTime); // Parte entera, que corresponde a los minutos
    const seconds = Math.round((newTime - minutes) * 60); // Parte decimal convertida a segundos
    return `${minutes} minutes ${seconds} seconds`;
};

const PostDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtiene el ID del post de la URL
    const [post, setPost] = useState([]);
    const [link, setLink] = useState("");
    const [duracion, setDuracion] = useState("");
    const [duracionPost, setDuracionPost] = useState();
    const [convertedLink, setConvertedLink] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("");
    const [comentario, setComentario] = useState("");

    const fetchPost = async () => {
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get(`http://127.0.0.1:8000/Posts/PostDetailInfo/${id}` , {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        console.log('response ' ,response)
        setPost(response.data[0]);      
        } catch (error) {
            Swal.fire('Error', 'Posts could not be loaded', 'error');
        }
    };

    useEffect(() => {
        fetchPost()
    }, []);

    // Si necesitas acceder a `post` para algún otro efecto o renderizado, verifica su existencia
    useEffect(() => {
        if (post) {
            console.log(post)
            const driveLink = post.urlPost
            setLink(driveLink)
            const decimal = post.duracionPost
            setDuracionPost(decimal)
            const title = post.tituloPost
            setTitulo(title)
            const description = post.descripPost
            setDescripcion(description)
            const status = post.estadospost__idEstado__descripEstado
            setEstado(status)
            const comment = post.estadospost__comentarioPost
            setComentario(comment)
        } else
        {
            console.log('no hay nada')
        }
    }, [post]);

    useEffect(() => {
        if (link) {
          const newLink = convertGoogleDriveLink(link);
          setConvertedLink(newLink);
        }
    }, [link]);

    useEffect(() => {
        if (duracionPost) {
          const newTime = decimalToTimeString(duracionPost);
          setDuracion(newTime);
        }
    }, [duracionPost]);

    const handlePostInfo = () => {
        navigate('/admin/Events', { state: { post } });
    };

    return(
        <>
           <FormLayout>
            <Containers>
                <TitleForm text={titulo}/>
                <div className="flex flex-row">
                    {convertedLink ? (
                            <div>
                            <iframe
                                src={convertedLink}
                                width="640"
                                height="480"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Google Drive Video"
                            ></iframe>
                            </div>
                        ) : (
                            <p>loading video...</p>
                    )}
                    <section className="ml-10 text-left">
                        <article className="m-4">
                            <PostSubtitle text="Description"/>
                            <PostDetailText text={descripcion}/>
                        </article>
                        <article className="m-4">
                            <PostSubtitle text="Duration"/>
                            <PostDetailText text={duracion}/>
                        </article>
                        <article className="m-4">
                            <PostSubtitle text="Status"/>
                            <PostDetailText text={estado}/>
                        </article>
                        <article className="m-4">
                            <PostSubtitle text="Comment"/>
                            <PostDetailText text={comentario}/>
                        </article>
                    </section>
                </div>
                <div className="mt-4">
                    <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handlePostInfo}>
                        Create an Event
                    </button>
                </div>
            </Containers>
           </FormLayout>
        </>
    )
}

export default PostDetail