import dotenv from "dotenv"

import { createApiResponse, ApiResponse } from "./utils"
import { stCodes } from "database-poems"
import mariadb from "mariadb"

dotenv.config();
const pool = mariadb.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "db22.papaki.gr",
  port: 3306,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "",
  connectTimeout: 1000,
  acquireTimeout: 1000,
  dateStrings: true
});

export const getStatistics = () => {
  return new Promise(async (resolve, reject) => {
    let failResponse:ApiResponse;
    let con = await getDBConnection().catch(er => {
      failResponse = createApiResponse(stCodes.fail, er.message, 500);
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
        .catch((er: any) => {
          let response = createApiResponse(stCodes.error, er, 406);
          reject(response);
        });
      let categories = [];

      for (let row of rows) {
        let category:{id?:any,cc?:any,description?:any} = {}
        category.id = row.id;
        category.cc = row.cc;
        category.description = row.description;
        categories.push(category);
      }
      resolve(createApiResponse(stCodes.success, categories));
      con.end();
    } else {
      reject({})//failResponse);
    }
  });
};

const getDBConnection = () => {
  return new Promise((resolve: (con: mariadb.PoolConnection) => void, reject: (err: mariadb.SqlError) => void) => {
    pool.getConnection()
      .then((con) => resolve(con))
      .catch((err) => reject(err));
  });
};

const execQuery = (query: string):Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    const con = await getDBConnection().catch(er => {
      const failResponse = createApiResponse(stCodes.fail, er.message, 500);
      return reject(failResponse);
    });
    if (con) {
      let rows = await con.query(query).catch(er => {
        let response = createApiResponse(stCodes.error, er, 406);
        resolve(response);
      });
      if (rows) {
        const resp = createApiResponse(stCodes.success, rows);
        resolve(resp);
      }
      con.end();
    }
  });
};

export const callQuery = (res: any, query: string) => {
  execQuery(query)
    .then(rows => res.status(rows.code).json(rows))
    .catch(er => {
      let rows:ApiResponse = createApiResponse(stCodes.error, [], 406);
      rows.error = er.data;
      res.status(rows.code).json(rows);
    });
};

