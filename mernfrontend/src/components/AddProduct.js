import axios from "axios";
import React, { useState } from "react";
import { Container,Form, Button, Alert, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
const baseurl = "http://localhost:8080/product";
const navigate = useNavigate();
const [enteredName, setName] = useState('');
const [enteredCategory, setCategory] = useState('');

const nameChangeHandler = (event) =>{
   setName(event.target.value);
}

const categoryChangeHandler = (event) =>{
    setCategory(event.target.value);
}

const submitHandler = (event) =>{
    event.preventDefault();
    axios.post(baseurl, {
        name: enteredName,
        category: enteredCategory
    })
    .then((response)=>{
    alert("Product" + enteredName + "Added");
    navigate('/read')
    })
    .catch(error=>{
        alert("Error" + error);
    })
}

const CancelHandler = () =>{
    setName('');
    setCategory('');
    navigate('/read');
}


    return(
        <Alert variant='primary'>
             <h1>Add New Product</h1>
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
                <Button type="submit" onClick={()=>CancelHandler()}>Cancel</Button>

                </Form>
             </Container>
        </Alert>
    )
}
export default ProductForm;