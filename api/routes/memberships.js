const express = require('express');
const { getMemberships, createMemberships } = require('../controller/MemberShip');
const router = express.Router();


router.post('/GetAll',getMemberships);
router.post('/Save',createMemberships);



module.exports = router;
