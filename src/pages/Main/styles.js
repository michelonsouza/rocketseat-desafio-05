import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  disbled: props.loading,
}))`
  background: #1070ad;
  border: 0;
  color: #fff;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  transition: all 200ms ease;

  &:hover {
    opacity: 0.9;
  }

  &[disabled] {
    cursor: progress;
    opacity: 0.6;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100px;

      a {
        color: #1070ad;
      }

      button[type='button'] {
        border: 0;
        background: #fc5a5a;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 4px;
        transition: all 200ms ease;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

export const NoRepositories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  h2 {
    color: #333;
    text-align: center;
  }
`;
