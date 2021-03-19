export const validateRegister = (
  email: string,
  username: string,
  password: string
) => {
  if (!email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Please enter a validate email address',
      },
    ];
  }

  if (username.length <= 2 || username.length > 25) {
    return [
      {
        field: 'username',
        message: 'Username must be between 3 to 25 characters long!',
      },
    ];
  }

  if (username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Username cannot include an @',
      },
    ];
  }

  if (password.length <= 2) {
    return [
      {
        field: 'password',
        message: 'password must be greater than 2 characters!',
      },
    ];
  }

  return null;
};
