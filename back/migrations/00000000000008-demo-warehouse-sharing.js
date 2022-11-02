'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'warehouse-sharing',
      [
        // {
        //   warehouseId: 1,
        //   sharedWithUserId: 1,
        //   role: 'owner',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        {
          warehouseId: 1,
          sharedWithUserId: 2,
          role: 'editor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouseId: 1,
          sharedWithUserId: 3,
          role: 'viewer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('warehouse-sharing', null, {});
  },
};
