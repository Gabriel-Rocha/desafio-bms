const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { cpf } });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já cadastrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ cpf, password: hashedPassword });

        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { cpf, password } = req.body;

    try {

        const user = await User.findOne({ where: { cpf } });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
    }
};

module.exports = { registerUser, loginUser };