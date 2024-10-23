import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsDisplay = () => {
  const navigate = useNavigate();
  const baseurl = "http://localhost:8080";
  const [products, setProducts] = useState(null);
  
  const setProductData = () => {
    axios.get(baseurl+ "/product").then((response)=>{
      setProducts(response.data);
      console.log(products);
    })
    .catch(error=>{
      alert("Error Could Not Fetch Product");
    })
  }

  useEffect(()=>{
  setProductData();
  
  },[])

  const removeProduct = (id) =>{
    axios.delete(baseurl+ "/product/"+id).then((response)=>{
       alert("Product" + id + "Deleted");
       setProductData();
       navigate("/read");
    })
    .catch((error)=>{
       alert("Error Ocurred" + error);
    })
  }
    return(
      <div class="card-body">

          <nav>
            <button class="btn btn-primary nav-item active" onClick={()=>navigate("/create")}>Create Product</button>
          </nav>

          <h4>Product List</h4>

        <div class="container"> 
          <div class="row">
            <div class="col-12">
              
              <table class="table table-striped table-bordered">
               
                <thead>
                  <th>id</th>
                  <th>Product Name</th>
                  <th>Product Category</th>
                  <th>Actions</th>
                </thead>

                <tbody>
                {
                    products && products.map((product, index)=>(
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>
                          <Link to={"/edit/" + product.id} class="btn btn-warning" >Edit</Link>
                          <button onClick={()=>removeProduct(product.id)} class="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>

            </div>

          </div>

        </div>


      </div>
    );
}
export default  ProductsDisplay;