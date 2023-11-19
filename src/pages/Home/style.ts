import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 5rem;

  p {
    display: flex;
  }

  .p_errors {
    color: red;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 14rem;
    padding-bottom: 5rem;

    div {
      display: flex;
      justify-content: flex-start;
    }
  }

  section {
    width: 14rem;
    display: flex;
    flex-direction: column;
  }

  section tr {
    display: flex;
    justify-content: space-between;
  }

  .form_button {
    margin-top: 2rem;
  }

  .td_key {
    color: gray;
  }

  .div_header {
    max-width: 366px;
    gap: 0.5rem;
    display: flex;
  }

  .div_header_button {
    width: 14rem;
    height: 2.637rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
  }
`;
