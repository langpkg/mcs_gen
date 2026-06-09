// src/gen/ts/source_index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectType, ProjectMeta }    from '../../common';
    import      { genL1, genFileHeader }        from './utils';
    import      { formatTS }                    from '@langpkg/mcs_fmt';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateSourceIndexTs(projectType: ProjectType, meta: ProjectMeta): string {

        let content =
        genFileHeader('src/index.ts', meta) +
        genL1(
            'PACK',
            projectType === 'cli' ? "import { cli } from '@langpkg/cli';\n" : ''
        );

        if (projectType === 'pkg') {
            const code = 'export const add = (a: number, b: number): number => a + b;\n';

            content += genL1('MAIN', code);
        } else {
            const code =
            'export const run = (): void => {\n' +
            `    console.log('${meta.name} running...');\n` +
            '};\n\n' +
            'run();\n';

            content += genL1('MAIN', code);
        }

        const result = formatTS(content, 'src/index.ts');

        if(result.errors?.length) {
            console.error('Error formatting src/index.ts:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate src/index.ts due to formatting errors.');
        }

        return result.formatted + '\n';

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
