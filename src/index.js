import util from "util";
import ShellTask from "./tasks/shell";

const shellTask = new ShellTask();

async function clow(tasks) {
  for (const task of tasks) {
    await shellTask.run(task);
    console.log();
  }
}

clow([
  {
    type: "shell",
    runs: [
      "ls",
      "sleep 1"
    ]
  },
  {
    type: "shell",
    runs: [
      "ls",
      "sleep 1"
    ]
  },
  {
    type: "shell",
    runs: [
      "pwd",
      "sleep 1"
    ]
  }
]).then(r => console.log("@r", r)).catch(e => console.log("@e", e));
