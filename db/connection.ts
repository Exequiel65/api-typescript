import { Sequelize } from "sequelize";

const db = new Sequelize('cursonodets', 'root', '', {
    host : 'localhost',
    dialect : 'mysql',
    //logging : false
})

export default db;