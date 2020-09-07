import React, { useState, useEffect } from 'react';
import './table.css'
import axios from 'axios';

const Table = ({ empleado, baseUrl, editarUsu }) => {

   const [data, guardarData] = useState([]);
   const [actualizarAPI, guardarActualizarApi] = useState(true);

   useEffect(() => {

      const obtenerDato = async () => {

         try {
            const datos = await axios.get(baseUrl);
            guardarData(datos.data);

            //poner el state en false para no quede actualizando siempre
            guardarActualizarApi(false)
         } catch (error) {

         }
      }
      //actualizar listado cuando se agregue un empleado
      if (empleado) {
         obtenerDato();
      }
      //actualizar listado cuando se elimine un empleado
      if (actualizarAPI) {
         obtenerDato();
      }

   }, [empleado, actualizarAPI, baseUrl])

   //Eliminar un item
   const eliminar = async (id) => {

      try {
         await axios.delete(baseUrl + id)
         guardarActualizarApi(true)
      } catch (error) {
         console.log(error)
      }
   }

   return (

      <div className="flex flex-col mx-auto p-8 mt-8 w-2/3">
         <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
               <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                  <table className='min-w-full divide-y bg-gray-200'>
                     <thead>
                        <tr>
                           <th className="px-6 py-3 bg-gray-50 text-left leading-4 font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                           <th className="px-6 py-3 bg-gray-50 text-left leading-4 font-semibold text-gray-600 uppercase tracking-wider">Apellido</th>
                           <th className="px-6 py-3 bg-gray-50 text-left leading-4 font-semibold text-gray-600 uppercase tracking-wider">Telefono</th>
                           <th className="px-6 py-3 bg-gray-50 text-left leading-4 font-semibold text-gray-600 uppercase tracking-wider">Direccion</th>
                           <th className="px-6 py-3 bg-gray-50 text-left leading-4 font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                           <th className="px-6 py-3 bg-gray-50 text-left leading-4 font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {data.length > 0 ? (
                           data.map((user) => (
                              <tr key={user.id}>
                                 <td className="px-6 py-4 whitespace-no-wrap text-gray-800">{user.nombre}</td>
                                 <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{user.apellido}</td>
                                 <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{user.telefono}</td>
                                 <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{user.direccion}</td>
                                 <td className="px-6 py-4 whitespace-no-wrap text-gray-700">{user.email}</td>
                                 <td className="px-6 py-4 whitespace-no-wrap text-gray-700">
                                    <button
                                       className="m-2 py-3 px-5 bg-transparent hover:bg-green-300 text-green-500 font-semibold hover:text-white border border-green-300 hover:border-transparent rounded"
                                       onClick={() => editarUsu(user)}
                                    >
                                       Editar
                           </button>
                                    <button
                                       className="m-2 py-3 px-5 bg-transparent hover:bg-red-300 text-red-500 font-semibold hover:text-white border border-red-300 hover:border-transparent rounded"
                                       onClick={() => eliminar(user.id)}
                                    >
                                       Eliminar
                            </button>
                                 </td>
                              </tr>
                           ))
                        ) : (
                              <tr>
                                 <td className="border px-4 py-2">No hay usuarios actualmente</td>
                              </tr>
                           )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>

   );
}

export default Table;