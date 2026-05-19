// src/gen/ts/tsup_config.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { formatJSON, formatTS }             from '@langpkg/mcs_fmt';
    import type { ProjectType, ProjectMeta }    from '../../common';

    import      { genL1, genFileHeader } from './utils';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateTsupConfig(projectType: ProjectType, meta: ProjectMeta): string {

        const configObj: Record<string, unknown> = {
            entry       : ['src/index.ts'],
            format      : ['esm', 'cjs'],
            dts         : true,
            minify          : true,
            sourcemap   : false,
            clean       : true,
            splitting   : true,
        };

        // Add banner with shebang for CLI projects
        if (projectType === 'cli') {
            configObj.banner = { js: '#!/usr/bin/env bun' };
        }

        const content =  (
            genFileHeader('tsup.config.ts', meta) +
            genL1(
                'PACK',
                "import { defineConfig } from 'tsup';\n"
            ) +
            genL1(
                'CONST',
                `const rules = ${formatJSON(JSON.stringify(configObj)).formatted}`
            ) +
            genL1(
                'CONF',
                '// eslint-disable-next-line @typescript-eslint/no-explicit-any\n' +
                'export default defineConfig(rules as any);\n'
            )
        );

        const result = formatTS(content, 'tsup.config.ts');

        if(result.errors?.length) {
            console.error('Error formatting tsup.config.ts:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate tsup.config.ts due to formatting errors.');
        }

        return result.formatted + '\n';

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
