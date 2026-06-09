// src/index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectType, ProjectMeta }    from './common';
    import      { generateVscodeSettings }      from './gen/json';
    import      { generateSourceIndexTs }       from './gen/ts';
    import      { generateEslintConfig }        from './gen/ts';
    import      { generateTestIndexTs }         from './gen/ts';
    import      { generatePackageJson }         from './gen/json';
    import      { generateTsupConfig }          from './gen/ts';
    import      { generateGitignore }           from './gen/text';
    import      { generateTsconfig }            from './gen/json';
    import      { generateLicense }             from './gen/text';
    import      { generateReadme }              from './gen/md';
    export *                                    from './gen/ts';
    export *                                    from './gen/md';
    export *                                    from './gen/json';
    export *                                    from './gen/text';
    export *                                    from './common/types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    /**
    * Main entry point for file generation
    * Routes filename to the appropriate generator function
    */
    export function generateFile(
    filename        : string,
    projectType     : ProjectType,
    meta            : ProjectMeta
    ): string {
        switch (filename) {

            // JSON files
            case 'package.json'             : return generatePackageJson(projectType, meta);
            case 'tsconfig.json'            : return generateTsconfig(projectType);
            case '.vscode/settings.json'    : return generateVscodeSettings();

            // Code files
            case 'tsup.config.ts'           : return generateTsupConfig(projectType, meta);
            case 'eslint.config.mjs'        : return generateEslintConfig(projectType, meta);
            case 'src/index.ts'             : return generateSourceIndexTs(projectType, meta);
            case 'test/index.test.ts'       : return generateTestIndexTs(projectType, meta);

            // Markdown files
            case 'README.md'                : return generateReadme(projectType, meta);

            // Text files
            case '.gitignore'               : return generateGitignore();
            case 'LICENSE'                  : return generateLicense(meta);

            // If filename doesn't match any known generator, throw an error
            default: {
                throw new Error(`Unknown file: ${filename}`);
            }

        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝