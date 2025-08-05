'use strict';

const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');

module.exports = {
   up: async (queryInterface, Sequelize) => {
      const password1 = await bcrypt.hash('password123', 10);
      const password2 = await bcrypt.hash('password123', 10);
      await queryInterface.bulkInsert('users', [{
            name: 'Admin Satu',
            email: 'admin1@example.com',
            password: password1,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
         },
         {
            name: 'Admin Dua',
            email: 'admin2@example.com',
            password: password2,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
         }
      ]);
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
   }
};