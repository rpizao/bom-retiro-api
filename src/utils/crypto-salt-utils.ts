import * as crypto from 'crypto';

export class CryptoSaltUtils {

  static encodeSha512(password: string, salt: string): EncodedPassw {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passw: value
    };
  }

  static generateSalt(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2))
                 .toString('hex').slice(0, length);
  }

}

export class EncodedPassw {
  salt: string;
  passw: string;
}