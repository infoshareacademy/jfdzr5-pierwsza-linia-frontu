import styled from 'styled-components';
import { Theme } from "../theme/theme";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 2rem;
    box-sizing: border-box;
    background-color: ${Theme.palette.primary.main};
    color: ${Theme.palette.secondary.contrastText};
`;

export const PageWrapper = ({ children }) => (
    <Container>
        {children}
    </Container>
)