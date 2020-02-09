import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Label,
  StateFilter,
  FilterButton,
  Pagination,
} from './styles';

function Repository({ match: { params } }) {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('open');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadRepository() {
      const repoName = decodeURIComponent(params.repository);

      const [newRepo, newIssues] = await Promise.all([
        api.get(`/repos/${repoName}`).then(({ data }) => data),
        api
          .get(`/repos/${repoName}/issues`, {
            params: {
              state: 'open',
              per_page: 5,
            },
          })
          .then(({ data }) => data),
      ]);

      setRepository(newRepo);
      setIssues(newIssues);
      setLoading(false);
    }

    loadRepository();
  }, []);

  async function handleCatchIssues(newPage) {
    const repoName = decodeURIComponent(params.repository);
    setLoading(true);
    const { data: response } = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: stateFilter,
        page: newPage || page,
        per_page: 5,
      },
    });

    setPage(newPage || 1);
    setIssues(response);
    setLoading(false);
  }

  function handleStateChange(state) {
    setStateFilter(state);

    handleCatchIssues();
  }

  if (loading) {
    return (
      <Loading>
        <Spinner spinnerColor="#fff" size={150} spinnerWidth={10} />
      </Loading>
    );
  }

  return (
    <Container>
      <Owner>
        <div>
          <Link to="/">
            <FaChevronLeft size={16} color="#fff" />
            Voltar aos repositórios
          </Link>
        </div>
        <img src={repository.owner.avatar_url} alt={repository.owner.longin} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <StateFilter>
        <FilterButton
          type="button"
          onClick={() => handleStateChange('open')}
          active={stateFilter === 'open'}
        >
          open
        </FilterButton>
        <FilterButton
          type="button"
          onClick={() => handleStateChange('all')}
          active={stateFilter === 'all'}
        >
          all
        </FilterButton>
        <FilterButton
          type="button"
          onClick={() => handleStateChange('closed')}
          active={stateFilter === 'closed'}
        >
          closed
        </FilterButton>
      </StateFilter>

      <IssueList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a
                  href={issue.html_url}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  {issue.title}
                </a>
                {issue.labels.map(label => (
                  <Label key={String(label.id)} color={label.color}>
                    {label.name}
                  </Label>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>

      <Pagination>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => handleCatchIssues(page - 1)}
        >
          <FaChevronLeft size={14} color="#fff" />
        </button>
        <span>{page}</span>
        <button type="button" onClick={() => handleCatchIssues(page + 1)}>
          <FaChevronRight size={14} color="#fff" />
        </button>
      </Pagination>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
