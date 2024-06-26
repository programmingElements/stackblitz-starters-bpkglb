const express = require("express");
const {createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee} = require("../controllers/employee.controllers");

const router = express.Router();

router.route('/add-emp').post(createEmployee)
router.route('/all-emp').get(getEmployees)
router.route('/emp/:id').get(getEmployee)
router.route('/edit-emp/:id').put(updateEmployee)
router.route('/delete-emp/:id').delete(deleteEmployee)

module.exports = {
    employeeRouter : router
}