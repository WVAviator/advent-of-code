import fs from 'fs';
import path from 'path';

const PUZZLE_INPUT = './puzzle-input.txt';

const getFileTreeRoot = () => {
  const treeData = fs.readFileSync(path.join(__dirname, PUZZLE_INPUT), {
    encoding: 'utf-8',
  });

  const stdout = treeData.split('\r\n');
  const fileTreeRoot = buildFileTree(stdout);

  return fileTreeRoot;
};

class File {
  constructor(public name: string, public size: number) {}
}

class Directory {
  public subdirectories: Record<string, Directory> = {};
  public files: File[] = [];

  constructor(public name: string, public parentDirectory: Directory | null) {}

  public addDirectory(dir: Directory) {
    this.subdirectories[dir.name] = dir;
  }

  public addFile(file: File) {
    this.files.push(file);
  }

  public cd(directory: string): Directory | null {
    if (directory === '..') {
      return this.parentDirectory;
    }
    return this.subdirectories[directory];
  }

  toString() {
    return `${this.name}: subdirectories: ${Object.keys(
      this.subdirectories
    )} files: ${this.files.map((file) => `${file.name}[${file.size}]`)}`;
  }
}

const buildFileTree = (stdout: string[]): Directory => {
  const rootDir = new Directory('/', null);

  let currentLine = 1;
  let currentDirectory = rootDir;

  while (currentLine < stdout.length) {
    if (stdout[currentLine].startsWith('$ ls')) {
      currentLine++;
      while (
        currentLine < stdout.length &&
        !stdout[currentLine].startsWith('$')
      ) {
        const line = stdout[currentLine];
        if (line.startsWith('dir')) {
          currentDirectory.addDirectory(
            new Directory(line.split(' ')[1], currentDirectory)
          );
        } else {
          currentDirectory.addFile(
            new File(line.split(' ')[1], Number(line.split(' ')[0]))
          );
        }
        currentLine++;
      }
    } else if (stdout[currentLine].startsWith('$ cd')) {
      if (stdout[currentLine].split(' ')[2] == '/') {
        currentDirectory = rootDir;
      } else {
        currentDirectory =
          currentDirectory.cd(stdout[currentLine].split(' ')[2]) || rootDir;
      }
      currentLine++;
    }
  }

  return rootDir;
};

const getDirectorySize = (
  dir: Directory,
  nestedDirectoryCallback = (size: number, name: string) => {}
) => {
  const getSum = (dir: Directory) => {
    let sum = 0;
    for (let subdir of Object.values(dir.subdirectories)) {
      sum += getSum(subdir);
    }
    for (let file of dir.files) {
      sum += file.size;
    }
    nestedDirectoryCallback(sum, dir.name);
    return sum;
  };

  return getSum(dir);
};

export const getSmallDirectorySizes = () => {
  const rootDir = getFileTreeRoot();

  let sum = 0;

  getDirectorySize(rootDir, (size) => {
    if (size <= 100000) {
      sum += size;
    }
  });

  return sum;
};

export const freeUpSpace = () => {
  const MAX_MEMORY = 70000000;
  const UPDATE_MEMORY = 30000000;

  const rootDir = getFileTreeRoot();

  const rootSize = getDirectorySize(rootDir);
  const unusedSpace = MAX_MEMORY - rootSize;
  const deletionRequirement = UPDATE_MEMORY - unusedSpace;

  let minRequiredDirectory = rootSize;
  getDirectorySize(rootDir, (size) => {
    if (size >= deletionRequirement) {
      minRequiredDirectory = Math.min(minRequiredDirectory, size);
    }
  });

  return minRequiredDirectory;
};
