const { DataTypes, Model } = require('sequelize')

class Post extends Model {
  static init(sequelize){
      super.init({
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        content: {
          type: DataTypes.STRING
        }
      }, {
        sequelize
      })
      Post.sync({ force: true })
  }
}

module.exports = Post