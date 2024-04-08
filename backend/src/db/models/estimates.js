const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const estimates = sequelize.define(
    'estimates',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Draft', 'Sent', 'Approved', 'Rejected', 'Follow Up'],
      },

      validUntil: {
        type: DataTypes.DATE,
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

  estimates.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.estimates.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.estimates.belongsTo(db.templates, {
      as: 'templateId',
      foreignKey: {
        name: 'templateIdId',
      },
      constraints: false,
    });

    db.estimates.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.estimates.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return estimates;
};
