import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Spinner from 'react-spinner-material';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const repos = localStorage.getItem('@GithubRepos:repositories');

    if (repos) {
      setRepositories(JSON.parse(repos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      '@GithubRepos:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  function handleInputChange({ target: { value } }) {
    setNewRepo(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: response } = await api.get(`/repos/${newRepo}`);

      const data = {
        id: response.id,
        name: response.full_name,
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    setLoading(false);
  }

  function handleRemove(id) {
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? (
            <Spinner size={20} spinnerColor="#fff" spinnerWidth={2} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => (
          <li key={String(repository.id)}>
            <span>{repository.name}</span>
            <div>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
              <button
                type="button"
                title={`Excluir repositório ${repository.name}`}
                onClick={() => handleRemove(repository.id)}
              >
                <FaTrashAlt size={14} color="#fff" />
              </button>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}
