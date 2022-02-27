import chalk from 'chalk';
import {readdirSync} from 'fs';
import path from 'path';
import {LintFunction} from './types/lint-function';
import {RuleType} from './types/rule-type';

export interface Rule {
  lint: LintFunction;
  ruleType: RuleType;
  minItems?: number;
}

export class Rules {
  rules: Record<string, string>;

  constructor() {
    this.rules = {};
  }

  /**
   * Loads rules
   *
   * @return Set of rules
   */
  load(): Record<string, string> {
    const rulesDirectory = path.join(__dirname, 'rules');

    try {
      readdirSync(rulesDirectory).forEach((filePath) => {
        const beginIndex = 0;
        const endIndex = -3;
        // remove the file extension, e.g. `.js`
        const ruleId = filePath.slice(beginIndex, endIndex);
        const filePathToRuleModule = path.join(rulesDirectory, filePath);

        this.registerRule(ruleId, filePathToRuleModule);
      });

      return this.rules;
    } catch (error) {
      throw new Error(`Error while loading rules from rules directory - ${error.message}`);
    }
  }

  /**
   * Loads a rule module
   *
   * @param ruleId Name of the rule
   * @return Rule module
   */
  get(ruleId: string): Rule {
    const rule = this.rules[ruleId];

    if (typeof rule === 'undefined') {
      const errorMsg = `Rule, ${ruleId}, is invalid. Please ensure it matches a valid option.`;

      throw new Error(chalk.bold.red(errorMsg));
    }

    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const ruleModule = require(this.rules[ruleId]);

    return ruleModule;
  }

  /**
   * Gets entire rule set
   *
   * @returns Rule set
   */
  getRules(): Record<string, string> {
    return this.rules;
  }

  /**
   * Registers a rule in the rules object
   *
   * @param ruleId Name of the rule
   * @param filePathToRuleModule File path to rule
   */
  registerRule(ruleId: string, filePathToRuleModule: string): void {
    this.rules[ruleId] = filePathToRuleModule;
  }
}
