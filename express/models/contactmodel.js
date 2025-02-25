const mongoose = require('mongoose')

const contactModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true

    },
    phone: {
        type: String,
        unique: true,
        required: true
    }
})

const contacts = mongoose.model("contacts", contactModel)
module.exports = contacts