import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > *:not(h4) {
        margin: 5px;
    }

    & p {
        text-align: center;
        max-width: 1000px;
    }
`;

export default Container;