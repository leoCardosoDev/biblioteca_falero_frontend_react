export interface DeleteUser {
  perform: (id: string) => Promise<void>;
}
