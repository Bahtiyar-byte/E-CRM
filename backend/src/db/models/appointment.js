const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const appointment = sequelize.define(
    'appointment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      date: {
        type: DataTypes.DATE,
      },

      address: {
        type: DataTypes.TEXT,
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

  appointment.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.appointment.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.appointment.belongsTo(db.users, {
      as: 'assignedUserId',
      foreignKey: {
        name: 'assignedUserIdId',
      },
      constraints: false,
    });

    db.appointment.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.appointment.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return appointment;
};
