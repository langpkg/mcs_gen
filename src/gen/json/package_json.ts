// src/gen/json/package_json.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectType, ProjectMeta }    from '../../common';
    import      { formatJSON }                  from '@langpkg/mcs_fmt';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generatePackageJson(projectType: ProjectType, meta: ProjectMeta): string {
        const repoUrl =
        meta.org && meta.repoName ? `https://github.com/${meta.org}/${meta.repoName}` : '';

        const authorStr = [meta.author.name, meta.author.email ? `<${meta.author.email}>` : '']
        .filter(Boolean)
        .join(' ');

        // Keys ordered to match PACKAGE_JSON_ORDER in jsonFormat.ts so the
        // generator output is identical to what the validator would produce -
        // no false-positive JSON_FORMAT warning on a freshly initialised project.
        // Order: name, version, description, keywords, license, author,
        //        repository, type, [bin (cli only)], main, module, types,
        //        exports, scripts, dependencies, devDependencies, [pkg (cli only)]
        const pkgObj: Record<string, unknown> = {
            name                            : meta.name,
            version                         : meta.version,
            description                     : meta.description,
            keywords                        : [] as string[],
            license                         : meta.license,
            author                          : authorStr || '',
            repository                      : repoUrl ? { type: 'git', url: `git+${repoUrl}.git` } : '',
            type                            : 'module',
            files                           : ['dist'],
            main                            : './dist/index.js',
            module                          : './dist/index.js',
            types                           : './dist/index.d.ts',
            exports                         : {
                '.': {
                    types           : './dist/index.d.ts',
                    import          : './dist/index.js',
                    require         : "./dist/index.cjs"
                },
            },
            scripts                         : {}, // use `pkg` cli instead.
            dependencies                    : {},
            devDependencies                 : {
                // default devDependencies
                '@eslint/js'                : '^9.39.4',
                '@stylistic/eslint-plugin'  : '^5.10.0',
                '@types/bun'                : '^1.3.13',
                '@types/node'               : '^25.7.0',
                'bun-plugin-dts'            : '^0.3.0',
                'bun-types'                 : '^1.3.13',
                'ts-node'                   : '^10.9.2',
                'tsup'                      : '^8.5.1',
                'typescript'                : '^5.9.3',
                'typescript-eslint'         : '^8.59.3',
            },
        };

        // For CLI mode, add bin field (inserted after 'type', before 'scripts')
        if (projectType === 'cli') {
            const binName = meta.name.replace(/^@[^/]+\//, '');
            const ordered: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(pkgObj)) {
                ordered[k] = v;
                if (k === 'type') {
                    ordered['bin'] = { [binName]: './dist/index.js' };
                    // Add pkg field for CLI projects
                    ordered['pkg'] = { type: 'cli', };
                }
            }
            Object.keys(pkgObj).forEach((k) => delete pkgObj[k]);
            Object.assign(pkgObj, ordered);
        } else {
            // For normal (library) projects, add pkg field at the end
            pkgObj['pkg'] = { type: 'lib', };
        }

        const result = formatJSON(JSON.stringify(pkgObj), 'package.json');

        if(result.errors?.length) {
            console.error('Error formatting package.json:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate package.json due to formatting errors.');
        }

        return result.formatted + '\n';
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
