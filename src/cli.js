#!/usr/bin/env node

import fse from 'fs-extra';
import path from 'path';
import minimist from 'minimist';
import clow from './index';

const argv = minimist(process.argv.slice(2));

const generatorDir = path.resolve(process.cwd(), argv._[0]);
const destDir = path.resolve(process.cwd(), argv._[1]);

fse.ensureDirSync(destDir);

// eslint-disable-next-line no-console
clow(generatorDir, destDir).catch(e => console.error(e));
