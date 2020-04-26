"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var utils_1 = require("./utils");
var database_poems_1 = require("database-poems");
var mariadb_1 = __importDefault(require("mariadb"));
dotenv_1.default.config();
var pool = mariadb_1.default.createPool({
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
exports.getStatistics = function () {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var failResponse, con, rows, categories, _i, rows_1, row, category;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDBConnection().catch(function (er) {
                        failResponse = utils_1.createApiResponse(database_poems_1.stCodes.fail, er.message, 500);
                        return reject(failResponse);
                    })];
                case 1:
                    con = _a.sent();
                    if (!con) return [3 /*break*/, 3];
                    return [4 /*yield*/, con
                            .query("SELECT \n            count(*) AS cc, description, keimena_cat.id AS id\n        FROM \n            `keimena`, `keimena_cat`  \n        WHERE \n            `category` = `keimena_cat`.`id` \n        GROUP BY \n            category")
                            .catch(function (er) {
                            var response = utils_1.createApiResponse(database_poems_1.stCodes.error, er, 406);
                            reject(response);
                        })];
                case 2:
                    rows = _a.sent();
                    categories = [];
                    for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        row = rows_1[_i];
                        category = {};
                        category.id = row.id;
                        category.cc = row.cc;
                        category.description = row.description;
                        categories.push(category);
                    }
                    resolve(utils_1.createApiResponse(database_poems_1.stCodes.success, categories));
                    con.end();
                    return [3 /*break*/, 4];
                case 3:
                    reject({}); //failResponse);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
var getDBConnection = function () {
    return new Promise(function (resolve, reject) {
        pool.getConnection()
            .then(function (con) { return resolve(con); })
            .catch(function (err) { return reject(err); });
    });
};
var execQuery = function (query) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var con, rows, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDBConnection().catch(function (er) {
                        var failResponse = utils_1.createApiResponse(database_poems_1.stCodes.fail, er.message, 500);
                        return reject(failResponse);
                    })];
                case 1:
                    con = _a.sent();
                    if (!con) return [3 /*break*/, 3];
                    return [4 /*yield*/, con.query(query).catch(function (er) {
                            var response = utils_1.createApiResponse(database_poems_1.stCodes.error, er, 406);
                            resolve(response);
                        })];
                case 2:
                    rows = _a.sent();
                    if (rows) {
                        resp = utils_1.createApiResponse(database_poems_1.stCodes.success, rows);
                        resolve(resp);
                    }
                    con.end();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.callQuery = function (res, query) {
    execQuery(query)
        .then(function (rows) { return res.status(rows.code).json(rows); })
        .catch(function (er) {
        var rows = utils_1.createApiResponse(database_poems_1.stCodes.error, [], 406);
        rows.error = er.data;
        res.status(rows.code).json(rows);
    });
};
//# sourceMappingURL=db.js.map