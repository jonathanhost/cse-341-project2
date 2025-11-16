const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger-tags=['products']
  try {
    const result = await mongodb.getDatabase().db().collection('products').find();
    const products = await result.toArray();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger-tags=['products']
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const productId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
    const products = await result.toArray();

    if (!products[0]) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(products[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

const createProduct = async (req, res) => {
  //#swagger-tags=['products']
  try {
    // Validações básicas
    if (!req.body.name || !req.body.price) {
      return res.status(400).json({
        message: "name and price are required"
      });
    }

    const product = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      color: req.body.color,
      size: req.body.size,
      createdAt: req.body.createdAt
    };

    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);

    if (response.acknowledged) {
      return res.status(201).json({ message: "Product created successfully" });
    }

    res.status(500).json({ message: "Failed to create product" });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  //#swagger-tags=['products']
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const productId = new ObjectId(id);

    const product = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      color: req.body.color,
      size: req.body.size,
      createdAt: req.body.createdAt
    };

    const response = await mongodb.getDatabase().db().collection('products')
      .replaceOne({ _id: productId }, product);

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }

    res.status(404).json({ message: "Product not found or not updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  //#swagger-tags=['products']
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const productId = new ObjectId(id);

    const response = await mongodb.getDatabase().db().collection('products')
      .deleteOne({ _id: productId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    }

    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};
