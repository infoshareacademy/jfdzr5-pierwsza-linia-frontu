import Typography from "@mui/material/Typography";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
`;

export const PageWrapper = ({ title, children }) => (
    <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>{title}</Typography>
        {children}
    </Container>
)