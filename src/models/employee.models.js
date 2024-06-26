const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        default: 0
    },
    city: {
        type: String
    }
})

const Employee = mongoose.model("Employee", employeeSchema)

module.exports = {
    Employee
}