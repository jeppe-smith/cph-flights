const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')
const server = express()
const client = path.resolve(__dirname, '../client/dist')
const view = path.resolve(client, 'index.html')
const port = process.env.PORT || 3030

// Controllers
const fetchFlights = require('./controllers/fetch-flights')

console.log(view)

// Server configuration
server.use( history() )
server.use( express.static(client) ) // This must be after applying history function.

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

server.listen(port, () => console.log(`server running on port ${port}, yo`))