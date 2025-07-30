import { Sequelize } from "sequelize";
import { db } from "../database/index.js";

const { DataTypes } = Sequelize;

const CarModel = db.define("car", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default CarModel;