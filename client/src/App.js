import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import styled from '@emotion/styled';

const StyledHeader = styled.div`
  padding: 10px;
  p {
    font-weight: bold;
  }
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <p> Codemotion Docker</p>
    </StyledHeader>
  );
};

const StyledTable = styled.table`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;

  th {
    text-align: left;
  }
`;

const Users = ({ users }) => {
  if (!users) {
    return 'loading...';
  }
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledForm = styled.form`
  padding: 10px;
  display: flex;
  gap: 10px;
  div {
    label {
      display: block;
    }
  }
`;

function Form({ addUser }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = addUser;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input name="name" defaultValue="" ref={register({ required: true })} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input name="email" ref={register({ required: true })} />
      </div>
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </StyledForm>
  );
}

const API_URL = window.env.API_URL;

function App() {
  const [users, setUsers] = useState();
  const fetchUser = () => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then(setUsers);
  };
  useEffect(fetchUser, []);
  const addUser = (user) =>
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(fetchUser);

  return (
    <div>
      <Header />
      <Users users={users} />
      <Form addUser={addUser} />
    </div>
  );
}

export default App;
