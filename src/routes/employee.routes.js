const express = require("express");
const {createEmployee} = require("../controllers/employee.controllers");

const router = express.Router();

router.route('/add-emp').post(createEmployee)

module.exports = {
    employeeRouter : router
}