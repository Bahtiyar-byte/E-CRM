const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contacts = sequelize.define(
    'contacts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.TEXT,
      },

      lastName: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      name: {
        type: DataTypes.TEXT,
      },

      phone: {
        type: DataTypes.TEXT,
      },

      address: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['Lead', 'Prospect', 'Customer'],
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

  contacts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.contacts.hasMany(db.notes, {
      as: 'notes_contact',
      foreignKey: {
        name: 'contactId',
      },
      constraints: false,
    });

    db.contacts.hasMany(db.appointment, {
      as: 'appointment_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    //end loop

    db.contacts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contacts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contacts;
};
