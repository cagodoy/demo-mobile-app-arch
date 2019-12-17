import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import protoPromisify from '../../promisify';

// types
import { TUser } from '../users';
import { TErrorResponse } from '../';

// define classic grpc response
export type TAuthResponse = TErrorResponse & {
  data: TUser;
  meta: {
    token: string;
  };
};

// TAuthVerifyTokenResponse ...
export type TAuthVerifyTokenResponse = TErrorResponse & {
  valid: boolean;
};

// define auth message
export type TAuth = {
  id: string;
  userId: string;
  token: string;
  blacklist: boolean;
};

// IAuth define class ...
interface IAuth {
  config(opts: { host: string; port: string }): void;
  verifyToken(token: string): Promise<boolean>;
  login(email: string, password: string): Promise<TAuthResponse>;
  signUp(user: TUser): Promise<TAuthResponse>;

  // TODO(ca): below methods are not implemented
  //
  //   select(): Promise<any>
  //   update(id, data): Promise<any>
  //   delete(id): Promise<any>
}

//
// There explain that it is less more expensive to have a single communication
// with the server than to make a connection for every request made to the API.
// see: https://stackoverflow.com/questions/49244039/go-grpc-simple-service-asynchronous-and-synchronous-explanation#answers
//
class Auth implements IAuth {
  client: any;

  // singleton class not use constructor method
  constructor() {}

  // config configure singleton class
  config(opts: { host: string; port: string }): void {
    const protoPath = __dirname + `/../../../proto/demo.proto`;

    const packageDefinition = protoLoader.loadSync(protoPath, {
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const { proto }: any = protoDescriptor;
    this.client = new proto.AuthService(`${opts.host}:${opts.port}`, grpc.credentials.createInsecure());
  }

  /**
   *
   * message AuthVerifyTokenRequest {
   * 	string token = 1;
   * }
   *
   * message AuthVerifyTokenResponse {
   * 	bool valid = 1;
   * 	Error error = 2;
   * }
   *
   */
  verifyToken(token: string): Promise<boolean> {
    if (token === undefined) {
      return Promise.reject(new Error('invalid token param'));
    }

    return protoPromisify(this.client, 'verifyToken')({ token });
  }

  /**
   *
   * message AuthLoginRequest {
   *  string email = 1;
   *  string password = 2;
   * }
   *
   * message AuthLoginResponse {
   *  User data = 1;
   *  Token meta = 2;
   *  Error error = 3;
   * }
   *
   */
  login(email: string, password: string): Promise<TAuthResponse> {
    if (email === undefined) {
      return Promise.reject(new Error('invalid email param'));
    }

    if (email === undefined) {
      return Promise.reject(new Error('invalid password param'));
    }

    return protoPromisify(this.client, 'userGetByEmail')({ email, password });
  }

  /**
   *
   * message AuthSignupRequest {
   *  User user = 1;
   * }
   *
   * message AuthSignupResponse {
   *  User data = 1;
   *  Token meta = 2;
   *  Error error = 3;
   * }
   *
   */
  signUp(user: TUser): Promise<TAuthResponse> {
    if (user === undefined) {
      return Promise.reject(new Error('invalid user param'));
    }

    const { name } = user;
    if (name === undefined) {
      return Promise.reject(new Error('invalid user.name param'));
    }

    const { email } = user;
    if (email === undefined) {
      return Promise.reject(new Error('invalid user.email param'));
    }

    const { password } = user;
    if (password === undefined) {
      return Promise.reject(new Error('invalid user.password param'));
    }

    return protoPromisify(this.client, 'signUp')({ user });
  }
}

export default new Auth();
