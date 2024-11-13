import { Sequelize } from "sequelize";

const db = new Sequelize("sistem_suratdesa", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
