import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import LetterTypes from "./LetterTypeModel.js";

const { DataTypes } = Sequelize;
const LetterRequests = db.define(
  "letter_requests",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    letterTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "pending",
    },
    description_admin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(LetterRequests);
LetterRequests.belongsTo(Users, { foreignKey: "userId" });

LetterTypes.hasMany(LetterRequests);
LetterRequests.belongsTo(LetterTypes, { foreignKey: "letterTypeId" });

export default LetterRequests;
