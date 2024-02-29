export interface GetUserReq {
  username: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}
