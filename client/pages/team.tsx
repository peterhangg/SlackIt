import React from 'react';
import { withApollo } from '../src/apollo/client';
import { useRouter } from 'next/router';
import { useCreateTeamMutation } from '../src/generated/graphql';
import useForm from '../src/utils/useForm';
import { useIsAuthenticated } from '../src/utils/useIsAuthenticated';

const createTeam: React.FC = () => {
  useIsAuthenticated();
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    name: '',
  });
  const [createTeamMutation, { loading, error }] = useCreateTeamMutation({
    variables: inputs as any,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createTeamMutation().catch((err) =>
      console.error(err)
    );
    if (!response) {
      return;
    }
    router.push('/');
  };

  return (
    <>
      {error && <h2>{error.message}</h2>}
      <h1>Create workplace team</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Team Name</label>
          <input
            type="text"
            name="name"
            placeholder="Team name..."
            onChange={handleChange}
            value={inputs.name}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Create Team
        </button>
      </form>
    </>
  );
};

export default withApollo({ ssr: false })(createTeam);
