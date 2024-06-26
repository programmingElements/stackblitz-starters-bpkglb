const {Employee} = require("../models/employee.models")

const createEmployee = async (request, response) => {
    try {
        const {name, email, phone, city} = request.body;

        if (!(name.trim() && email.trim())) {
            throw new Error("Please Provide name and email.")
        }
        
        const employee = new Employee({
            name,
            email,
            phone,
            city
        });

        await employee.save();
        return response.status(201).json(employee);
    } catch (error) {
        console.log("Error : ", error);
        return response.status(500).json({message: error.message});
    }
}

const getEmployees = async (request, response) => {
    try {
        const employees = await Employee.find();
        return response.status(200).json(employees);
    } catch (error) {
        console.log("Error : ", error);
        return response.status(500).json({message: error.message});
    }
}

const getEmployee = async (request, response) => {
    try {
        const employee = await Employee.findById(request.params.id);

        if (!employee) {
            throw new Error("Employee Not Found!")
        }

        return response.status(200).json(employee);
    } catch (error) {
        console.log('Error : ', error);
        return response.status(500).json({message: error.message})
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee
}