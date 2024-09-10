const express = require('express');
const responses = require('../../red/responses');
const taskController = require('./controller');

const routes = express.Router();

routes.get('/', async function (req, res) {

	const items = await taskController.getListTask()

	responses.success(req, res, items, 200);

});

routes.post('/create', async function (req, res) {

	try {

		console.log(req.body)

		const newTask = await taskController.saveTask(req.body);

		if (newTask.insertId === 0) throw 'No se guardo la nueva Tarea.'

		responses.success(req, res, newTask.task, 200);

	} catch (error) {
		responses.error(req, res, error, 500);
	}

});

routes.put('/update/:id', async function (req, res) {

	try {

		const updateTask = await taskController.updateTask(req);

		if (updateTask.affectedRows === 0) throw 'No se guardoron los cambios.'

		responses.success(req, res, updateTask.task, 200);

	} catch (error) {
		responses.error(req, res, error, 500);
	}

});

routes.put('/udpate-status/:id', async function (req, res) {
	try {

		const updateStatus = await taskController.updateStatusTask(res);

		if (updateTask.affectedRows === 0) throw 'No se guardoron los cambios.'

		responses.success(req, res, updateStatus.task, 200);

	} catch (error) {
		responses.error(req, res, error, 500);
	}
})

routes.put('/update-status/:id', async function (req, res) {

	try {

		const updateTask = await taskController.updateStatusTask(req);

		if (updateTask.affectedRows === 0) throw 'No se guardor los cambios.'

		responses.success(req, res, updateTask.task, 200);

	} catch (error) {
		responses.error(req, res, error, 500);
	}

});

routes.delete('/delete-task/:id', async function (req, res) {

	try {

		const deleteTask = await taskController.deleteTask(req);

		if (deleteTask.affectedRows === 0) throw 'No se elimino los datos';

		responses.success(req, res, deleteTask.task, 200);

	} catch (error) {
		responses.error(req, res, error, 500);
	}

})

module.exports = routes;

// const result = { task: data, dataInsert: }