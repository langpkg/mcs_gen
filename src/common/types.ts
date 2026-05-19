// src/common/types.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export type ProjectType = 'pkg' | 'cli';

    export interface ProjectMeta {
        name            : string;
        version         : string;
        description     : string;
        license         : string;
        author          : {
            name        : string;
            email       : string;
            github      : string;
        };
        org             : string; // GitHub org or username
        repoName        : string; // GitHub repo name
    }

    export interface FormatResult {
        formatted       : string;
        count           : number;
        errors?         : FormatError[];
    }

    export interface FormatError {
        message         : string;
        line?           : number;
        column?         : number;
        [key: string]   : unknown;
    }

    export type IssueSeverity = 'error' | 'warning';

    export type FormatFix =
    | { type: 'reformat';           content: string                  }
    | { type: 'replace_line';       line: number; content: string    }
    | { type: 'insert_after_line';  line: number; content: string    }
    | { type: 'insert_before_line'; line: number; content: string    }
    | { type: 'remove_blank_lines'; line: number; count: number      }
    | { type: 'append_lines';       content: string                  };

    export interface FormatIssue {
        file            : string;
        line            : number;
        code            : string;
        message         : string;
        severity        : IssueSeverity;
        fixable         : boolean;
        fix?            : FormatFix;
    }

    export class PkgError extends Error {
        constructor(
            msg         : string,
            public code : string,
            public ctx? : Record<string, unknown>
        ) {
            super(msg);
            this.name   = 'PkgError';
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝