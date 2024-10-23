var express = require('express');
const product = require('../model/product');

var router = express.Router();

router.post('/product',async (req, res,next)=>{
       const {name, category} = req.body;
       try {
        const newproduct = new product({
            name: name,
            category: category
        })
        const savedproduct = await newproduct.save();
        res.json(savedproduct);
       } catch (error) {
        next(error);
       }
})

router.get('/product',async (req,res,next)=>{
    try {
       const allproducts = await product.find();
       var records = [];
       allproducts.forEach((prod)=>{
               if(prod){
                const prodrecord = {
                    id: prod.id,
                    name: prod.name,
                    category: prod.category

                }
                records.push(prodrecord)
               }

               
       })
       res.json(records);
    } catch (error) {
        next(error);
    }
    // res.send('respond with a resource');

})

router.get('/product/:id', async (req,res,next)=>{
    try {
       const prod = await product.findById(req.params.id);
       res.json({
        id: prod.id,
        name: prod.name,
        category: prod.category
       })
    } catch (error) {
       next(error); 
    }
})

router.put('/product/:id', async (req,res,next)=>{
    try {
       const requestbody = {name: req.body.name, category: req.body.category};
       let prod = await product.findById(req.params.id);
       if(!prod){
        return res.status(404).json({msg: 'Product Not Found'})
       }
       const updateprod = await product.findByIdAndUpdate(req.params.id,requestbody,{new: true});
       res.json(updateprod);
    } catch (error) {
        next(error);
    }
})

router.delete('/product/:id', async (req,res,next)=>{
    console.log(req.params.id);
   
    try {
        const prod = await product.findOneAndDelete(req.params.id);
        res.send(`product ${prod.name} deleted`)
    } catch (error) {
        next(error);
    }
})

module.exports=router;
