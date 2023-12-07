import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Components/Utils/GlobalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../Components/Card';

const SearchList = () => {
    const { state, apiURL, dispatch } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const getProductList = async () => {
        try {
            const query = params.get('query') || '';
            const startDate = params.get('startDate') || '';
            const endDate = params.get('endDate') || '';

            const response = await fetch(`${apiURL}/public/search?query=${query}&startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getProductList();
    }, [location.search, apiURL, dispatch]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className='p-20 mt-20 '>
                <div className='flex flex-1 justify-between'>
                    <h1 className='text-left text-xl text-orange-500 font-bold py-5'>{params.get('query') || ''}</h1>
                    <button onClick={goBack} className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-gray-700 hover:text-orange-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                    </button>
                </div>
                <div className="bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {
                            products.map((product) => (
                                <Card key={product.id} data={product} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchList;