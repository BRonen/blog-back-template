'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkInsert('Posts', [
      {
        title: 'title teste 1',
        content: 'content content 1 :)',
        UserId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'title teste 2',
        content: 'content content 2 :(',
        UserId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'title teste 3',
        content: 'content content 3 :(',
        UserId: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('Posts', null, {})
  )
}
