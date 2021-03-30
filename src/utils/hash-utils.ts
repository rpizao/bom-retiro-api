import * as crypto from 'crypto';

export class HashUtils {
  
  static hash(append: string): string {
    return crypto.createHash('md5').update(append).digest('hex');
  }

}