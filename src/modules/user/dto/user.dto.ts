interface UserDataCreate {
  name: string;
  email: string;
  password: string;
}

interface UserCreateSuccessful {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

interface UserDataLogin {
  email: string;
  password: string;
}

interface UserLoginSuccessful {
  access_token: string;
}

export {
  UserDataCreate,
  UserCreateSuccessful,
  UserDataLogin,
  UserLoginSuccessful,
};
