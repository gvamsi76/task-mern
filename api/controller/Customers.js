const express = require('express');
const Customer = require('../modals/customers');
const Membership = require('../modals/membership');


const customerSave = async (req, res) => {
  const { id, firstName, lastName, email, contactNumber, status, membershipId } = req.body;

  try {
    if (id) {
      const existingCustomer = await Customer.findById(id);
      if (!existingCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      const emailTaken = await Customer.findOne({ email, _id: { $ne: id } });
      if (emailTaken) {
        return res.status(400).json({ message: 'Email already in use by another customer' });
      }

      existingCustomer.firstName = firstName;
      existingCustomer.lastName = lastName;
      existingCustomer.email = email;
      existingCustomer.contactNumber = contactNumber;
      existingCustomer.status = status;
      existingCustomer.membershipId = membershipId;

      const updatedCustomer = await existingCustomer.save();
      return res.status(200).json({
        message: 'Customer updated successfully!',
        customer: updatedCustomer
      });
      
    } 

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }

    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      contactNumber,
      status,
      membershipId
    });

    await newCustomer.save();
    return res.status(200).json({
      message: 'Customer created successfully!',
      customer: newCustomer
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const skip = (page - 1) * limit;
    const customers = await Customer.find()
      .populate('membershipId') 
      .skip(skip) 
      .limit(parseInt(limit)); 

    const totalCustomers = await Customer.countDocuments();

    res.status(200).json({
      customers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCustomers / limit),
      totalCustomers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const findCustomer = async (req, res) => {
  try {
    const findCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
    );
    res.json(findCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAllCustomers,
  customerSave,
  findCustomer,
  deleteCustomer,
};
