'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'cargos',
      [
        {
          name: 'Yoda',
          quantity: 30,
          imageUrl: 'https://igromaster.by/upload/iblock/70e/qfd81fkf0eor67gu6w0h9lch8421f4f9.webp?1645188050',
          notes: null,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Model 44',
          quantity: 0,
          imageUrl: 'https://s4-listing.ozstatic.by/400400/617/124/101/101124617_0.jpg',
          notes: null,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Witcher',
          quantity: 1,
          imageUrl: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1512817122/100025682414b0.jpg',
          notes: null,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Model 28',
          quantity: 26,
          imageUrl: 'https://xlm.ru/storage/uploads/images/2021/03/09/ycviUFzOgKV2JkHeu82IbAnF59KY7Eb4Ombj7e0r.jpeg',
          notes: null,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Model 404',
          quantity: 88,
          imageUrl: 'https://cdn1.ozone.ru/s3/multimedia-j/c1000/6126525331.jpg',
          notes: null,
          warehouseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // ----
        {
          name: 'Yoda',
          quantity: 10,
          imageUrl: 'https://igromaster.by/upload/iblock/70e/qfd81fkf0eor67gu6w0h9lch8421f4f9.webp?1645188050',
          notes: null,
          warehouseId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Model 44',
          quantity: 353,
          imageUrl: 'https://s4-listing.ozstatic.by/400400/617/124/101/101124617_0.jpg',
          notes: null,
          warehouseId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Witcher',
          quantity: 0,
          imageUrl: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1512817122/100025682414b0.jpg',
          notes: null,
          warehouseId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Model 28',
          quantity: 3326,
          imageUrl: 'https://xlm.ru/storage/uploads/images/2021/03/09/ycviUFzOgKV2JkHeu82IbAnF59KY7Eb4Ombj7e0r.jpeg',
          notes: null,
          warehouseId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Model 404',
          quantity: 788,
          imageUrl: 'https://cdn1.ozone.ru/s3/multimedia-j/c1000/6126525331.jpg',
          notes: null,
          warehouseId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('cargos', null, {});
  },
};
