export const validateRegister = (
  email: string,
  username: string,
  password: string
) => {
  if (!email.includes('@')) {
    throw new Error('Please enter a validate email address');
  }

  if (username.length <= 2 || username.length > 25) {
    throw new Error('Username must be between 3 to 25 characters long!');
  }

  if (username.includes('@')) {
    throw new Error('Username cannot include an @');
  }

  if (password.length <= 2) {
    throw new Error('password must be greater than 2 characters!')
  }

  return null;
};
