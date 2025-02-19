const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;