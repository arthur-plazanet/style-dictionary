"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitiveColor = isPrimitiveColor;
exports.isSemanticColor = isSemanticColor;
exports.isIntentColor = isIntentColor;
exports.isPoolColor = isPoolColor;
exports.isColorToken = isColorToken;
exports.filterThemeTokens = filterThemeTokens;
function isPrimitiveColor(token) {
    var _a, _b, _c;
    if ((_a = token.attributes) === null || _a === void 0 ? void 0 : _a.tokenTier)
        return ((_b = token.attributes) === null || _b === void 0 ? void 0 : _b.tokenTier) === 'primitive' && ((_c = token.attributes) === null || _c === void 0 ? void 0 : _c.category) === 'color';
}
function isSemanticColor(token) {
    var _a, _b, _c;
    return (((_a = token.attributes) === null || _a === void 0 ? void 0 : _a.tokenTier) === 'semantic' &&
        ((_b = token.attributes) === null || _b === void 0 ? void 0 : _b.category) === 'color' &&
        ((_c = token.attributes) === null || _c === void 0 ? void 0 : _c.theme) === 'tanzlate');
}
function isIntentColor(token) {
    var _a, _b;
    return ((_a = token.attributes) === null || _a === void 0 ? void 0 : _a.tokenTier) === 'intent' && ((_b = token.attributes) === null || _b === void 0 ? void 0 : _b.category) === 'color';
}
function isPoolColor(token) {
    var _a, _b;
    return ((_a = token.attributes) === null || _a === void 0 ? void 0 : _a.tokenTier) === 'color-pool' && ((_b = token.attributes) === null || _b === void 0 ? void 0 : _b.category) === 'color-pool';
}
function isColorToken(token) {
    return isPoolColor(token) || isSemanticColor(token) || isIntentColor(token);
}
function filterThemeTokens(token) {
    return isPrimitiveColor(token);
}
