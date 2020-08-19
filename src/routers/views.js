const express = require('express')
const router = new express.Router()

// Render Homepage
router.get('', (req, res) => {
	res.render('index', {
		title: 'GoRefer Home'
	})
})

module.exports = router