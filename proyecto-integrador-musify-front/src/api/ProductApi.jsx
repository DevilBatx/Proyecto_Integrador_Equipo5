export const getProductById = async (apiURL, productId) => {    
    try {
        const response = await fetch(`${apiURL}/public/products/${productId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el producto por id:', error);
        throw error;
    }
};


export const getProductList = async (apiURL) => {    
    try {
        const response = await fetch(`${apiURL}/public/products`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        throw error;
    }
};

export const updateProduct = async (apiURL, productData) => {
    try {

        const response = await fetch(`${apiURL}/auth/products`, {
            method: 'PUT',
            body: productData,
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
};


export const deleteProduct = async (apiURL, productId) => {
    try {
        const response = await fetch(`${apiURL}/auth/products?id=${productId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);            
        } 
        const data = await response.text();
        return data;        
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
};


export const getCategories = async (apiURL) => {
    try {
        const response = await fetch(`${apiURL}/public/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',}
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las categories:', error);
        throw error;
    }
};
