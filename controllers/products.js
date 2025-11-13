const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger-tags=['products']
  const result = await mongodb.getDatabase().db().collection('products').find();
  result.toArray().then((products) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products);
  });
};

const getSingle = async (req, res) => {
  //#swagger-tags=['products']
  const productsId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('products').find({ _id: productsId });
  result.toArray().then((products) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products[0]);
  });
};

const createProduct = async (req, res) => {
  //#swagger-tags=['products']
  const product = {
   
    name:req.body.name,
    category:req.body.category,
    price:req.body.price,
    brand:req.body.brand,
    color:req.body.color,
    size:req.body.size,
    createdAt:req.body.createdAt
  }
  const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
  if(response.acknowledged){
    res.status(201).send();
  }
  else{
    res.status(500).json(response.error || "Some error ocorried while create the product");
  }

}

const updateProduct = async (req, res) => {
  //#swagger-tags=['products']
   const productId = new ObjectId(req.params.id);
 const product = {
   
    name:req.body.name,
    category:req.body.category,
    price:req.body.price,
    brand:req.body.brand,
    color:req.body.color,
    size:req.body.size,
    createdAt:req.body.createdAt
  }
  const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
  if(response.modifiedCount > 0 ){
    res.status(204).send();
  }
  else{
    res.status(500).json(response.error || "Some error ocorried while update the products");
  }

}

const deleteProduct = async (req, res) => {
  //#swagger-tags=['products']
   const productId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }, true);
  if(response.deletedCount  > 0 ){
    res.status(204).send();
  }
  else{
    res.status(500).json(response.error || "Some error ocorried while remove the product");
  }

}

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};
