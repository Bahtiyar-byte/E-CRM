module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'contacts',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'teams',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'notes',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'jobs',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'trades',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'templates',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'estimates',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'appointment',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'images',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'documents',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'phone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'address',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Lead', 'Prospect', 'Customer'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'teams',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'teams',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'notes',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'notes',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'notes',
        'contactId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

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
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Active', 'Approved', 'Quoted', 'Completed', 'Invoiced'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'category',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Commercial', 'Property Management', 'Residential'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'roleName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'permission',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'trades',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'material',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'materialCost',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'Labor',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'laborCost',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'markup',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'profitMargin',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'totalPrice',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'unitOfMeasurement',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['SQ', 'LF'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'templateIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'templates',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Draft', 'Sent', 'Approved', 'Rejected', 'Follow Up'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'validUntil',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment',
        'assignedUserIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment',
        'date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment',
        'address',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'images',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'images',
        'url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documents',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documents',
        'url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('documents', 'url', { transaction });

      await queryInterface.removeColumn('documents', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('images', 'url', { transaction });

      await queryInterface.removeColumn('images', 'jobIdId', { transaction });

      await queryInterface.removeColumn('appointment', 'address', {
        transaction,
      });

      await queryInterface.removeColumn('appointment', 'date', { transaction });

      await queryInterface.removeColumn('appointment', 'assignedUserIdId', {
        transaction,
      });

      await queryInterface.removeColumn('appointment', 'contactIdId', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'validUntil', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'status', { transaction });

      await queryInterface.removeColumn('estimates', 'templateIdId', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'unitOfMeasurement', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'totalPrice', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'profitMargin', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'markup', { transaction });

      await queryInterface.removeColumn('templates', 'laborCost', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'Labor', { transaction });

      await queryInterface.removeColumn('templates', 'materialCost', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'material', {
        transaction,
      });

      await queryInterface.removeColumn('trades', 'name', { transaction });

      await queryInterface.removeColumn('roles', 'permission', { transaction });

      await queryInterface.removeColumn('roles', 'roleName', { transaction });

      await queryInterface.removeColumn('jobs', 'category', { transaction });

      await queryInterface.removeColumn('jobs', 'status', { transaction });

      await queryInterface.removeColumn('jobs', 'type', { transaction });

      await queryInterface.removeColumn('jobs', 'description', { transaction });

      await queryInterface.removeColumn('notes', 'contactId', { transaction });

      await queryInterface.removeColumn('notes', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('notes', 'title', { transaction });

      await queryInterface.removeColumn('teams', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('teams', 'name', { transaction });

      await queryInterface.removeColumn('contacts', 'type', { transaction });

      await queryInterface.removeColumn('contacts', 'address', { transaction });

      await queryInterface.removeColumn('contacts', 'phone', { transaction });

      await queryInterface.removeColumn('contacts', 'name', { transaction });

      await queryInterface.removeColumn('contacts', 'email', { transaction });

      await queryInterface.removeColumn('contacts', 'lastName', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'firstName', {
        transaction,
      });

      await queryInterface.dropTable('documents', { transaction });

      await queryInterface.dropTable('images', { transaction });

      await queryInterface.dropTable('appointment', { transaction });

      await queryInterface.dropTable('estimates', { transaction });

      await queryInterface.dropTable('templates', { transaction });

      await queryInterface.dropTable('trades', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('jobs', { transaction });

      await queryInterface.dropTable('notes', { transaction });

      await queryInterface.dropTable('teams', { transaction });

      await queryInterface.dropTable('contacts', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
