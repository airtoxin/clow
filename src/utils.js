import os from 'os';
import path from 'path';
import fse from 'fs-extra';
import gethub from 'gethub';
import isUrl from 'is-url';
import download from 'download';

export function getTmpDir() {
  const random = Math.floor(Math.random() * 100000);
  const tmpDirPath = path.resolve(os.tmpdir(), `tmp.${random}`);
  fse.ensureDirSync(tmpDirPath);
  return tmpDirPath;
}

export async function tryFetchGithub(src) {
  // src is github:<username>/<respository>:<ref>
  // ref is all tags, branches, commits, ...
  const match = src.match(/github:([\w-]+)\/([\w-]+)(:([\w-]+))?/);
  if (!match) return undefined;
  const [_1, user, repo, _2, ref = 'master'] = match; // eslint-disable-line no-unused-vars

  const tmpDirPath = getTmpDir();
  await gethub(user, repo, ref, tmpDirPath);
  return tmpDirPath;
}

export async function tryFetchUrl(src) {
  if (!isUrl(src)) return undefined;

  const tmpDirPath = getTmpDir();

  const [{ path: fileDir }] = await download(src, tmpDirPath, { extract: true });
  return path.resolve(tmpDirPath, fileDir);
}

export async function normalizeSrc(srcBase, src) {
  const github = await tryFetchGithub(src);
  if (github) return github;

  const url = await tryFetchUrl(src);
  if (url) return url;

  return path.resolve(srcBase, src);
}
