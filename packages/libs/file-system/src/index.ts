import fs from "fs";
import { glob } from "glob";

export function rename(oldPath: string, newPath: string) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming ${oldPath} to ${newPath}:`, err.message);
    } else {
      console.log(`Renamed ${oldPath} to ${newPath}`);
    }
  });
}

export function makeDir(name: string, options: { recursive?: boolean } = { recursive: true }) {
  const recursive = options.recursive;
  try {
    fs.mkdirSync(name, { recursive });
    console.log(`Directory ${name} created successfully`);
  } catch (err) {
    if (err instanceof Error) console.error(`Error creating directory ${name}:`, err.message);
  }
}

export function makeFile(name: string, options: { content: string } = { content: "" }) {
  const content = options.content;
  fs.writeFileSync(name, content);
}

export function fileExist(path: string) {
  if (!fs.existsSync(path)) {
    console.log(`The item (${path}) does not exist.`);
    return false;
  }

  if (!fs.lstatSync(path).isFile()) {
    console.log(`The item (${path}) is not file.`);
    return false;
  }

  return true;
}

export function dirExist(path: string) {
  if (!fs.existsSync(path)) {
    console.log(`The item (${path}) does not exist.`);
    return false;
  }

  if (!fs.lstatSync(path).isDirectory()) {
    console.log(`The item (${path}) is not directory.`);
    return false;
  }

  console.log(`The item (${path}) is directory and exists.`);

  return true;
}

export function symbolicLinkExist(path: string) {
  if (!fs.existsSync(path)) {
    console.log(`The item (${path}) does not exist.`);
    return false;
  }

  if (!fs.lstatSync(path).isSymbolicLink()) {
    console.log(`The item (${path}) is not symbolic link.`);
    return false;
  }

  return true;
}

export function makeFileIfNotExist(path: string, options: { content: string } = { content: "" }) {
  if (fileExist(path)) return;
  makeFile(path, options);
}

export function makeDirIfNotExist(path: string, options: { recursive?: boolean } = { recursive: true }) {
  if (dirExist(path)) return;
  console.log(`Creating directory ${path}...`);
  makeDir(path, options);
}

export function cpDir(from: string, to: string, options: { recursive?: boolean } = { recursive: true }) {
  fs.cpSync(from, to, options);
}

export function cpDirIfNotExist(from: string, to: string, options: { recursive?: boolean } = { recursive: true }) {
  if (!dirExist(from)) return;
  fs.cpSync(from, to, options);
}

export function cpFile(from: string, to: string) {
  fs.copyFileSync(from, to);
}

export function cpFileIfNotExist(from: string, to: string) {
  if (!fileExist(from)) {
    console.log(`The source file (${from}) does not exist.`);
    return;
  }
  if (fileExist(to)) {
    console.log(`The target file (${to}) already exists.`);
    return;
  }
  cpFile(from, to);
}

export function removeDirIfExist(path: string) {
  if (!dirExist(path)) return;
  fs.rmSync(path, { recursive: true });
}

export function removeFileIfExist(path: string) {
  if (!fileExist(path)) return;
  fs.rmSync(path);
}

export function symlinkDirIfNotExist(target: string, path: string) {
  if (!dirExist(target)) return;
  if (symbolicLinkExist(path)) return;
  fs.symlinkSync(target, path, "dir");
}

export function symlinkFileIfNotExist(target: string, path: string) {
  if (!fileExist(target)) return;
  if (symbolicLinkExist(path)) return;
  fs.symlinkSync(target, path, "file");
}

export function searchAll(targetDir: string, entries: string[]) {
  const foundDirs: string[] = [];
  const foundFiles: string[] = [];

  function makeGlobPattern(targetDir: string, entry: string) {
    const pattern = `${targetDir}/**/*/${entry}`;
    return pattern;
  }

  entries.forEach((entry) => {
    const pattern = makeGlobPattern(targetDir, entry);
    const foundItems = glob.sync(pattern);
    foundItems.forEach((itemPath) => {
      const isDir = fs.statSync(itemPath).isDirectory();
      if (isDir) {
        foundDirs.push(itemPath);
      }

      if (!isDir) {
        foundFiles.push(itemPath);
      }
    });
  });

  return { foundDirs, foundFiles } as const;
}
