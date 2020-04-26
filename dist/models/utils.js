"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiResponse = function (status, datac, code) {
    if (code === void 0) { code = 200; }
    return { status: status, datac: datac, code: code };
};
//# sourceMappingURL=utils.js.map