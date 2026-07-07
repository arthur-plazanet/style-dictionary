import StyleDictionary from 'style-dictionary'
import {
  tokensDeclarationFormatter,
  tokensObjectFormatter,
  typesDeclarationFormatter,
} from './type-declarations.formatter'

StyleDictionary.registerFormat(typesDeclarationFormatter)
StyleDictionary.registerFormat(tokensDeclarationFormatter)
StyleDictionary.registerFormat(tokensObjectFormatter)

export default {
  ts: {
    // transformGroup: "js",
    transformGroup: 'js',
    buildPath: 'types/',
    files: [
      {
        destination: 'token.types.ts',
        format: 'typescript/types-declaration',
      },

      {
        format: 'typescript/object-declarations',
        destination: 'tokens.tree.ts',
      },
    ],
  },
  // // Tokens declarations
  tokens: {
    transformGroup: 'css',
    buildPath: 'types/',
    files: [
      {
        destination: 'token-css-vars.ts',
        format: 'typescript/tokens-declaration',
      },
    ],
  },
}
