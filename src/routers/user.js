const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// POST name and location
router.post('/users', async (req, res) => {
	const user = new User(req.body)	

	try {
		await user.save()
		res.status(201).send(user)
	} catch(e) {
		res.status(500).send(e)
	}
})

// GET name and location
// GET users?search=string
router.get('/users', async (req, res) => {

	try {
		let query = ''

		if (req.query.search) {
			query = req.query.search
		}

		const users = await User.find({
			'$or': [
				{'name': {'$regex': query, '$options': 'i'}},
				{'location': {'$regex': query, '$options': 'i'}}
			]
		})

		if (!users.length) {
			return res.status(404).send()
		}

		res.status(200).send(users)
	} catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router