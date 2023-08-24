import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
        gap: 2rem;
        display: flex;
    }
`;