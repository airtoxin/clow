import { exec } from 'child_process';

export function pExec(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve({ command, stdout, stderr });
    });
  });
}
