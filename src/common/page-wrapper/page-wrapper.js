import styled from 'styled-components';

const Container = styled.div`
    margin: 2rem;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PageWrapper = ({ children }) => (
    <Container>
        {children}
    </Container>
)