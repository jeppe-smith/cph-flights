const express = require('express')
const server = express()

// Controllers
const fetchFlights = require('./controllers/fetch-flights')

// Routes
server.get('/api/departures', async (req, res) => {
	try {
		const { keyword, date, time } = req.query
		const flights = await fetchFlights('afgange', keyword, date, time)

		res.status(200).json(flights)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

server.get('/api/arrivals', async (req, res) => {
	try {
		const { keyword, date, time } = req.query
		const flights = await fetchFlights('ankomster', keyword, date, time)

		res.status(200).json(flights)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

server.listen(3000, () => console.log('server running on port 3000, yo'))