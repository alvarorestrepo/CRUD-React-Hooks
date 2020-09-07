import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


const FormularioEdit = ({ empleadoeditar, baseUrl, cambiarEditar, guardarEmpleado }) => {

    //state de react-hook para recibir los valores
    const { register, handleSubmit, errors, setValue } = useForm({
        defaultValues: empleadoeditar.user
    });

    setValue('id', empleadoeditar.user.id)
    setValue('nombre', empleadoeditar.user.nombre)
    setValue('apellido', empleadoeditar.user.apellido)
    setValue('telefono', empleadoeditar.user.telefono)
    setValue('direccion', empleadoeditar.user.direccion)
    setValue('email', empleadoeditar.user.email)

    const onSubmit = async (data, e) => {

        const id = empleadoeditar.user.id

        // Send a POST request
        try {
            await axios.put(baseUrl + id, data)
        } catch (error) {
            console.log(error)
        }
        //guardar la informacion en el state de APP 
        guardarEmpleado(data)

        //Reset al formulario
        e.target.reset()
        cambiarEditar(false)
    }

    return (
        <Fragment>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-1/3 max-w-md container mx-auto mt-8 p-8 "
            >
                <h2 className='p-3 text-gray-700 mb-1 border rounded shadown text-lg bg-gray-200'>Editar Usuario</h2>
                <div className="flex items-center border-b border-teal-500 py-2">

                    <input
                        className=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        name='nombre'
                        placeholder='Nombre'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                    />
                </div>
                <div className="font-semibold text-red-700 text-center">
                    {errors?.nombre?.message}
                </div>
                <br />
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        name='apellido'
                        placeholder='Apellido'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                    />
                </div>
                <div className="font-semibold text-red-700 text-center">
                    {errors?.nombre?.message}
                </div>
                <br />
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="number"
                        name='telefono'
                        placeholder='Telefono'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                    />
                </div>
                <div className="font-semibold text-red-700 text-center">
                    {errors?.nombre?.message}
                </div>
                <br />
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        name='direccion'
                        placeholder='Direccion'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                    />
                </div>
                <div className="font-semibold text-red-700 text-center">
                    {errors?.nombre?.message}
                </div>
                <br />
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="email"
                        name='email'
                        placeholder='Email'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                    />
                </div>
                <div className="font-semibold text-red-700 text-center">
                    {errors?.nombre?.message}
                </div>
                <button
                    className='mt-8 container mx-auto bg-transparent hover:bg-green-300 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded'
                >Editar empleado</button>
            </form>

        </Fragment>
    );
};

export default FormularioEdit;
