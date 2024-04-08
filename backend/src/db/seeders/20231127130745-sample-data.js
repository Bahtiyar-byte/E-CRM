const db = require('../models');
const Users = db.users;

const Contacts = db.contacts;

const Teams = db.teams;

const Notes = db.notes;

const Jobs = db.jobs;

const Trades = db.trades;

const Templates = db.templates;

const Estimates = db.estimates;

const Appointment = db.appointment;

const Images = db.images;

const Documents = db.documents;

const ContactsData = [
  {
    firstName: 'That goddamn Datamate',

    lastName: 'I got that scurvy',

    email: 'val.halvorson@thompson-skiles.net',

    name: 'Emil Fischer',

    phone: '1-720-864-1483 x90306',

    address: 'Apt. 620 350 Lenny Corner, Lake Rory, CT 45271',

    type: 'Lead',
  },

  {
    firstName: 'Like a red-headed stepchild',

    lastName: 'Might be DQ time',

    email: 'adolph.crona@wilkinson-botsford.io',

    name: 'Stephen Hawking',

    phone: '564-590-2794 x60223',

    address:
      'Suite 793 6535 Nicolas Throughway, South Charleentown, ID 05708-9709',

    type: 'Prospect',
  },

  {
    firstName: "I'm washing my hands of it",

    lastName: "C'mon Naomi",

    email: 'luciana@hermann.name',

    name: 'Marcello Malpighi',

    phone: '(639) 585-1525 x31878',

    address: '33710 Kerri Overpass, East Leciaton, GA 50207',

    type: 'Prospect',
  },
];

const TeamsData = [
  {
    name: 'Alexander Fleming',

    description: 'No one tells me shit',

    // type code here for "relation_many" field
  },

  {
    name: 'Justus Liebig',

    description: "I'm washing my hands of it",

    // type code here for "relation_many" field
  },

  {
    name: 'Noam Chomsky',

    description: 'That damn Bill Stull',

    // type code here for "relation_many" field
  },
];

const NotesData = [
  {
    title: 'Contact the tower',

    description: 'That damn Bill Stull',

    // type code here for "relation_one" field
  },

  {
    title: 'That damn Bill Stull',

    description: 'Turd gone wrong',

    // type code here for "relation_one" field
  },

  {
    title: 'That damn diabetes',

    description: 'Contact the tower',

    // type code here for "relation_one" field
  },
];

const JobsData = [
  {
    description: 'So I was walking Oscar',

    type: 'Waranty',

    status: 'Completed',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    category: 'Property Management',
  },

  {
    description: 'That damn diabetes',

    type: 'Service',

    status: 'Invoiced',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    category: 'Commercial',
  },

  {
    description: 'I want my damn cart back',

    type: 'Waranty',

    status: 'Completed',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    category: 'Residential',
  },
];

const TradesData = [
  {
    name: 'Frederick Sanger',
  },

  {
    name: 'Frederick Gowland Hopkins',
  },

  {
    name: 'Charles Sherrington',
  },
];

const TemplatesData = [
  {
    // type code here for "relation_many" field

    material: 'Turd gone wrong',

    materialCost: 11.62,

    Labor: 'That damn Bill Stull',

    laborCost: 21.95,

    markup: 96.91,

    profitMargin: 93.22,

    totalPrice: 85.71,

    description: 'Texas!',

    unitOfMeasurement: 'LF',
  },

  {
    // type code here for "relation_many" field

    material: 'I got that scurvy',

    materialCost: 95.66,

    Labor: 'My boss gonna fire me',

    laborCost: 92.46,

    markup: 87.63,

    profitMargin: 13.96,

    totalPrice: 12.13,

    description: "It's around here somewhere",

    unitOfMeasurement: 'LF',
  },

  {
    // type code here for "relation_many" field

    material: 'Come on now',

    materialCost: 80.35,

    Labor: 'Let me tell ya',

    laborCost: 70.77,

    markup: 22.02,

    profitMargin: 84.43,

    totalPrice: 98.05,

    description: "It's around here somewhere",

    unitOfMeasurement: 'SQ',
  },
];

const EstimatesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'Follow Up',

    validUntil: new Date('2023-12-26'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'Sent',

    validUntil: new Date('2023-11-10'),
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'Sent',

    validUntil: new Date('2024-02-02'),
  },
];

const AppointmentData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    date: new Date('2023-11-13'),

    address: 'Suite 135 3697 Chadwick Unions, Lake Evangeline, AR 50700',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    date: new Date('2023-04-09'),

    address: '370 Douglas Throughway, North Mckenzie, OK 08554-9120',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    date: new Date('2023-10-02'),

    address: '1247 Hilpert Springs, Jerdestad, NJ 71487',
  },
];

const ImagesData = [
  {
    // type code here for "relation_one" field

    url: 'I got that scurvy',
  },

  {
    // type code here for "relation_one" field

    url: 'Texas!',
  },

  {
    // type code here for "relation_one" field

    url: 'Standby',
  },
];

const DocumentsData = [
  {
    // type code here for "relation_one" field

    url: "C'mon Naomi",
  },

  {
    // type code here for "relation_one" field

    url: 'Like a red-headed stepchild',
  },

  {
    // type code here for "relation_one" field

    url: 'Let me tell ya',
  },
];

// Similar logic for "relation_many"

async function associateNoteWithContact() {
  const relatedContact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Note0 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Note0?.setContact) {
    await Note0.setContact(relatedContact0);
  }

  const relatedContact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Note1 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Note1?.setContact) {
    await Note1.setContact(relatedContact1);
  }

  const relatedContact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Note2 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Note2?.setContact) {
    await Note2.setContact(relatedContact2);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateEstimateWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setJob) {
    await Estimate0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setJob) {
    await Estimate1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setJob) {
    await Estimate2.setJob(relatedJob2);
  }
}

async function associateEstimateWithTemplate() {
  const relatedTemplate0 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate0 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estimate0?.setTemplate) {
    await Estimate0.setTemplate(relatedTemplate0);
  }

  const relatedTemplate1 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate1 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estimate1?.setTemplate) {
    await Estimate1.setTemplate(relatedTemplate1);
  }

  const relatedTemplate2 = await Templates.findOne({
    offset: Math.floor(Math.random() * (await Templates.count())),
  });
  const Estimate2 = await Estimates.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estimate2?.setTemplate) {
    await Estimate2.setTemplate(relatedTemplate2);
  }
}

async function associateAppointmentWithContact() {
  const relatedContact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment0 = await Appointment.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setContact) {
    await Appointment0.setContact(relatedContact0);
  }

  const relatedContact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment1 = await Appointment.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setContact) {
    await Appointment1.setContact(relatedContact1);
  }

  const relatedContact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Appointment2 = await Appointment.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setContact) {
    await Appointment2.setContact(relatedContact2);
  }
}

async function associateAppointmentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointment.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setUser) {
    await Appointment0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointment.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setUser) {
    await Appointment1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointment.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setUser) {
    await Appointment2.setUser(relatedUser2);
  }
}

async function associateImageWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setJob) {
    await Image0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setJob) {
    await Image1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setJob) {
    await Image2.setJob(relatedJob2);
  }
}

async function associateDocumentWithJob() {
  const relatedJob0 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setJob) {
    await Document0.setJob(relatedJob0);
  }

  const relatedJob1 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setJob) {
    await Document1.setJob(relatedJob1);
  }

  const relatedJob2 = await Jobs.findOne({
    offset: Math.floor(Math.random() * (await Jobs.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setJob) {
    await Document2.setJob(relatedJob2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Contacts.bulkCreate(ContactsData);

    await Teams.bulkCreate(TeamsData);

    await Notes.bulkCreate(NotesData);

    await Jobs.bulkCreate(JobsData);

    await Trades.bulkCreate(TradesData);

    await Templates.bulkCreate(TemplatesData);

    await Estimates.bulkCreate(EstimatesData);

    await Appointment.bulkCreate(AppointmentData);

    await Images.bulkCreate(ImagesData);

    await Documents.bulkCreate(DocumentsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateNoteWithContact(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateEstimateWithJob(),

      await associateEstimateWithTemplate(),

      await associateAppointmentWithContact(),

      await associateAppointmentWithUser(),

      await associateImageWithJob(),

      await associateDocumentWithJob(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('teams', null, {});

    await queryInterface.bulkDelete('notes', null, {});

    await queryInterface.bulkDelete('jobs', null, {});

    await queryInterface.bulkDelete('trades', null, {});

    await queryInterface.bulkDelete('templates', null, {});

    await queryInterface.bulkDelete('estimates', null, {});

    await queryInterface.bulkDelete('appointment', null, {});

    await queryInterface.bulkDelete('images', null, {});

    await queryInterface.bulkDelete('documents', null, {});
  },
};
