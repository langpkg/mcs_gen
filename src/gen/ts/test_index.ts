// src/gen/ts/test_index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { formatTS }                         from '@langpkg/mcs_fmt';
    import type { ProjectType, ProjectMeta }    from '../../common';

    import      { genFileHeader, genL1 } from './utils';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateTestIndexTs(projectType: ProjectType, meta: ProjectMeta): string {

        const code =
        projectType === 'pkg'
        ? `describe('${meta.name}', () => {\n` +
        "    it('should add two numbers correctly', () => {\n" +
        '        expect(add(1, 1)).toBe(2);\n' +
        '    });\n' +
        '});\n'
        : `describe('CLI', () => {\n` +
        "    it('should run without errors', () => {\n" +
        `        expect(() => run()).not.toThrow();\n` +
        '    });\n' +
        '});\n';

        const content =
        genFileHeader('test/index.test.ts', meta) +
        genL1(
            'PACK',
            "import { describe, it, expect } from 'bun:test';\n" +
            (projectType === 'pkg' ? "import { add } from '../src';\n" : '')
        ) + genL1('TEST', code);

        const result = formatTS(content, 'test/index.test.ts');

        if(result.errors?.length) {
            console.error('Error formatting test/index.test.ts:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate test/index.test.ts due to formatting errors.');
        }

        return result.formatted + '\n';

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
