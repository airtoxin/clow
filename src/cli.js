#!/usr/bin/env node

import 'babel-polyfill';
import fse from 'fs-extra';
import path from 'path';
import meow from 'meow';
import { normalizeSrc } from './utils';
import clow from './index';

// eslint-disable-next-line consistent-return
const handler = (async) () => {
  const cli = meow(`
    Usage:
      $ clow <src> [src...] <dest>

      'src' is (filepath|url) of clow template project.
      url src only support url of compressed file.

      'dest' is filepath of project destination.
  `, {});

  if (cli.input.length < 2) return cli.showHelp();

  const srcs = cli.input.slice(0, -1);
  const [rawDest] = cli.input.slice(-1);
  const destDir = path.resolve(process.cwd(), rawDest);
  fse.ensureDirSync(destDir);

  for (const src of srcs) {
    const srcDir = await normalizeSrc(process.cwd(), src);
    await clow(srcDir, destDir);
  }
};

handler();
