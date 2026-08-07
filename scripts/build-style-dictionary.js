"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStyleDictionary = buildStyleDictionary;
var node_path_1 = require("node:path");
var style_dictionary_1 = require("style-dictionary");
var enums_1 = require("style-dictionary/enums");
var style_dictionary_config_1 = require("../src/style-dictionary.config");
var type_declarations_formatter_js_1 = require("../src/type-declarations/type-declarations.formatter.js");
var generate_typography_tokens_1 = require("./generate-typography-tokens");
function ensureTrailingSlash(p) {
    // Style Dictionary wants POSIX-ish trailing slash, even on Windows it accepts `/`
    return p.endsWith(node_path_1.default.sep) ? p : p + node_path_1.default.sep;
}
function buildStyleDictionary(outDir) {
    return __awaiter(this, void 0, void 0, function () {
        var config, _i, _a, platform, sd;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // 1️⃣ Generate typography tokens FIRST
                    (0, generate_typography_tokens_1.generateTypographyTokens)();
                    config = __assign(__assign({}, style_dictionary_config_1.default), { platforms: Object.fromEntries(Object.entries(style_dictionary_config_1.default.platforms).map(function (_a) {
                            var name = _a[0], platform = _a[1];
                            return [
                                name,
                                __assign({}, platform),
                            ];
                        })) });
                    for (_i = 0, _a = Object.values(config.platforms); _i < _a.length; _i++) {
                        platform = _a[_i];
                        platform.buildPath = ensureTrailingSlash(node_path_1.default.resolve(outDir, (_b = platform.buildPath) !== null && _b !== void 0 ? _b : './build/'));
                    }
                    sd = new style_dictionary_1.default(config, {
                        verbosity: enums_1.logVerbosityLevels.verbose,
                    });
                    // Types formatters
                    style_dictionary_1.default.registerFormat(type_declarations_formatter_js_1.typesDeclarationFormatter);
                    style_dictionary_1.default.registerFormat(type_declarations_formatter_js_1.tokensDeclarationFormatter);
                    return [4 /*yield*/, sd.buildAllPlatforms()];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
