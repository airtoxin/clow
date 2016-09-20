import os from 'os';
import path from 'path';
import fse from 'fs-extra';
import { exec } from 'child_process';
import download from 'download';

export function pExec(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve({ command, stdout, stderr });
    });
  });
}

export async function downloadTmp(url) {
  const random = Math.floor(Math.random() * 100000);
  const tmpDirPath = path.resolve(os.tmpdir(), `tmp.${random}`);
  fse.ensureDirSync(tmpDirPath);

  const [{ path: fileDir }] = await download(url, tmpDirPath, { extract: true });
  return path.resolve(tmpDirPath, fileDir);
}
