import Header from '../Components/Header'; 
import {
  AddProduct,
  ListProducts,
  PlaceholderButton1,
  PlaceholderButton2
} from '../AdminPanel';


const AdminPage = () => {


  const isMobileOrTablet = window.innerWidth <= 800;

  if (isMobileOrTablet) {
      return <div className="text-center p-4">Pagina no disponible para este dispositivo</div>;  }


  return ( 
<div className="w-full h-full bg-gray-100 p-8">
<Header   
  showAuthButtons={false}/>
            <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
            <div className="flex flex-col space-y-4 p-4">
                <AddProduct />
                <ListProducts />
                <PlaceholderButton1 />
                <PlaceholderButton2 />
                {/* Agregar aca el resto de las opciones de ser necesario */}
            </div>
        </div>




  );
};

export default AdminPage;