const { sequelize } = require('../../src/models')

module.exports = async () => {
  return await Promise.all(
    Object.keys(sequelize.models).map(async (key) => {
      return await sequelize.models[key].destroy({ truncate: true, force: true })
    })
  )
}
