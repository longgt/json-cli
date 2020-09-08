import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs'
import * as chalk from 'chalk'
import {stripBOM, find} from '../util/util'

export default class Beautify extends Command {
  static description = 'Beautify JSON content'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v'}),
  };

  static args = [{name: 'dir'}];

  async run() {
    const {args, flags} = this.parse(Beautify)
    const cwd = args.dir || process.cwd()
    cli.action.start(`Beautify JSON in ${cwd}`)

    try {
      const files = await find(cwd)
      const asyncResults = []
      for (const file of files) {
        asyncResults.push(this.beautify(file))
      }

      const results = await Promise.all(asyncResults)

      for (const result of results) {
        if (result.result) {
          if (flags.verbose) {
            this.log(`Beautified JSON in file ${chalk.green(result.file)}`)
          }
        } else {
          this.warn(`Beautifier failed in file ${chalk.red(result.file)}`)
          this.warn(`Error details: ${chalk.red(result.detail)}`)
        }
      }
    } catch (error) {
      this.error(error, {exit: -1})
    }

    cli.action.stop()
  }

  beautify(file: string) {
    return new Promise<{result?: boolean; detail?: any; file?: string}>(resolve => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          resolve({result: false, detail: err, file})
        } else {
          data = stripBOM(data)
          try {
            const json = JSON.parse(data)
            const beautifiedJson = JSON.stringify(json, null, 2)
            fs.writeFile(file, beautifiedJson, 'utf8', err => {
              if (err) {
                resolve({result: false, detail: err, file})
              } else {
                resolve({result: true, file})
              }
            })
          } catch (error) {
            resolve({result: false, detail: error, file})
          }
        }
      })
    })
  }
}
