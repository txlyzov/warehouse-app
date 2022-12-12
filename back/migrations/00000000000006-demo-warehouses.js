'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'warehouses',
      [
        {
          name: 'WH_1',
          location: 'Vilnius,Lithuania',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'WH_2',
          location: 'Tbilisi,Georgia',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'WH_3',
          location: 'Kyoto,Japan',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'WH_4',
          location: 'Kair,Egypt',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('warehouses', null, {});
  },
};
