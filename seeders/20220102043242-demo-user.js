'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkInsert('Users', [
      {
        name: 'Person One',
        email: 'person1@gmail.com',
        password: 'one123',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Person Two',
        email: 'person2@yahoo.com',
        password: 'two123',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Person Three',
        email: 'person3@hotmail.com',
        password: 'three123',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('Users', null, {})
  )
}
