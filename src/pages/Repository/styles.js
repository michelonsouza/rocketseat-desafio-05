import styled from 'styled-components';
import { readableColor } from 'polished';

export const Container = styled.div``;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;

    a {
      display: flex;
      width: fit-content;
      align-items: center;
      padding: 5px 10px;
      border-radius: 4px;
      color: #fff;
      background: linear-gradient(45deg, #5ea0ca, #1070ad);

      svg {
        margin-right: 10px;
      }
    }
  }

  img {
    width: 120px;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: 2px solid #eee;
      background: #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          color: #333;

          &:hover {
            color: #1070ad;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Label = styled.span`
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 12px;
  margin-left: 10px;
  margin-top: 3px;
  display: inline-block;
  width: fit-content;
  /* white-space: nowrap; */
  background: ${({ color }) => (color ? `#${color}` : '#333')};
  color: ${({ color }) =>
    color ? readableColor(`#${color}`, '#333', '#fff') : `#fff`};
`;

export const StateFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const FilterButton = styled.button`
  height: 20px;
  color: #fff;
  background: #1070ad;
  border: 0;
  padding: 0 10px;
  opacity: ${({ active }) => (active ? 1 : 0.8)};
  transition: all 200ms ease;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  button {
    border: 0;
    padding: 4px 8px;
    background: #1070ad;
    color: #fff;
    border-radius: 4px;
    transition: all 200ms ease;
    display: flex;

    &:hover {
      opacity: 0.8;
    }

    &[disabled] {
      opacity: 0.6;
      cursor: no-drop;
    }
  }

  span {
    font-weight: bold;
    font-size: 16px;
    color: #1070ad;
    margin: 0 15px;
  }
`;
