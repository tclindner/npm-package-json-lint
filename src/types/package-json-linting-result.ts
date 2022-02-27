import {LintIssue} from '../lint-issue';

export interface PackageJsonFileLintingResult {
  /**
   * File path to the package.json file
   */
  filePath: string;
  /**
   * A list of issues.
   */
  issues: LintIssue[];
  /**
   * A flag indicating that the file was skipped.
   */
  ignored: boolean;
  /**
   * Number of errors.
   */
  errorCount: number;
  /**
   * Number of warnings.
   */
  warningCount: number;
}
