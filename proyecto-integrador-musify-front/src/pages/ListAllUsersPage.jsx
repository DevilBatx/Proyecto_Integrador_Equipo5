import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';

function ListAllUsersPage() {
    const { authDataApi, state, apiURL, dispatch } = useContext(GlobalContext);
    const [changeUserData, setChangeUserData] = useState([]);
    const [response, setResponse] = useState(null)
    const goBack = () => {
        window.history.back();
    };



    useEffect(() => {
        const UsersApiUrl = (`${apiURL}/auth/user/allUsers`);
        authDataApi(UsersApiUrl);
    }, []);


    const handleEdit = (user) => {
        // Cambio el rol del usuario
        const userUpdated = state.userData.map((userMap) => {
            if (userMap.id === user.id) {

                const newIsAdminValue = userMap.isAdmin === 1 ? 0 : 1;
                userMap.isAdmin = newIsAdminValue;
                setChangeUserData([...changeUserData, userMap])
                return { ...userMap, isAdmin: newIsAdminValue };
            }
            return userMap
        });
        dispatch({ type: "USER_FETCH", payload: userUpdated })
        setResponse(null);
    };

    const handlerClick = async (userData) => {

        setResponse(await fetch(`${apiURL}/auth/user/role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify(userData)

        }))
        setChangeUserData([]);
    }


    return (
        <div className="p-52 mb-10 bg-gray-100 rounded-xl shadow-md h-screen">
            <div className='flex flex-1 justify-end' >
                <button onClick={goBack}
                    className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500 mx-44 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-6">Lista de Usuarios</h1><br />
            <div className="table-container max-h-full overflow-y-auto">
                <table className=" w-full bg-white rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className=" border p-3">ID</th>
                            <th className=" border p-3">Nombre</th>
                            <th className=" border p-3">Apellido</th>
                            <th className=" border p-3">Administrador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.userData) && state.userData.map((user, index) => (
                            <tr key={user.id} className={index % 2 ? 'bg-gray-100' : ''}>
                                <td className="border p-3">{user.id}</td>
                                <td className="border p-3">{user.name}</td>
                                <td className="border p-3">{user.lastName}</td>
                                <td className="border p-3 space-x-2 text-center">
                                    {/* Edit button */}
                                    <input
                                        type="checkbox"
                                        onChange={() => handleEdit(user)}
                                        className=" hover:bg-blue-700 text-gray-700  py-1 px-2 rounded"
                                        checked={user.isAdmin === 1}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=' flex justify-end p-4'>
                <button className='bg-orange-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ' onClick={() => handlerClick(changeUserData)}>Confirmar</button>
            </div>
            <div className='flex justify-end p-4'>
                <p>
                    {response && response.status === 200 && <p className='text-green-500'>Se ha cambiado el rol del usuario</p>}
                </p>
            </div>
        </div>
    );

}

export default ListAllUsersPage