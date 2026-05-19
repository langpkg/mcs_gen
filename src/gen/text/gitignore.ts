// src/gen/text/gitignore.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateGitignore(): string {

        return (
            '# Dependencies\n' +
            'node_modules/\n' +
            'package-lock.json\n' +
            'yarn.lock\n' +
            'pnpm-lock.yaml\n' +
            'bun.lockb\n\n' +
            'bun.lock\n\n' +
            '# Build outputs\n' +
            'dist/\n' +
            'build/\n' +
            '*.tsbuildinfo\n\n' +
            '# Environment variables\n' +
            '.env\n' +
            '.env.local\n' +
            '.env.*.local\n\n' +
            '# PKG\n' +
            '.pkg/\n' +
            '# IDE\n' +
            '.vscode/\n' +
            '.idea/\n' +
            '*.swp\n' +
            '*.swo\n\n' +
            '# OS\n' +
            '.DS_Store\n' +
            'Thumbs.db\n\n' +
            '# Test coverage\n' +
            'coverage/\n' +
            '.nyc_output/\n'
        );

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
