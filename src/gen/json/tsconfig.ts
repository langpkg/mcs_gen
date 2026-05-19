// src/gen/json/tsconfig.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectType } from '../../common';

    import      { formatJSON  } from '@langpkg/mcs_fmt';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateTsconfig(projectType: ProjectType): string {

        const tsConfig = {

            compilerOptions                             : {
                target                                  : 'ES2020',
                module                                  : 'ESNext',
                moduleResolution                        : 'bundler',
                lib                                     : ['DOM', 'ES2020', 'ESNext'],
                types                                   : ['node'],
                declaration                             : projectType === 'pkg',
                outDir                                  : './dist',
                // rootDir                                 : './src',
                strict                                  : true,
                esModuleInterop                         : true,
                skipLibCheck                            : true,
                forceConsistentCasingInFileNames        : true,
                resolveJsonModule                       : true,
                isolatedModules                         : true,
                allowImportingTsExtensions              : true,
                noEmit                                  : true,
                ignoreDeprecations                      : "6.0"
            },

            include                                     : ['src', 'test'],
            exclude                                     : ['node_modules', 'dist']

        };

        const result = formatJSON(JSON.stringify(tsConfig), 'tsconfig.json');

        if(result.errors?.length) {
            console.error('Error formatting tsconfig.json:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate tsconfig.json due to formatting errors.');
        }

        return result.formatted + '\n';

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
