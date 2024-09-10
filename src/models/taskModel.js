const mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/responses');
const { v4: uuidv4 } = require("uuid");

const dbConfig = config.mysql;
let connection;

conMyslq();

function conMyslq() {

	connection = mysql.createConnection(dbConfig);

	connection.connect((error) => {
		if (error) {
			console.log('Error:', error);
			setTimeout(conMyslq(), 200);
		} else {
			console.log('Se realizo la conexion con exito');
		}
	});

	connection.on('error', error => {
		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			conMyslq();
		} else {
			throw error;
		}
	});

}

function getAllTasks() {

	return new Promise((resolve, reject) => {

		const query = `select * from tasks`;

		connection.query(query, (error, result) => {
			if (error) return reject(error);

			resolve(result);
		});

	});

}

function saveTask(data) {

	return new Promise((resolve, reject) => {

		const uuid = uuidv4();
		const taskData = [data.title, data.description, uuid, 'activo'];
		const query = `insert into tasks (title, description, slug, status) value (?,?,?, 'curso')`;

		connection.query(query, taskData, (error, result) => {

			if (error) return reject(error);

			data['slug'] = uuid;
			data['status'] = 'curso'

			const dataResult = { task: data, statusQuery: result };

			resolve(dataResult);
		});

	});

}

function updateTask(slug, data) {

	return new Promise((resolve, reject) => {

		const taskData = [data.title, data.description, slug];
		const query = `update tasks set title = ?, description = ? where slug = ?`;

		connection.query(query, taskData, (error, result) => {

			if (error) return reject(error);

			const dataResult = { task: data, statusQuery: result };

			resolve(dataResult);
		});

	});

}

function updateStatusTask(slug, data) {

	return new Promise((resolve, reject) => {

		const taskData = [data.status, slug];
		const query = `update tasks set status = ? where slug = ?`;

		connection.query(query, taskData, (error, result) => {

			if (error) return reject(error);

			const dataResult = { task: data, statusQuery: result };

			resolve(dataResult);

		});

	});

}

function deleteTask(slug) {
	return new Promise((resolve, reject) => {

		const taskData = [slug]
		const query = `delete from tasks where slug = ?`;

		connection.query(query, taskData, (error, result) => {

			if (error) return reject(error);

			const dataResult = { task: slug, statusQuery: result };

			resolve(dataResult)
		})

	});
}

module.exports = {
	getAllTasks,
	saveTask,
	updateTask,
	updateStatusTask,
	deleteTask
};