module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Example.associate = function(models) {
    models.Example.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Example;
};
