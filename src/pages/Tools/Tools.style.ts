import styled from "styled-components";

const StyledTools = styled.div`
    #pageButtons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        & > button {
            margin: 2px 5px;
        }
    }

    @media screen and (max-width: 700px) {
        padding-top: 10px;
    }
`;

export default StyledTools
