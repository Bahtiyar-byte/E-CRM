const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const roles = sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      roleName: {
        type: DataTypes.TEXT,
      },

      permission: {
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

  roles.associate = (db) => {
    db.roles.belongsToMany(db.users, {
      as: 'userId',
      foreignKey: {
        name: 'roles_userIdId',
      },
      constraints: false,
      through: 'rolesUserIdUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.roles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.roles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return roles;
};
