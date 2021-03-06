import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import glob from 'glob';
import is from 'is';
import chalk from 'chalk';
import inquirer from 'inquirer';
import hogan from 'hogan.js';
import isTextFile from 'istextfile';
import BaseTask from './base-task';

export default class TemplateTask extends BaseTask {
  constructor(srcDir, destDir) {
    super();

    this.name = 'template';
    this.srcDir = srcDir;
    this.destDir = destDir;
  }

  async complimentTemplateArgs(rawArgs) {
    const complimented = {};
    for (const [key, value] of Object.entries(rawArgs)) {
      if (is.null(value)) {
        this.log(chalk.bold(`Input value of {{${key}}}.`));
        const { input } = await inquirer.prompt([{
          type: 'input',
          name: 'input',
          message: '->',
        }]);

        complimented[key] = input;
      } else {
        complimented[key] = value;
      }
    }
    return complimented;
  }

  async run(task) {
    const args = await this.complimentTemplateArgs(task.args);
    const srcDir = path.resolve(this.srcDir, task.src.cwd);
    const destDir = path.resolve(this.destDir, task.dest);
    const filenames = glob.sync(task.src.pattern, { cwd: srcDir, dot: true });
    const hoganOptions = { delimiters: task.delimiters };

    for (const filename of filenames) {
      const compiledFilename = hogan.compile(filename, hoganOptions).render(args);
      const srcFile = path.resolve(srcDir, filename);
      const destFile = path.resolve(destDir, compiledFilename);

      const stat = fs.statSync(srcFile);

      if (stat.isDirectory()) {
        fse.ensureDirSync(destFile);
        this.log(`directory: ${srcFile} -> ${destFile}`);
      } else if (stat.isFile() && isTextFile(srcFile)) {
        const template = hogan.compile(fs.readFileSync(srcFile, 'utf8'), hoganOptions);
        fse.outputFileSync(destFile, template.render(args));
        this.log(`source file: ${srcFile} -> ${destFile}`);
      } else if (stat.isFile()) {
        // TODO
        await TemplateTask.copy(srcFile, destFile);
        this.log(`non-text file: ${srcFile} -> ${destFile}`);
      }
    }
  }

  static copy(src, dest) {
    return new Promise((resolve, reject) => {
      fse.copy(src, dest, (error) => {
        if (error) return reject(error);
        return resolve();
      });
    });
  }
}
