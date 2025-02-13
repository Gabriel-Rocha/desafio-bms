const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const userId = req.userId;

    try {
        const newTask = await Task.create({ user_id: userId, title, description, date });
        res.status(201).json({ message: 'Tarefa criada com sucesso.', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa.', error: error.message });
    }
};

const getTasks = async (req, res) => {
    const userId = req.userId;

    try {
        const tasks = await Task.findAll({ where: { user_id: userId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar tarefas.', error: error.message });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const task = await Task.findOne({ where: { id, user_id: userId } });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefa.', error: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, date, status } = req.body;

    try {
        const task = await Task.findOne({ where: { id, user_id: userId } });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.date = date || task.date;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: 'Tarefa atualizada com sucesso.', task });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa.', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const task = await Task.findOne({ where: { id, user_id: userId } });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir tarefa.', error: error.message });
    }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };