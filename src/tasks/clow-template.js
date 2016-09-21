import BaseTask from './base-task';
import { normalizeSrc } from '../utils';
import clow from '../index';

export default class ClowTemplateTask extends BaseTask {
  constructor(srcDir, destDir) {
    super();

    this.name = 'clow-template';
    this.srcDir = srcDir;
    this.destDir = destDir;
  }

  async run(task) {
    for (const src of task.templates) {
      const srcDir = await normalizeSrc(this.srcDir, src);
      this.log(`Start clow: ${srcDir}`);
      await clow(srcDir, this.destDir);
      this.log(`Finish clow: ${srcDir}`);
    }
  }
}
