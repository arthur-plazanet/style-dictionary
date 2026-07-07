#!/usr/bin/env node
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
var commander_1 = require("commander");
var promises_1 = require("node:fs/promises");
var node_os_1 = require("node:os");
var node_path_1 = require("node:path");
var build_style_dictionary_1 = require("../scripts/build-style-dictionary");
commander_1.program
    .name('build-tokens')
    .description('Build and copy tokens to the destination folder.')
    .argument('[dir]', 'target directory', './build/')
    .option('-f, --force', 'overwrite existing files')
    .action(function (dir, options) { return __awaiter(void 0, void 0, void 0, function () {
    var targetDir, tmpDir;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                targetDir = node_path_1.default.resolve(process.cwd(), dir);
                return [4 /*yield*/, promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), 'tokens-'))
                    // 2) build Style Dictionary into temp
                ];
            case 1:
                tmpDir = _b.sent();
                // 2) build Style Dictionary into temp
                return [4 /*yield*/, (0, build_style_dictionary_1.buildStyleDictionary)(tmpDir)
                    // 3) copy result to target
                ];
            case 2:
                // 2) build Style Dictionary into temp
                _b.sent();
                // 3) copy result to target
                return [4 /*yield*/, promises_1.default.mkdir(targetDir, { recursive: true })];
            case 3:
                // 3) copy result to target
                _b.sent();
                return [4 /*yield*/, promises_1.default.cp(tmpDir, targetDir, {
                        recursive: true,
                        force: (_a = options.force) !== null && _a !== void 0 ? _a : true,
                    })
                    // 4) cleanup
                ];
            case 4:
                _b.sent();
                // 4) cleanup
                return [4 /*yield*/, promises_1.default.rm(tmpDir, { recursive: true, force: true })];
            case 5:
                // 4) cleanup
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
commander_1.program.parse();
