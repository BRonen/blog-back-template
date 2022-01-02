'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkInsert('Users', [
      {
        name: 'Person One',
        email: 'person1@gmail.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Person Two',
        email: 'person2@yahoo.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Person Three',
        email: 'person3@hotmail.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('Users', null, {})
  )
}
