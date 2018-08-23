module.exports = {
  development: {
    username: "root",
    password: "123456",
    database: "test",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4"
    },
    logging: console.log,
    operatorsAliases: false,
    scanAppHost: "",
    redisConfig: {
      redis_host: "127.0.0.1",
      redis_port: "6379",
      redis_auth: undefined,
      db: 1
    }
  },
  test: {
    username: "root",
    password: "",
    database: "",
    host: "",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4"
    },
    logging: false,
    operatorsAliases: false,
    scanAppHost: "",
    redisConfig: {
      redis_host: "",
      redis_port: "",
      redis_auth: "",
      db: 5
    }
  },
  production: {
    username: "root",
    password: "",
    database: "",
    host: "",
    port: "3306",
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4"
    },
    logging: false,
    operatorsAliases: false,
    scanAppHost: "",
    redisConfig: {
      redis_host: "",
      redis_port: "",
      redis_auth: "",
      db: 4
    }
  }
};

global.env = process.env.NODE_ENV || "development";
