const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const jobs = sequelize.define(
    'jobs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      description: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: [
          'New',

          'Repair',

          'Service',

          'Inspection',

          'Insurance',

          'Retail',

          'Waranty',
        ],
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Active', 'Approved', 'Quoted', 'Completed', 'Invoiced'],
      },

      category: {
        type: DataTypes.ENUM,

        values: ['Commercial', 'Property Management', 'Residential'],
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

  jobs.associate = (db) => {
    db.jobs.belongsToMany(db.users, {
      as: 'assigned_userId',
      foreignKey: {
        name: 'jobs_assigned_userIdId',
      },
      constraints: false,
      through: 'jobsAssigned_userIdUsers',
    });

    db.jobs.belongsToMany(db.teams, {
      as: 'assignedTeamId',
      foreignKey: {
        name: 'jobs_assignedTeamIdId',
      },
      constraints: false,
      through: 'jobsAssignedTeamIdTeams',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.jobs.hasMany(db.estimates, {
      as: 'estimates_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.images, {
      as: 'images_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.documents, {
      as: 'documents_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    //end loop

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.jobs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return jobs;
};
