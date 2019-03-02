const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');

const mongoose = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000));

app.use(cors());

//app.use((req, res, next) =>{
	//    console.log(`req handle at ${new Date()}`);
	//    next();
	//});
	
	app.use('/api/v1', api);
const use = app.use((req, res) =>{
	const err = new Error('404 - not found ');
	err.status = 404;
	res.json({msg: 'not found', err: err});
});

mongoose.connect('mongodb://localhost:27017/cmsbis', 
{useNewUrlParser: true});
connection.on('error', (err) => {
	console.error(`connection à mongodb erreur : ${err.message}` ); 
});


connection.once(`open`, ()=> {
	console.log('connection à MDB');
		app.listen(app.get('port'), () => {
		console.log(`ecoute le port ${app.get('port')} `);
	});
})


