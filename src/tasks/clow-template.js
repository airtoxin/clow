import path from "path";
import BaseTask from "./base-task";
import { pExec } from "../utils";
import clow from "../index";

// clowing clow-template-babel
// {
//   type: "clow-template",
//   templates: [
//     "@airtoxin/clow-template-babel"
//   ]
// }

export default class ClowTemplateTask extends BaseTask {
  constructor(generatorDir, destDir) {
    super();

    this.name = "clow-template";
    this.generatorDir = generatorDir;
    this.destDir = destDir;
  }

  async run(task) {
    const { stdout: npmRoot } = await pExec("npm root -g");
    const scoped = task.scoped;

    for (const template of task.templates) {
      const templatePath = path.resolve(npmRoot.trim(), template);
      const tasksFilePath = path.resolve(templatePath, "clow");

      const tasks = require(tasksFilePath);

      await clow(tasks, templatePath, this.destDir);
    }
  }
}
