'use strict'
const { Model } = require('sequelize')

const today = new Date();
const hundredDaysFromToday = today.setDate(today.getDate() + 100);

module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    static associate(models) {
      Goal.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Goal.init({
    goalAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 5000
    },
    beginDate: {
      type: DataTypes.STRING,
      defaultValue: new Date(new Date()).toLocaleString([], {
        weekday: "long",
        month: 'short', day: 'numeric', year: 'numeric'
      })
    },
    endDate: {
      type: DataTypes.DATE,
      defaultValue: new Date(hundredDaysFromToday).toLocaleString([], {
        weekday: "long",
        month: 'short', day: 'numeric', year: 'numeric'
      })
    },
    numbersPicked: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    sumOfNumbersPicked: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
    {
      sequelize,
      modelName: 'Goal',
    })
  return Goal
}
