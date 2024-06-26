const express = require("express");
const {createEmployee, getEmployees, getEmployee} = require("../controllers/employee.controllers");

const router = express.Router();

router.route('/add-emp').post(createEmployee)
router.route('/all-emp').get(getEmployees)
router.route('/emp/:id').get(getEmployee)

module.exports = {
    employeeRouter : router
}