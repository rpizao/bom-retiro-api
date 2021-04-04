import { Model } from 'mongoose';
import { AuthToken, IAuthUser } from '../entities/models/auth-user';
import { CryptoSaltUtils } from '../utils/crypto-salt-utils';
import { DateUtils } from '../utils/date-utils';
import { HashUtils } from '../utils/hash-utils';
import { BasicRepository } from './basic-repository';

export class AuthRepository extends BasicRepository<IAuthUser> {

  private Model: Model<IAuthUser, {}>;

  constructor() {
    super();

    this.Model = this.getModel("AuthUserModel");
  }

  async login(credentials: {username: string, password: string}): Promise<AuthToken | null> {
    const user = await this.Model.findOne({"email": credentials.username});
    if (user == null) return null;

    const sha = CryptoSaltUtils.encodeSha512(credentials.password, user.salt);
    const isAuthUser = (user.passw == sha.passw);

    if(!isAuthUser) return null;

    return {token: HashUtils.hash(DateUtils.toDate(new Date())), user: {fullname: user.name, department: user.department}};
  }

  async logout(credentials: {username: string, password: string}): Promise<void> {
    // logout não demanda nenhum operação de back-end, no momento.
  }

}