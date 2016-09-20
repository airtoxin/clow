#!/usr/bin/env node

import fse from 'fs-extra';
import path from 'path';
import isUrl from 'is-url';
import meow from "meow";
import { downloadTmp } from './utils';
import clow from './index';

async function handler() {
  const cli = meow(`
    Usage:
      $ clow <src> [src...] <dest>

      'src' is (filepath|url) of clow template project.
      url src only support url of compressed file.

      'dest' is filepath of project destination.
  `, {});

  if (cli.input.length < 2) return cli.showHelp();

  const rawSrcs = cli.input.slice(0, -1);
  const [rawDest] = cli.input.slice(-1);
  const srcDirs = rawSrcs.map(rawSrc => path.resolve(process.cwd(), rawSrc));
  const destDir = path.resolve(process.cwd(), rawDest);
  fse.ensureDirSync(destDir);

  for (const rawSrc of rawSrcs) {
    if (isUrl(rawSrc)) {
      await downloadTmp(rawSrc).then(dirpath => clow(dirpath, destDir));
    } else {
      const srcDir = path.resolve(process.cwd(), rawSrc);
      await clow(srcDir, destDir);
    }
  }
}

handler();
