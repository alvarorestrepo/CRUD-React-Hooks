import React, { Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Login = () => {

    //state de react-hook para recibir los valores
    const { register, handleSubmit, errors } = useForm();
    const [error, mostrarError] = useState(false)

    const onSubmit = async (data, e) => {

        // console.log(data)

        // Send a POST request
        try {
            await axios.post("http://127.0.0.1:8000/api/login", data)
                .then(response => {
                    if (response) {
                        // console.log(response);
                        if (response.data.res === true) {

                            window.location = "/crud"
                            mostrarError(false)
                            return;
                        }
                        mostrarError(true)
                    }

                })

        } catch (error) {
            console.log(error)
        }

        //Reset al formulario
        e.target.reset()
    }

    return (
        <Fragment>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md container mx-auto shadow-lg p-5"
            >
                <h2 className="text-2xl text-center p-3 shadown-md mb-5 text-white w-full bg-teal-500">Login</h2>
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                        name='email'
                        type="text"
                        placeholder='Email'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                        autoFocus />
                </div>
                <div className="w-full font-semibold text-red-700 text-center">
                    {errors?.email?.message}
                </div>
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="password"
                        name="password"
                        placeholder='Contraseña'
                        ref={register({
                            required: { value: true, message: 'Campo requerido' }
                        })}
                    />
                </div>
                <div className="w-full font-semibold text-red-700 text-center">
                    {errors?.password?.message}
                </div>
                <div>
                    {error ?
                        <div className="bg-red-200 text-center"> Usuario o contraseña erroneos</div>
                        : null}
                </div>
                <button
                    className='w-full mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                >Ingresar</button>

            </form>
        </Fragment >
    );
}

export default Login;