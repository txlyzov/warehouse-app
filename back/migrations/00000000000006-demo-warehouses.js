'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'warehouses',
      [
        {
          name: 'Name123',
          location: 'Lithuania,Vilnius',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'QWERTY industrials',
          location: 'Georgia,Tbilisi',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Japan innovations',
          location: 'Japan,Kyoto',
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cand treasures',
          location: 'Egypt,Kair',
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
