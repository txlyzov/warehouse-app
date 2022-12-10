'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'q@q.q',
          password: 'q',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'account1@example.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'account2@example.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'account3@example.com',
          password: 'password',
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
