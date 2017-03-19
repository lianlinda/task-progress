var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'task'
});

module.exports = pool;
