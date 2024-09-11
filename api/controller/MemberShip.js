const Membership = require('../modals/membership');

// Get All Memberships
const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMemberships = async (req, res) => {
  const { membershipType, benefits } = req.body;
  try {
    const existingMembership = await Membership.findOne({ membershipType });
    if (existingMembership) {
      return res.status(400).json({ message: `Membership type '${membershipType}' already exists` });
    }

    const newMembership = new Membership({
      membershipType,
      benefits: benefits || '' 
    });

    await newMembership.save();

    res.status(200).json(newMembership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getMemberships,
  createMemberships,

};