import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container,Form, Button, Alert, } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditProductForm = () => {
    const baseurl = "http://localhost:8080/product/";
const navigate = useNavigate();
const [enteredName, setName] = useState('');
const [enteredCategory, setCategory] = useState('');
const param = useParams();
const [productId, setProductId] = useState('');

useEffect(()=>{
    console.log(param.id);
    axios.get(baseurl + param.id).then((response)=>{
        const productData = response.data
        setProductId(productData.id);
        setName(productData.name);
        setCategory(productData.category);
    })
    .catch((error)=>{
        alert("Error" + error);
    })
},[param.id])

const nameChangeHandler = (event) =>{
    setName(event.target.value);
 }
 
 const categoryChangeHandler = (event) =>{
     setCategory(event.target.value);
 }

 const submitHandler = (event) =>{
    event.preventDefault();
    axios.put(baseurl + param.id, {
        id: productId,
        name: enteredName,
        category: enteredCategory
    })
    .then((response)=>{
    alert("Product" + productId + "Updated");
    navigate('/read')
    })
    .catch(error=>{
        alert("Error" + error);
    })
}
 
    return(
        <Alert variant='primary'>
        <h1>Edit</h1>
        <Container>
           <Form onSubmit={submitHandler}> 
           <Form.Group controlId="form.Name">
               <Form.Label > Product Name </Form.Label>
                <Form.Control type="text" value={enteredName} onChange={nameChangeHandler} placeholder="enter product name" required></Form.Control>     
           </Form.Group>

           <Form.Group controlId="form.Category">
               <Form.Label > Product Category </Form.Label>
                <Form.Control type="text" value={enteredCategory} onChange={categoryChangeHandler} placeholder="enter product category" required></Form.Control>     
           </Form.Group>
           <br></br>
           <Button type="submit">Add Product</Button>
           <Button type="submit" onClick={()=>navigate("/read")}>Cancel</Button>

           </Form>
        </Container>
   </Alert>
    );
}
export default EditProductForm;