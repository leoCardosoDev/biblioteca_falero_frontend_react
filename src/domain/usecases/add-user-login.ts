export interface AddUserLoginParams {
  userId: string;
  username?: string;
  password?: string;
}

export interface AddUserLogin {
  perform: (params: AddUserLoginParams) => Promise<void>;
}
