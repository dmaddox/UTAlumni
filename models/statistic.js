module.exports = function(sequelize, Sequelize) {
  var statistic = sequelize.define('statistic', {

    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    employedTech: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    employedElse: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    studentNum: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    noJob: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    zeroToThree: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    fourToSeven: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    eightToTwelve: {
      type: Sequelize.INTEGER,
      notEmpty: true
    }
  });
  return statistic;
};
