#!/usr/bin/env node

import 'babel-polyfill';
import fse from 'fs-extra';
import path from 'path';
import isUrl from 'is-url';
import minimist from 'minimist';
import { downloadTmp } from './utils';
import clow from './index';

const argv = minimist(process.argv.slice(2));

const [rawSrc, rawDest] = argv._;
const srcDir = path.resolve(process.cwd(), rawSrc);
const destDir = path.resolve(process.cwd(), rawDest);
fse.ensureDirSync(destDir);

const main = isUrl(rawSrc) ?
  downloadTmp(rawSrc).then(dirpath => clow(dirpath, destDir)) :
  clow(srcDir, destDir);

// eslint-disable-next-line no-console
main.catch(e => console.error(e));
