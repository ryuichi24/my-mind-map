#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { program } from "commander";

program
  .argument("<tsconfigPath>", "path to the target tsconfig file")
  .description("")
  .option("-t, --type <type>", "Module system type", "esm")
  .action((tsconfigPath, options) => {
    if (!fs.existsSync(tsconfigPath)) {
      process.exit(1);
    }
    const cmd = `tsc -p ${tsconfigPath}`;
    execSync(cmd, { stdio: "inherit" });
    // read tsconfig
    const tsconfigContent = fs.readFileSync(tsconfigPath, { encoding: "utf8" });
    const parsed = JSON.parse(tsconfigContent);
    const outDir = parsed.compilerOptions.outDir;
    const packageJsonPath = path.join(outDir, "package.json");
    const isEsm = options.type === "esm";
    const content = JSON.stringify({
      type: isEsm ? "module" : "commonjs",
    });
    makeItem(packageJsonPath, { content });
  });

function makeItem(name: string, options: Record<string, string>) {
  if (options.type === "dir") {
    fs.mkdir(name, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory ${name}:`, err.message);
      } else {
        console.log(`Directory ${name} created successfully`);
      }
    });
  } else {
    const content = options.content || "";
    fs.writeFile(name, content, (err) => {
      if (err) {
        console.error(`Error creating file ${name}:`, err.message);
      } else {
        console.log(`File ${name} created successfully`);
      }
    });
  }
}

program.parse(process.argv);
