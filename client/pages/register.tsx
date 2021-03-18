import React from 'react'

const register: React.FC = () => {
  return (
    <>
      <h2>Register Page</h2>
      <form action="">
        <div>
          <label htmlFor="username">username</label>
          <input type="text" name="username" placeholder="username..." required/>
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" placeholder="email address..." required/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" placeholder="password " required/>
        </div>
      </form>
    </>
  );
}

export default register;