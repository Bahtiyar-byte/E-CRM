const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const templates = sequelize.define(
    'templates',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      material: {
        type: DataTypes.TEXT,
      },

      materialCost: {
        type: DataTypes.DECIMAL,
      },

      Labor: {
        type: DataTypes.TEXT,
      },

      laborCost: {
        type: DataTypes.DECIMAL,
      },

      markup: {
        type: DataTypes.DECIMAL,
      },

      profitMargin: {
        type: DataTypes.DECIMAL,
      },

      totalPrice: {
        type: DataTypes.DECIMAL,
      },

      description: {
        type: DataTypes.TEXT,
      },

      unitOfMeasurement: {
        type: DataTypes.ENUM,

        values: ['SQ', 'LF'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  templates.associate = (db) => {
    db.templates.belongsToMany(db.trades, {
      as: 'trade',
      foreignKey: {
        name: 'templates_tradeId',
      },
      constraints: false,
      through: 'templatesTradeTrades',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.templates.hasMany(db.estimates, {
      as: 'estimates_templateId',
      foreignKey: {
        name: 'templateIdId',
      },
      constraints: false,
    });

    //end loop

    db.templates.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.templates.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return templates;
};
