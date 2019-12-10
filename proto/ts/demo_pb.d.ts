// package: proto
// file: proto/demo.proto

import * as jspb from "google-protobuf";

export class Meta extends jspb.Message {
  hasPage(): boolean;
  clearPage(): void;
  getPage(): MetaPage | undefined;
  setPage(value?: MetaPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Meta.AsObject;
  static toObject(includeInstance: boolean, msg: Meta): Meta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Meta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Meta;
  static deserializeBinaryFromReader(message: Meta, reader: jspb.BinaryReader): Meta;
}

export namespace Meta {
  export type AsObject = {
    page?: MetaPage.AsObject,
  }
}

export class MetaPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  getCurrent(): number;
  setCurrent(value: number): void;

  getPrev(): number;
  setPrev(value: number): void;

  getNext(): number;
  setNext(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaPage.AsObject;
  static toObject(includeInstance: boolean, msg: MetaPage): MetaPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MetaPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaPage;
  static deserializeBinaryFromReader(message: MetaPage, reader: jspb.BinaryReader): MetaPage;
}

export namespace MetaPage {
  export type AsObject = {
    total: number,
    current: number,
    prev: number,
    next: number,
  }
}

export class Error extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: number,
    updatedAt: number,
  }
}

export class UserGetRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetRequest): UserGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetRequest;
  static deserializeBinaryFromReader(message: UserGetRequest, reader: jspb.BinaryReader): UserGetRequest;
}

export namespace UserGetRequest {
  export type AsObject = {
    userId: string,
  }
}

export class UserGetResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): User | undefined;
  setData(value?: User): void;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;

  hasError(): boolean;
  clearError(): void;
  getError(): Error | undefined;
  setError(value?: Error): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetResponse): UserGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetResponse;
  static deserializeBinaryFromReader(message: UserGetResponse, reader: jspb.BinaryReader): UserGetResponse;
}

export namespace UserGetResponse {
  export type AsObject = {
    data?: User.AsObject,
    meta?: Meta.AsObject,
    error?: Error.AsObject,
  }
}

export class UserGetByEmailRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetByEmailRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetByEmailRequest): UserGetByEmailRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetByEmailRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetByEmailRequest;
  static deserializeBinaryFromReader(message: UserGetByEmailRequest, reader: jspb.BinaryReader): UserGetByEmailRequest;
}

export namespace UserGetByEmailRequest {
  export type AsObject = {
    email: string,
  }
}

export class UserGetByEmailResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): User | undefined;
  setData(value?: User): void;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;

  hasError(): boolean;
  clearError(): void;
  getError(): Error | undefined;
  setError(value?: Error): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetByEmailResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetByEmailResponse): UserGetByEmailResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetByEmailResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetByEmailResponse;
  static deserializeBinaryFromReader(message: UserGetByEmailResponse, reader: jspb.BinaryReader): UserGetByEmailResponse;
}

export namespace UserGetByEmailResponse {
  export type AsObject = {
    data?: User.AsObject,
    meta?: Meta.AsObject,
    error?: Error.AsObject,
  }
}

export class UserCreateRequest extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): User | undefined;
  setData(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCreateRequest): UserCreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCreateRequest;
  static deserializeBinaryFromReader(message: UserCreateRequest, reader: jspb.BinaryReader): UserCreateRequest;
}

export namespace UserCreateRequest {
  export type AsObject = {
    data?: User.AsObject,
  }
}

export class UserCreateResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): User | undefined;
  setData(value?: User): void;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;

  hasError(): boolean;
  clearError(): void;
  getError(): Error | undefined;
  setError(value?: Error): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCreateResponse): UserCreateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserCreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCreateResponse;
  static deserializeBinaryFromReader(message: UserCreateResponse, reader: jspb.BinaryReader): UserCreateResponse;
}

export namespace UserCreateResponse {
  export type AsObject = {
    data?: User.AsObject,
    meta?: Meta.AsObject,
    error?: Error.AsObject,
  }
}

export class UserVerifyPasswordRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserVerifyPasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserVerifyPasswordRequest): UserVerifyPasswordRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserVerifyPasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserVerifyPasswordRequest;
  static deserializeBinaryFromReader(message: UserVerifyPasswordRequest, reader: jspb.BinaryReader): UserVerifyPasswordRequest;
}

export namespace UserVerifyPasswordRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class UserVerifyPasswordResponse extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;

  hasError(): boolean;
  clearError(): void;
  getError(): Error | undefined;
  setError(value?: Error): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserVerifyPasswordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserVerifyPasswordResponse): UserVerifyPasswordResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserVerifyPasswordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserVerifyPasswordResponse;
  static deserializeBinaryFromReader(message: UserVerifyPasswordResponse, reader: jspb.BinaryReader): UserVerifyPasswordResponse;
}

export namespace UserVerifyPasswordResponse {
  export type AsObject = {
    valid: boolean,
    meta?: Meta.AsObject,
    error?: Error.AsObject,
  }
}

