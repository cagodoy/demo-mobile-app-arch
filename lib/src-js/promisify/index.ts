const promisify = (client: any, name: string): Function => (req: any): Promise<any> =>
  new Promise((resolve, reject) => {
    client[name](req, (err: Error, data: any) => (err ? reject(err) : resolve(data)));
  });

export default promisify;
