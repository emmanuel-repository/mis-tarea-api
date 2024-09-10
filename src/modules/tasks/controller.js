const db = require('../../models/taskModel');

function getListTask() {
	return db.getAllTasks();
}

function saveTask(data) {

	const validate = validateFormTask(data);

	if (validate.length > 0) throw validate;

	return db.saveTask(data);
}

function updateTask(data) {

	const validate = validateFormTask(data.body);

	if (validate.length > 0) throw validate;

	return db.updateTask(data.params.id, data.body);
}

function updateStatusTask(data) {
	return db.updateStatusTask(data.params.id, data.body);
}

function validateFormTask(data) {

	const error = [];
	const notValidData = [undefined, null, ''];

	if (notValidData.includes(data.title)) error.push({ item: 'title', message: 'El valor del Titulo no esta asignado' });

	if (notValidData.includes(data.description)) error.push({ item: 'description', message: 'El valor de la Descripcion no esta asignado' });

	return error;
}

function deleteTask(data) {
	return db.deleteTask(data.params.id);
}

module.exports = {
	getListTask,
	updateTask,
	saveTask,
	updateStatusTask,
	deleteTask
}