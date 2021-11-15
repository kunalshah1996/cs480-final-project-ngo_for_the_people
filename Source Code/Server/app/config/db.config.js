module.exports = {
    HOST: "localhost",
    USER: "ngo_for_the_people",
    PASSWORD: "ask",
    DB: "ngo_for_the_people",
    dialect: "mysql",
    multipleStatements: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };