const axios = require('axios')
const cheerio = require('cheerio')

/**
 * Returns text in an element free from whitespace
 * @param {HTMLElement} element 
 */
function getElementText(element) {
	return element.text().replace(/[\n\t\r]/g, '')
} 

/**
 * Scrapes www.cph.dk/flyinformation/{afgange|ankomster}/{query} and returns flights
 * @param {string} type 
 * @param {string} keyword 
 * @param {string} date 
 * @param {string} time 
 */
async function fetchFlights(type, keyword = '', date = '', time = '') {
	try {
		const response = await axios.get(`https://www.cph.dk/flyinformation/${type}/?keyword=${keyword}&direction=A&date=${date}&time=${time}`)
		const $ = cheerio.load(response.data)
		const rows = $('.flights .stylish-table__row--body')

		const flights = rows.map((index, row) => {
			const time = getElementText( $(row).find('.flights__table__col--time span:first-child') )
			const time_expected = getElementText( $(row).find('.flights__table__col--time .v--mobile-only') )
			const airline = getElementText( $(row).find('.flights__table__col--destination .v--mobile-only') )
			const flight = getElementText( $(row).find('.flights__table__col--destination .main-flight') )
			const tofrom = getElementText( $(row).find('.flights__table__col--destination strong span') )
			const statusText = getElementText( $(row).find('.stylish-table__cell:nth-child(6)') )
			const delayed = !!time_expected.length
			const city = tofrom.split(' - ')[0]
			const airport = tofrom.split(' - ')[1]

			return { time, time_expected, delayed, airline, flight, city, airport }
		}).get()

		return flights
	} catch (error) {
		throw error
	}
}

module.exports = fetchFlights