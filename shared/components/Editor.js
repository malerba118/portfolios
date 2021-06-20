import React from 'react'
import {
  useQuery,
} from 'react-query'
import { useAuth } from 'client/useAuth'
import * as api from 'client/api'

const Editor = () => {
  const user = useAuth()
  const query = useQuery('portfolio', api.portfolio.get)

  return (
    <div>
      <h2>Hello, {user?.email}</h2>
      <p>{JSON.stringify(query.data)}</p>
    </div>
  );
};

export default Editor;
