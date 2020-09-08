import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs'
import * as chalk from 'chalk'
import {stripBOM, find} from '../util/util'

export default class Validate extends Command {
  static description = 'Validate JSON content';

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v'}),
  };

  static args = [{name: 'dir'}];

  async run() {
    const {args, flags} = this.parse(Validate)
    const cwd = args.dir || process.cwd()
    cli.action.start(`Validate JSON in ${cwd}`)

    try {
      const files = await find(cwd)
      const asyncResults = []
      for (const file of files) {
        asyncResults.push(this.validate(file))
      }

      const results = await Promise.all(asyncResults)

      for (const result of results) {
        if (result.result) {
          if (flags.verbose) {
            this.log(`JSON is valid in file ${chalk.green(result.file)}`)
          }
        } else {
          this.warn(`JSON is invalid in file ${chalk.red(result.file)}`)
          this.warn(`Error details: ${chalk.red(result.detail)}`)
        }
      }
    } catch (error) {
      this.error(error, {exit: -1})
    }

    cli.action.stop()
  }

  validate(file: string) {
    return new Promise<{result?: boolean; detail?: any; file?: string}>(resolve => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          resolve({result: false, detail: err, file})
        } else {
          data = stripBOM(data)
          try {
            JSON.parse(data)
            resolve({result: true, file})
          } catch (error) {
            resolve({result: false, detail: error, file})
          }
        }
      })
    })
  }
}
