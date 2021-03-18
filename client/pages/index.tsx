import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query AllUsers {
    getAllUsers {
      username
      email
      id
    }
  }
`;


export default function Home() {
  const { loading, data, error } = useQuery(GET_USERS);

  if (loading) return  <div>'Loading...';</div>;
  if (error) return <div>`Error! ${error.message}`</div>;
  console.log(data);
  return (
    <div>
      <h1>Hello World</h1>
      {data.getAllUsers.map((user: any) => (
        <div key={user.id}>
          <h4>{user.username}</h4>
        </div>
      ))}
    </div>
  )
}
