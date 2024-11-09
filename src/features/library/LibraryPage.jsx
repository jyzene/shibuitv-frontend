import React, {useState, useEffect} from "react";
import filter from '../../assets/filter.svg'
import search from '../../assets/search.svg'
import wine from '../../assets/img/wine.jpg'

const LibraryPage = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const token = localStorage.getItem('token');

    // Función para obtener los datos de la API
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/Posts/PostInfo/", {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error al obtener los posts");
            }
        
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Llamada a la API al cargar el componente
    useEffect(() => {
        fetchPosts();
    }, [token]);

    // Filtrar los posts según el término de búsqueda
    const filteredPosts = posts.filter((post) =>
        post.tituloPost.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para manejar el cambio en el input de búsqueda
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return(
        <>
            <div className="flex flex-col m-10 ml-20 max-md:m-10">
                <h2 className="font-title text-dark-chocolate text-xl text-left tracking-wide lg:text-xxxl mb-0">Library</h2>
                <p className="font-paragraph text-left text-base2 pr-16 lg:text-md">We’ve got a lot of content. Take a look!</p>
                <section className="flex flex-row w-1/2 mt-8">
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
                        <img src={filter} alt="filter" />
                    </button>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Buscar posts..."
                        className="bg-paper font-paragraph text-wood border-2 border-dark-green p-2 rounded-full w-full mt-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        <img src={search} alt="search" />
                    </button>
                </section>
                {/* publicaciones */}
                <div className="mt-10 flex flex-wrap justify-start gap-5 max-md:flex-col max-md:align-center">
                    {filteredPosts.map((post) => (
                        <section
                            key={post.id}
                            className="flex flex-col bg-white border-solid border p-5 mb-5"
                        >
                            <article className="md:max-lg:w-24 lg:w-48 mb-5">
                            {/* Mostrar la imagen del post (thumbnail en base64) */}
                            <img
                                src={post.thumbnailPost}
                                alt={post.tituloPost}
                                className="w-full h-auto"
                            />
                            </article>
                            <h6 className="font-subtitle text-left text-md">
                            {post.tituloPost}
                            </h6>
                            <p className="font-paragraph text-left text-base2">
                            by {post.idHostPost_nombresHost} {post.idHostPost_apellidosHost}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LibraryPage

