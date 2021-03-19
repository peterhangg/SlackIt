import React from 'react';
import Navbar from '../components/Navbar';
import { useAllUsersQuery } from '../src/generated/graphql';

export default function Home() {
  const { data, loading, error } = useAllUsersQuery();

  if (loading) return  <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div>
      <Navbar />
      <h1>Hello World</h1>
      {data?.getAllUsers.map((user: any) => (
        <div key={user.id}>
          <h4>{user.username}</h4>
        </div>
      ))}
    </div>
  )
}
