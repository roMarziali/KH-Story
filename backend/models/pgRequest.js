const config = require("config");
const pg = require("pg");


const connect = {
  user: config.get("PGSQL.user"),
  host: config.get("PGSQL.host"),
  database: config.get("PGSQL.database"),
  password: process.env.PGSQLpassword,
  port: config.get("PGSQL.port"),
}

module.exports = {
  query: (query, params = []) => {

    const client = new pg.Client(connect);
    client.connect();
    return client.query(query, params)
      .then(res => {
        client.end();
        return res.rows;
      })
      .catch(err => {
        client.end();
        return err;
      });
  },
};
