require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swagger = require('swagger-ui-express')
const docs = require('swagger-jsdoc')
const path = require('path')

const port = process.env.PORT ?? 3001

const app = express()

const cards = require('./src/routes/card')
const packs = require('./src/routes/pack')

require('./src/db/database').connect()

app.use(bodyParser.json({
	limit: '25mb'
}))

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || origin === 'http://localhost:5173') {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
}))

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.setHeader('Cache-Control', 'no-cache')
	next()
})

app.use('/docs', swagger.serve, swagger.setup(docs({
	swaggerDefinition: {
		info: {
			title: 'Forest Shuffle Calculator',
			version: '1.0.0',
			description: 'A service to retrieve cards and save scores for the forest shuffle calculator.',
		}
	},
	apis: [path.join(__dirname, 'src/models/*.js'), path.join(__dirname, 'src/routes/*.js')]
})))

app.use('/card', cards)
app.use('/pack', packs)

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})