const express = require('express');
const router=express.Router()
// const auth=require('./../middleware/auth')
const Product = require("../models/product");

router.get('/api/products', (req, res) => {
    // let pageSize=+req.query.pagesize
    // let currentPage=+req.query.currentpage
    let fetchedProducts
    const query=Product.find()
    // if(pageSize && currentPage){
    //     query.skip(pageSize*(currentPage-1)).limit(pageSize)
    // }
    query.then(documents=>{
        fetchedProducts=documents
        return Product.count()
    })
    .then((count)=>{
        res.status(200).json({
            message:"products found",
            products:fetchedProducts,
            totalProducts:count
        })
    })
    
});

router.get('/api/products/:id',(req, res) => {
    Product.findById(req.params.id).then((data)=>{
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({
                message:"Product notfound"
            })
        }
        
    })
    
});

router.post('/api/products/new',(req, res) => {
    const product=new Product({
        title:req.body.title,
        content:req.body.content,
        imagePath:url+'/images/'+req.file.filename,
        creator:req.userData.userId
    })
    product.save().then(data=>{
        res.status(201).json({
            message:"product created successfully"
        })
    })
});

router.put('/api/products/:id',(req, res) => {
    const product=new Product({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        imagePath:imagePath

    })
    Product.updateOne({_id:req.params.id,creator:req.userData.userId},product).then(result=>{
        if(result.modifiedCount>0){
        res.status(200).json({
            message:"Product updated successfully"
            
        })
        }
        else{
            res.status(401).json({
                message:"Product update failed"
                
            })
        }
    })
})

router.delete('/api/products/:id',(req, res) => {
    Product.deleteOne({_id:req.params.id ,creator:req.userData.userId}).then(result=>{
        console.log(result);
        if(result.deletedCount>0){
            res.status(200).json({
                message:"Product deleted",
            })
        }
        else{
            res.status(401).json({
                message:"Product delete failed"
                
            })
        }
    })
});

module.exports = router;