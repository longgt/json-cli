import * as glob from 'glob'

export type FindOptions = {
  includeSubDirs?: boolean;
}

export function find(cwd: string, options: FindOptions = { includeSubDirs : false }): Promise<string[]> {
  const globPattern = options.includeSubDirs ? '**/*.json' : '*.json';
  return new Promise((resolve, reject) => {
    glob(globPattern, {cwd, absolute: true, nodir: true, ignore: '**/{node_modules,www,target,build,dist}/**'}, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

export function stripBOM(value: string): string {
  // Strip BOM
  return value.charAt(0) === '\uFEFF' ? value.slice(1) : value
}
