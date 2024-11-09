import {React, useState, useEffect} from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import SpecialTitleForm from "../../components/FormLayout/SpecialTitleForm";
import Containers from "../../components/FormLayout/Containers";
import FilterButton from "../../components/PostLayout/FilterButton";
import TableForm from "../../components/FormLayout/TableForm";
import PostsTable from "../../components/PostLayout/PostsTable";
import axios from 'axios';
import Swal from 'sweetalert2';

const EventList = () => {
    const [events, setEvents] = useState([]);
    //const [datosFiltrados, setDatosFiltrados] = useState(posts);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/Posts/PostInfoFilter/' , {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        setPosts(response.data);
        } catch (error) {
            Swal.fire('Error', 'Posts could not be loaded', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchPosts();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente

    const WaitlistFilter = () => {
        const filtrado = posts.filter(post => post.estadospost__idEstado === 5);
        setPosts(filtrado); // Actualiza el estado con la lista filtrada
      };
    
      // Función para resetear el filtro
      const resetFilter = () => {
        setPosts(posts); // Resetea a la lista completa
    };

    return(
        <>
            <FormLayout>
                <Containers>
                    <SpecialTitleForm text="Events List"/>
                    <h4 className="text-m font-subtitle text-wood">Take a look at all the posts that have been created!</h4>
                    <div className="space-y-4 space-x-2">
                        <FilterButton label="Approved" />
                        <FilterButton aplicarFiltro={WaitlistFilter} label="Wait List" />
                        <FilterButton label="Denied" />
                        <FilterButton aplicarFiltro={resetFilter} label="Reset" />
                    </div>
                    <Containers>
                        <PostsTable
                            columns={['duracionPost','tituloPost','idCategoriaPost__nombreCategoria','idTipoPost__nombreTipo']}
                            data={posts}
                        />
                    </Containers>
                </Containers>
            </FormLayout>
        </>
    )
}

export default EventList