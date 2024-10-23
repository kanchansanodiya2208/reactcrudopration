import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductForm from './components/AddProduct';
import ProductsDisplay from './components/ManageProduct';
import EditProductForm from './components/EditProduct';

function App() {
  return (
    <div className="container card mb-4 box-shadow">
     <div className='card-header'>
       <h4>
        Mern Frontend
       </h4>
     </div>
     <Routes>
      <Route path='/' element={<Navigate to="/read" />}/>
      <Route exact path='/create' element={<ProductForm/>}/>
      <Route exact path='/read' element={<ProductsDisplay/>}/>
      <Route exact path='/edit/:id' element={<EditProductForm/>}/>
     </Routes>
    </div>

  );
}

export default App;
