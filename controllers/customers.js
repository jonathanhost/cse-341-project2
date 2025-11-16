const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger-tags=['customers']
  try {
    const result = await mongodb.getDatabase().db().collection('customers').find();
    const customers = await result.toArray();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger-tags=['customers']
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const customerId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('customers').find({ _id: customerId });
    const customers = await result.toArray();

    if (!customers[0]) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customers[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error: error.message });
  }
};

const createCustomer = async (req, res) => {
  //#swagger-tags=['customers']
  try {
    // validação simples
    if (!req.body.firstName || !req.body.email) {
      return res.status(400).json({ message: "firstName and email are required" });
    }

    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      address: req.body.address
    };

    const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);

    if (response.acknowledged) {
      return res.status(201).json({ message: "Customer created successfully" });
    }

    res.status(500).json({ message: "Failed to create customer" });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  //#swagger-tags=['customers']
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const customerId = new ObjectId(id);

    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      address: req.body.address
    };

    const response = await mongodb.getDatabase().db().collection('customers')
      .replaceOne({ _id: customerId }, customer);

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }

    res.status(404).json({ message: "Customer not found or not updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  //#swagger-tags=['customers']
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const customerId = new ObjectId(id);

    const response = await mongodb.getDatabase().db().collection('customers')
      .deleteOne({ _id: customerId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    }

    res.status(404).json({ message: "Customer not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
