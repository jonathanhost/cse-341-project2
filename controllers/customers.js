const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger-tags=['customers']
  const result = await mongodb.getDatabase().db().collection('customers').find();
  result.toArray().then((customers) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers);
  });
};

const getSingle = async (req, res) => {
  //#swagger-tags=['customers']
  const custumerId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('customers').find({ _id: custumerId });
  result.toArray().then((customers) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers[0]);
  });
};

const createCustomer= async (req, res) => {
  //#swagger-tags=['customers']
  const customer = {
   
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phone:req.body.phone,
    birthday:req.body.birthday,
    address:req.body.address
  }
  const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
  if(response.acknowledged){
    res.status(201).send();
  }
  else{
    res.status(500).json(response.error || "Some error ocorried while create the customer");
  }

}

const updateCustomer = async (req, res) => {
  //#swagger-tags=['customers']
   const customerId = new ObjectId(req.params.id);
  const customer = {
   
   firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phone:req.body.phone,
    birthday:req.body.birthday,
    address:req.body.address
  }
  const response = await mongodb.getDatabase().db().collection('customers').replaceOne({ _id: customerId }, customer);
  if(response.modifiedCount > 0 ){
    res.status(204).send();
  }
  else{
    res.status(500).json(response.error || "Some error ocorried while update the contact");
  }

}

const deleteCustomer = async (req, res) => {
  //#swagger-tags=['customers']
   const custumerId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: custumerId }, true);
  if(response.deletedCount  > 0 ){
    res.status(204).send();
  }
  else{
    res.status(500).json(response.error || "Some error ocorried while remove the contact");
  }

}

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
