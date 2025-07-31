import { Sequelize } from "sequelize";
import { db } from "../database/index.js";

const { DataTypes } = Sequelize;

const BookingModel = db.define("booking", {
    name_user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id_car: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name_car: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image_car: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    start_time: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    end_time: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
});

export default BookingModel;