// src/gen/text/npmignore.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateNpmignore(): string {

        return (
            '# Source and test files\n' +
            'src/\n' +
            'test/\n' +
            '*.test.ts\n' +
            '*.tsbuildinfo\n\n' +
            '# Build and package artifacts\n' +
            '.pkg/\n' +
            'assets/\n\n' +
            '# Configuration files\n' +
            'tsconfig.json\n' +
            'eslint.config.mjs\n' +
            'tsup.config.ts\n' +
            'vitest.config.ts\n' +
            'jest.config.js\n\n' +
            '# Documentation (keep README only)\n' +
            'docs/\n' +
            'CHANGELOG.md\n' +
            'CONTRIBUTING.md\n\n' +
            '# Development files\n' +
            '.vscode/\n' +
            '.idea/\n' +
            '.env\n' +
            '.env.local\n' +
            '.DS_Store\n' +
            'Thumbs.db\n\n' +
            '# Git and version control\n' +
            '.git/\n' +
            '.gitignore\n' +
            '.gitattributes\n\n' +
            '# Package manager lock files\n' +
            'package-lock.json\n' +
            'yarn.lock\n' +
            'pnpm-lock.yaml\n' +
            'bun.lockb\n\n' +
            '# IDE and editor files\n' +
            '*.swp\n' +
            '*.swo\n' +
            '*~\n'
        );

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
