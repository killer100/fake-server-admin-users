var express = require('express');
var cors = require('cors')
var app = express();
var users = require('./data/users.js');

app.use(cors())

app.get('/admin/customers', function (req, res) {

	const page = parseInt(req.query.page) || 1;
	const pageSize = parseInt(req.query.pageSize) || 10;	
	
	const items = users.slice((page - 1) * pageSize).slice(0,  pageSize);
	
	res.send({items : items, total: users.length});
});

app.get('/admin/customers/:id', function (req, res) {

	const id = req.params.id;
	
	const filteredUsers = users.filter(x => x._id == id);
	
	let user = null;
	
	if(filteredUsers.length > 0)
		user = filteredUsers[0];
	
	res.send({user: user});
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});