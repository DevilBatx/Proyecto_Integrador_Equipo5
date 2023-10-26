import Header from '../Components/Header'; 
import AddProduct from '../AdminPanel/AddProduct';


const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Header   
  showAuthButtons={false}/>
      <h1 className="text-4xl text-orange-500 font-bold mb-4 text-center">Panel de Administración</h1>
            <AddProduct/>
    </div>
  );
};

export default AdminPage;