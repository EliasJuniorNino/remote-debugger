const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '200mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))
app.use(cors());
app.use(express.json());

app.use('/', express.static(__dirname + '/public'));

const sockets = []

app.use('/', (req, res, next) => {
	try {
		console.log('-----------------------------------------------------------');
		console.log(`: ${Intl.DateTimeFormat('pt-br', {
			year: 'numeric', 
			month: 'numeric', 
			day: 'numeric',
			hour: 'numeric', 
			minute: 'numeric', 
			second: 'numeric',
		hour12: false,
		}).format(new Date)}`);
		console.log(JSON.stringify(req.body));
		console.log('-----------------------------------------------------------\n\n');
	} catch (e) {
		console.error(e)	
	}
	if (sockets.length > 0) {
		try {
			for(const socket of sockets) {
				socket.emit('request', {
					body: req.body
				})
			}
		} catch (e) {
			console.error(e)
		}
	}
	res.status(200).send('')
});

const PORT = process.env.PORT || 3333

const server = app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`)
});

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
	sockets.push(socket)
	console.log('a user connected');
});