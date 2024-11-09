import React,{ useEffect,useState } from "react";
import right_arrow from '../../assets/arrow-right.svg'
import right_carrousel from '../../assets/arrow-right-circle.svg'
import left_carrousel from '../../assets/arrow-left-circle.svg'

const CategorySection = () => {

    const [categories, setCategories] = useState([]) //recuerda: get,set

    const fetchCategories = () => {
        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/detallesPost/categoryPost/', {
            method: 'GET', // Método de la solicitud (GET, POST, etc.)
            headers: {
                'Authorization': `Bearer ${token}`, // Agrega el token aquí
                'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido si es necesario
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data);
            setCategories(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchCategories()
    } , []) //ejecuta la funcion solo cuando se levanta la pagina por primera vez


    return(
        <>
        <div className="flex flex-col mb-12 lg:24">
                <section className="flex flex-row-reverse justify-around items-center mx-10 mt-10">
                    <h2 className="font-title text-dark-chocolate text-lg md:max-md2:text-xl md2:max-lg:text-xxl lg:text-xxxl">Categories</h2>
                    <div className="w-16 h-16 xxxsm:max-md:w-8 xxxsm:max-md:h-8 md:max-lg:w-18 md:max-lg:h-18 lg:w-32 lg:h-32  bg-watermelon rounded-full"></div>
                </section>
                <div className="flex flex-row justify-center mt-12">
                    <button className="lg:hidden"><img src={left_carrousel} alt="" /></button>
                    {categories.map((category,index) => (
                        <section className="flex justify-end bg-wood mr-1 p-1 pt-6 rounded-t-full h-58 w-40 
                        xxxsm:max-md:h-49 xxxsm:max-md:ml-4 xxxsm:max-md:w-40 xxxsm:max-md:pt-5 lg:w-60 lg:h-80 lg:mr-6">
                            <article className="flex flex-col-reverse bg-green rounded-t-full h-48 w-32 
                                                    mt-0 xxxsm:max-md:h-35 xxxsm:max-md:w-30 lg:w-48 lg:h-72">
                                <button className="flex justify-center"><img src={right_arrow} alt="salir" /></button>
                                <p className="font-subtitle text-base2 text-paper">{category.nombreCategoria}</p> 
                            </article>
                        </section>
                    ))}
                    <button className="lg:hidden"><img src={right_carrousel} alt="" /></button>
                </div>
            </div>
        </>
    )
}

export default CategorySection

