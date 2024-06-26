const Employee = require("../models/employee.models")

const createEmployee = async (request, response) => {
    try {
        const {name, email, phone, city} = request.body;

        if (!(name.trim() && email.trim())) {
            return new Error("Please Provide name and email.")
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
        response.status(500).json({message: error});
    }
}

module.exports = {
    createEmployee
}