import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;

  table {
    width: 100%;
  }

  .td_key {
    color: gray;
  }

  .div_card_goals {
    border-bottom: 1px solid #535bf2;
    max-width: 30rem;
  }

  .div_header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .div_header_button {
    min-height: 3rem;
  }

  .div__father {
    margin: 0 1rem 0 1rem;
  }
`;
