interface LintIssue {
    lintId: string;
    severity: 'error' | 'warning';
    node: string;
    lintMessage: string;
}

interface FileLintResult {
    filePath: string;
    issues: LintIssue[];
    ignored: boolean;
    errorCount: number;
    warningCount: number;
}

interface LinterResult {
    results: FileLintResult[];
    ignoreCount: number;
    errorCount: number;
    warningCount: number;
}

type Severity = 'error' | 'warning' | 'off';

type RuleConfig = Severity | [Severity, ...any[]];

type RuleSet = Record<string, RuleConfig>;

interface NpmPackageJsonLintConfig {
    extends?: string | string[];
    rules?: RuleSet;
    overrides: {
        patterns: string[];
        rules: RuleSet;
    }[];
}

type NpmPackageJsonLintOptions = {
    cwd?: string;
    config?: NpmPackageJsonLintConfig;
    configFile?: string;
    configBaseDirectory?: string;
    quiet?: boolean;
    ignorePath?: string;
    fix?: boolean;
} & (
  {
    packageJsonObject: object,
    packageJsonFilePath?: string;
  } |
  {
    patterns: string[]
  }
);

declare class NpmPackageJsonLint {
    constructor (options: NpmPackageJsonLintOptions);

    lint(): LinterResult;
}

export {
    NpmPackageJsonLint
};

export type {
    FileLintResult,
    LinterResult,
    LintIssue,
    Severity,
    NpmPackageJsonLintConfig
};
