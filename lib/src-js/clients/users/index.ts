import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import protoPromisify from '../../promisify';
import { TErrorResponse } from '../';

/**
 * message User {
 *   string id = 1;
 *   string email = 2;
 *   string name = 3;
 *   string password = 4;
 *
 *   int64 created_at = 5;
 *	 int64 updated_at = 6;
 * }
 */
export type TUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

// define classic grpc response
export type TUserResponse = TErrorResponse & {
  data: TUser;
};

// define classic grpc response
export type TUserVerifyPasswordResponse = TErrorResponse & {
  valid: boolean;
};

// IUsers define class ...
interface IUsers {
  config(opts: { host: string; port: string }): void;
  get(id: string): Promise<TUserResponse>;
  getByEmail(email: string): Promise<TUserResponse>;
  create(user: TUser): Promise<TUserResponse>;
  verifyPassword(email: string, password: string): Promise<TUserVerifyPasswordResponse>;

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
class Users implements IUsers {
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
    this.client = new proto.UserService(`${opts.host}:${opts.port}`, grpc.credentials.createInsecure());
  }

  /**
   *
   * message GetRequest {
   *   string user_id = 1;
   * }
   *
   * message GetResponse {
   *   User data = 1;
   * }
   *
   */
  get(id: string): Promise<TUserResponse> {
    if (id === undefined) {
      return Promise.reject(new Error('invalid id param'));
    }

    return protoPromisify(this.client, 'userGet')({ user_id: id });
  }

  /**
   *
   * message GetByEmailRequest {
   *   string email = 1;
   * }
   *
   * message GetByEmailResponse {
   *   User data = 1;
   * }
   *
   */
  getByEmail(email: string): Promise<TUserResponse> {
    if (email === undefined) {
      return Promise.reject(new Error('invalid email param'));
    }

    return protoPromisify(this.client, 'userGetByEmail')({ email });
  }

  /**
   *
   * message CreateRequest {
   *   User data = 1;
   * }
   *
   * message CreateResponse {
   *   User data = 1;
   * }
   *
   */
  create(user: TUser): Promise<TUserResponse> {
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

    return protoPromisify(this.client, 'userCreate')({ data: user });
  }

  /**
   *
   * message VerifyPasswordRequest {
   *   string email = 1;
   *   string password = 2;
   * }
   *
   * message VerifyPasswordResponse {
   *    bool valid = 1;
   * }
   *
   */
  verifyPassword(email: string, password: string): Promise<TUserVerifyPasswordResponse> {
    if (email === undefined) {
      return Promise.reject(new Error('invalid email param'));
    }

    if (password === undefined) {
      return Promise.reject(new Error('invalid password param'));
    }

    return protoPromisify(this.client, 'userVerifyPassword')({ email, password });
  }
}

export default new Users();
