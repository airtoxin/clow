import os from 'os';
import path from 'path';
import fse from 'fs-extra';
import download from 'download';

// eslint-disable-next-line import/prefer-default-export
export async function downloadTmp(url) {
  const random = Math.floor(Math.random() * 100000);
  const tmpDirPath = path.resolve(os.tmpdir(), `tmp.${random}`);
  fse.ensureDirSync(tmpDirPath);

  const [{ path: fileDir }] = await download(url, tmpDirPath, { extract: true });
  return path.resolve(tmpDirPath, fileDir);
}
