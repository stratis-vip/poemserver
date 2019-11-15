require("dotenv").config();
const { apiResponse } = require("./utils");
const { stCodes } = require("database-poems");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "db22.papaki.gr",
  port: 3306,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "",
  connectTimeout: 1000,
  acquireTimeout: 1000,
  insecureAuth: true,
  dateStrings: true
});

const getStatistics = () => {
  return new Promise(async (resolve, reject) => {
    // let con = await pool.getConnection()
    // .catch(er => {
    //   let response = apiResponse(this.stCodes.fail, er, 503);
    //   resolve(response);
    // });
    let failResponse;
    let con = await getDBConnection().catch(er => {
      failResponse = apiResponse(stCodes.fail, er.message, 500);
      return reject(failResponse);
    });
    if (con) {
      let rows = await con
        .query(
          `SELECT 
            count(*) AS cc, description, keimena_cat.id AS id
        FROM 
            \`keimena\`, \`keimena_cat\`  
        WHERE 
            \`category\` = \`keimena_cat\`.\`id\` 
        GROUP BY 
            category`
        )
        .catch(er => {
          let response = apiResponse(stCodes.error, er, 406);
          reject(response);
        });
      let categories = [];

      for (let row of rows) {
        let category = {};
        category.id = row.id;
        category.cc = row.cc;
        category.description = row.description;
        categories.push(category);
      }
      resolve(apiResponse(stCodes.success, categories));
      con.end();
    } else {
      reject(failResponse);
    }
  });
};

const getDBConnection = () => {
  return new Promise((resolve, reject) => {
    let con = pool
      .getConnection()
      .then(con => resolve(con))
      .catch(er => reject(er));
  });
};

const execQuery = query => {
  return new Promise(async (resolve, reject) => {
    let con = await getDBConnection().catch(er => {
      failResponse = apiResponse(stCodes.fail, er.message, 500);
      return reject(failResponse);
    });
    if (con) {
      let rows = await con.query(query).catch(er => {
        let response = apiResponse(stCodes.error, er, 406);
        resolve(response);
      });
      if (rows) {
        const resp = apiResponse(stCodes.success, rows);
        resolve(resp);
      }
      con.end();
    }
  });
};

const callQuery = (res, query) => {
  execQuery(query)
    .then(rows => res.status(rows.code).json(rows))
    .catch(er => {
      let rows = apiResponse(stCodes.error, [], 406);
      rows.error = er.data;
      res.status(rows.code).json(rows);
    });
};

module.exports = {
  apiResponse,
  callQuery,
  execQuery,
  getStatistics
};
