const express=require('express')
const router=express.Router()
const contacts=require('../models/contactmodel')

// Method : GET  || API : localhost:3000/contacts/all
router.get('/all', async (req, res) => {
    try {
        const contacts = await Contacts.find()
        return res.status(200).json(contacts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// Method : POST  || API : localhost:3000/contacts/add
router.post('/add',  async (req, res) => {
    try {
        const newcontact = new Contacts(req.body)
        const { name, phone } = newcontact
        if (!name || !phone ) {
            return res.status(400).json({ message: `All fields required ${name} ${phone}` })
        }
        await newcontact.save()
        return res.status(200).json(newcontact)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// Method : PUT  || API : localhost:3000/contacts/edit/_id
router.put('/edit/:id',  async (req, res) => {
    try {
        const id = req.params.id
        const existingcontact = await Contacts.findOne({ _id: id })
        if (!existingcontact) {
            return res.status(404).json({ message: "Contact not found" })
        }
        const updatedproduct = await Contacts.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(updatedproduct)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// Method : DELETE  || API : localhost:3000/contacts/delete/_id
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const existingcontact = await Contacts.findOne({ _id: id })
        if (!existingcontact) {
            res.status(404).json({ message: "Contact not found" })
        }
        await Contacts.findByIdAndDelete(id)
        return res.status(200).json({ message: "Contact Deleted" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
module.exports = router
