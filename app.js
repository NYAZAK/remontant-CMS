const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');

app.set('port', (process.env.port || 3000));

app.use(cors());

//app.use((req, res, next) =>{
//    console.log(`req handle at ${new Date()}`);
//    next();
//});

const use = app.use((req, res) =>{
	const err = new Error('404 - not found ');
	err.status = 404;
	res.json({msg: 'not found', err: err});
});



app.use('/api/v1', api);

app.listen(app.get('port'), () => {
	console.log(`ecoute le port ${app.get('port')} `);
});

