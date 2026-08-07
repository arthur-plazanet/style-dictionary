import type { Format } from 'style-dictionary/types'

/**
 * Generates a TypeScript interface declaration for all design tokens.
 *
 * Will return:
 * export interface YThemeToken {
 *   tokenName1: string;
 *   tokenName2: string;
 *   ...
 * }
 *
 * where tokenName is the name of the token e.g. 'color-primary-100'
 */
export const tokensDeclarationFormatter: Format = {
  name: 'typescript/tokens-declaration',
  format: function ({ dictionary }) {
    const myMap = dictionary.tokenMap
    let types = ''
    for (const value of myMap.values()) {
      const name = value.name
      types += `  '${name}': string;\n`
    }

    return `export interface YThemeToken {\n${types}\n}\n`
  },
}

/**
 * @type {{ name: string; format: ({ dictionary }: FormatFnArguments) => string; }}
 *
 * Will return:
 * export interface DesignTokens {
 *   border: {
 *     width: {
 *       base: string;
 *       scale: string;
 *     };
 *   };
 *   ...
 * }
 */
export const typesDeclarationFormatter: Format = {
  name: 'typescript/types-declaration',
  format: function ({ dictionary }) {
    const interfaceBody = generateNestedInterface(dictionary.tokens, 1)
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

export interface DesignTokens {
${interfaceBody}}
`
  },
}

/**
 * Generates a TypeScript object declaration for all design tokens with their values.
 *
 * Will return:
 * export const tokens = {
 *   border: {
 *     width: {
 *       base: '1px',
 *       scale: '2px',
 *     },
 *   },
 *   ...
 * } as const;
 */
export const tokensObjectFormatter: Format = {
  name: 'typescript/object-declarations',
  format: function ({ dictionary }) {
    const nestedObject = generateNestedObject(dictionary.tokens)
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

export const tokens = ${JSON.stringify(nestedObject, null, 2)} as const;
`
  },
}

/**
 * Check if an object is a leaf token (has $value or value property)
 */
function isToken(obj: Record<string, unknown>): boolean {
  return obj && typeof obj === 'object' && ('$value' in obj || 'value' in obj)
}

/**
 * Escape property name if it contains special characters
 */
function formatKey(key: string): string {
  // If key starts with a number or contains special chars, quote it
  if (/^[0-9]/.test(key) || /[^a-zA-Z0-9_$]/.test(key)) {
    return `'${key}'`
  }
  return key
}

/**
 * Recursively generate nested interface from token tree
 */
function generateNestedInterface(obj: Record<string, unknown>, depth = 0): string {
  const indent = '  '.repeat(depth)
  let result = ''

  for (const key of Object.keys(obj)) {
    const value = obj[key]

    if (isToken(value as Record<string, unknown>)) {
      // Leaf token - output as string type
      result += `${indent}${formatKey(key)}: string;\n`
    } else if (typeof value === 'object' && value !== null) {
      // Nested object - recurse
      const nested = generateNestedInterface(value as Record<string, unknown>, depth + 1)
      if (nested.trim()) {
        result += `${indent}${formatKey(key)}: {\n${nested}${indent}};\n`
      }
    }
  }

  return result
}

/**
 * Recursively generate nested object from token tree
 */
function generateNestedObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const key of Object.keys(obj)) {
    const value = obj[key]

    if (isToken(value as Record<string, unknown>)) {
      // Leaf token - output value
      result[key] =
        (value as Record<string, unknown>).$value || (value as Record<string, unknown>).value
    } else if (typeof value === 'object' && value !== null) {
      // Nested object - recurse
      const nested = generateNestedObject(value as Record<string, unknown>)
      if (Object.keys(nested).length > 0) {
        result[key] = nested
      }
    }
  }

  return result
}
