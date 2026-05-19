// src/gen/ts/eslint_config.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { formatTS, formatJSON }             from '@langpkg/mcs_fmt';
    import type { ProjectType, ProjectMeta }    from '../../common';

    import      { genL1, genFileHeader } from './utils';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateEslintConfig(projectType: ProjectType, meta: ProjectMeta): string {

        const rulesJSON = {
            curly                                       : 'off',
            '@stylistic/semi'                           : ['warn', 'always'],
            '@typescript-eslint/no-empty-function'      : 'off',
            '@typescript-eslint/naming-convention'      : [
                'warn',
                // Variables and parameters: snake_case
                {
                    selector                            : 'variable',
                    format                              : ['snake_case', 'camelCase'],
                    filter                              : {
                        match                           : false,
                        regex                           : '^_',
                    },
                },
                // Functions and methods: camelCase
                {
                    selector                            : 'function',
                    format                              : ['camelCase'],
                },
                {
                    selector                            : 'method',
                    format                              : ['camelCase'],
                },
                // Classes and types: PascalCase
                {
                    selector                            : 'typeLike',
                    format                              : ['PascalCase'],
                },
                // Imports: camelCase and PascalCase
                {
                    selector                            : 'import',
                    format                              : ['camelCase', 'PascalCase'],
                },
                // Constants: UPPER_CASE
                {
                    selector                            : 'variable',
                    modifiers                           : ['const'],
                    format                              : ['UPPER_CASE', 'snake_case', 'camelCase'],
                    filter                              : {
                        match                           : false,
                        regex                           : '^_',
                    },
                },
                // Enum members: PascalCase
                {
                    selector                            : 'enumMember',
                    format                              : ['PascalCase'],
                },
            ],

            '@typescript-eslint/no-unused-vars'         : ['error', { argsIgnorePattern: '^_' }],
        };

        const content =  (
            genFileHeader('eslint.config.ts', meta) +
            genL1(
                'PACK',
                "import { defineConfig } from 'eslint/config';\n" +
                "import js from '@eslint/js';\n" +
                "import tseslint from 'typescript-eslint';\n" +
                "import stylistic from '@stylistic/eslint-plugin';\n"
            ) +
            genL1(
                'CONST',
                `const rules = ${formatJSON(JSON.stringify(rulesJSON)).formatted}`
            ) +
            genL1(
                'CONF',
                'export default defineConfig(\n' +
                '\n' +
                '    js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic,\n' +
                '\n' +
                '    {\n' +
                `        ignores     : ['**/.vscode-test', '**/out', 'dist/', 'node_modules/', '.git/'],\n` +
                "        plugins     : { '@stylistic': stylistic },\n" +
                '        rules       : rules\n' +
                '    }\n' +
                ');\n'
            )
        );

        const result = formatTS(content, 'eslint.config.ts');

        if(result.errors?.length) {
            console.error('Error formatting eslint.config.ts:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate eslint.config.ts due to formatting errors.');
        }

        return result.formatted + '\n';

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
