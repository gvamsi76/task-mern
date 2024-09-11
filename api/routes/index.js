
//  to handle the routes
const express = require('express');

const customerRoute = require('./customers');
const memberRoute = require('./memberships');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/Customers',
        route: customerRoute,
    },{
        path: '/Members',
        route: memberRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;