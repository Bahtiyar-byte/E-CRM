const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const teams = sequelize.define(
    'teams',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
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

  teams.associate = (db) => {
    db.teams.belongsToMany(db.users, {
      as: 'members',
      foreignKey: {
        name: 'teams_membersId',
      },
      constraints: false,
      through: 'teamsMembersUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.teams.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.teams.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return teams;
};
