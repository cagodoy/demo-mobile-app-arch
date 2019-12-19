import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import protoPromisify from '../../promisify';

// types
import { TErrorResponse } from '../';

// define history message
export type THistory = {
  id: string;
  userId: string;
  latitude: string;
  longitude: string;
};

export type TMetaPageToken = {
  pageToken: string;
};

// define history response message
export type THistoryResponse = TErrorResponse & {
  data: THistory[];
};

// IHistory define class ...
interface IHistory {
  config(opts: { host: string; port: string }): void;
  listByUserId(userId: string): Promise<THistoryResponse>;
}

//
// There explain that it is less more expensive to have a single communication
// with the server than to make a connection for every request made to the API.
// see: https://stackoverflow.com/questions/49244039/go-grpc-simple-service-asynchronous-and-synchronous-explanation#answers
//

/*
 * message History {
 *  string id = 1;
 *  string user_id = 2;
 *  string latitude = 3;
 *  string longitude = 4;
 *  int64 created_at = 5;
 *  int64 updated_at = 6;
 * }
 */
class History implements IHistory {
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
    this.client = new proto.HistoryService(`${opts.host}:${opts.port}`, grpc.credentials.createInsecure());
  }

  /**
   *
   * message HistoryListByUserIdRequest {
   *  string user_id = 1;
   * }
   *
   * message HistoryListByUserIdResponse {
   *  repeated History data = 1;
   *  Meta meta = 2;
   *  Error error = 3;
   * }
   *
   */
  listByUserId(userId: string): Promise<THistoryResponse> {
    if (userId === undefined) {
      return Promise.reject(new Error('invalid userId'));
    }

    return protoPromisify(this.client, 'listHistoryByUserId')({ userId });
  }
}

export default new History();
