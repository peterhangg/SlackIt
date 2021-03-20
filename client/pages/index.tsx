import React from 'react';
import Navbar from '../components/Navbar';
import { useAllUsersQuery, useGetMeQuery } from '../src/generated/graphql';
import { withApollo } from '../src/apollo/client';

const Index = () => {
  const { data, loading, error } = useAllUsersQuery();
  useGetMeQuery();

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

export default withApollo({ ssr: true })(Index);
