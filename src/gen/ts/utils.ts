// src/gen/ts/utils.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectMeta } from '../../common/types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ UTIL ════════════════════════════════════════╗

    /**
    * Generate a file section with decorative headers and footer
    * Used for organizing TypeScript/JavaScript source files
    */
    export function genL1(name: string, content: string, sep = true): string {
        const _sep = sep ? '\n\n\n' : '';

        const l1Open =
        '// ╔════════════════════════════════════════ ' + name + ' ════════════════════════════════════════╗\n\n';

        const l1Close =
        '// ╚══════════════════════════════════════════════════════════════════════════════════════╝\n';

        // content comes in same level, must add extra indentation to fit inside the section (4 spaces)
        content = content
        .split('\n')
        .map((line) => (line === '' ? line : '    ' + line))
        .join('\n');

        return _sep + l1Open + content + '\n' + l1Close;
    }

    /**
    * Generate a file header with author line
    * Used for all source files to maintain consistent header format
    * Note: Shebang for CLI projects is added by tsup via banner configuration
    */
    export function genFileHeader(
    file_path   : string,
    meta        : ProjectMeta
    ): string {
        const authorLine = meta.author.name
        ? `// Made with ❤️ by ${meta.author.name}.`
        : '// Made with ❤️ by Maysara.';

        return `// ${file_path}\n//\n${authorLine}\n`;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
