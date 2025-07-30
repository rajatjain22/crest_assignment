import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('shipcause', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;