import * as glob from 'glob'
export function find(cwd: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob('**/*.json', {cwd, absolute: true, nodir: true, ignore: '**/{node_modules,www,target,build,dist}/**'}, (err, files) => {
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
