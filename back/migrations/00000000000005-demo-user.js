'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'sdggfhggfsd@dhg.sa',
          password: '12354324s',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: '4nh342@dhg.sa',
          password: '65jhsdf',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'myuidsf@34.dfs',
          password: 'jhgdfg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'test@q.q',
          password: '1111',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
