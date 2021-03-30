import { Model } from 'mongoose';
import { IAuthUser } from '../entities/models/auth-user';
import { CryptoSaltUtils } from '../utils/crypto-salt-utils';
import { BasicRepository } from './basic-repository';

export class AuthRepository extends BasicRepository<IAuthUser> {

  private Model: Model<IAuthUser, {}>;

  constructor() {
    super();

    this.Model = this.getModel("AuthUserModel");
  }

  async login(credentials: {email: string, passw: string, club: string}): Promise<IAuthUser | null> {
    const user = await this.Model.findOne({"email": credentials.email});
    if (user == null) return null;

    const sha = CryptoSaltUtils.encodeSha512(credentials.passw, user.salt);
    const isAuthUser = (user.passw == sha.passw);
    if(!isAuthUser) return null;

    // TODO: Criar um sha pra validar as próximas requisições.
    return <IAuthUser> { name: user.name, email: user.email };
  }

}