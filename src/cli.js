#!/usr/bin/env node

import fs from "fs";
import path from "path";
import minimist from "minimist";
import clow from "./index";

const argv = minimist(process.argv.slice(2));

const filepath = path.resolve(process.cwd(), argv._[0]);

const tasks = JSON.parse(fs.readFileSync(filepath, "utf8"));
clow(tasks).catch(e => console.error(e));
