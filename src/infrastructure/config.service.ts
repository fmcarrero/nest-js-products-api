import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // stock the file
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  // get specific key in .env file
  get(key: string): string {
    return this.envConfig[key];
  }
}
