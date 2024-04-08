const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AppointmentDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointment = await db.appointment.create(
      {
        id: data.id || undefined,

        date: data.date || null,
        address: data.address || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await appointment.setContactId(data.contactId || null, {
      transaction,
    });

    await appointment.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    return appointment;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const appointmentData = data.map((item, index) => ({
      id: item.id || undefined,

      date: item.date || null,
      address: item.address || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const appointment = await db.appointment.bulkCreate(appointmentData, {
      transaction,
    });

    // For each item created, replace relation files

    return appointment;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointment = await db.appointment.findByPk(id, {}, { transaction });

    await appointment.update(
      {
        date: data.date || null,
        address: data.address || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await appointment.setContactId(data.contactId || null, {
      transaction,
    });

    await appointment.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    return appointment;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointment = await db.appointment.findByPk(id, options);

    await appointment.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await appointment.destroy({
      transaction,
    });

    return appointment;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const appointment = await db.appointment.findOne(
      { where },
      { transaction },
    );

    if (!appointment) {
      return appointment;
    }

    const output = appointment.get({ plain: true });

    output.contactId = await appointment.getContactId({
      transaction,
    });

    output.assignedUserId = await appointment.getAssignedUserId({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.contacts,
        as: 'contactId',
      },

      {
        model: db.users,
        as: 'assignedUserId',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('appointment', 'address', filter.address),
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.contactId) {
        var listItems = filter.contactId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          contactIdId: { [Op.or]: listItems },
        };
      }

      if (filter.assignedUserId) {
        var listItems = filter.assignedUserId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assignedUserIdId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.appointment.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.appointment.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('appointment', 'id', query),
        ],
      };
    }

    const records = await db.appointment.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
