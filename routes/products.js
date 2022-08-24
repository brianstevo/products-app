const express = require('express');
const router=express.Router()
// const auth=require('./../middleware/auth')
const Product = require("../models/product");

router.get('', (req, res) => {
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

router.get('/:id',(req, res) => {
    Product.findById(req.params.id).then((data)=>{
        if(data){
            res.status(200).json({
                message:"product found",
                product:data
            })
        }
        else{
            res.status(404).json({
                message:"Product notfound"
            })
        }
        
    })
    
});

router.post('',(req, res) => {
    const product=new Product({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category
    })
    product.save().then(data=>{
        res.status(201).json({
            message:"product created successfully"
        })
    })
});

router.put('/:id',(req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
            res.status(400).json({
                error:error
            })
        } else {
            res.status(201).json({
                message:"product created successfully"
            })
        }
      })
})

router.delete('/:id',(req, res) => {

    Product.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            res.status(400).json({
                error:error
            })
        } else {
            res.status(201).json({
            message: 'Product deleted successfully'
            })
        }
      })
});

module.exports = router;