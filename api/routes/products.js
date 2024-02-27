const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
router.get("/", (req, res, next) => {
    Product.find().exec().then((docs) => {
        console.log(docs);
        if (docs.length >= 0)
            res.status(200).json(docs)
        else {
            res.status(404).json({
                message: "No Entry Found"
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        })
    })

});

router.post("/", (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });
    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Handling POST requests to /products",
            createdProduct: result
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc)
            res.status(200).json(doc)
        else {
            res.status(400).json({
                message: "No Valid Entry found for prodvided Id"
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            errro: err
        })
    });
})

router.patch('/:productId', (req, res, next) => {
    const _id = req.params.productId;
    console.log(req.body)
    Product.updateOne({ _id }, { $set: { name: req.body.name, price: req.body.price, quantity: req.body.quantity } }).exec().then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(401).json({
            error: err
        })
    });
})

router.delete('/:productId', (req, res, next) => {
    const _id = req.params.productId;
    console.log(_id)
    Product.deleteOne({ _id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(401).json({
                error: err
            })
        });

})

module.exports = router;