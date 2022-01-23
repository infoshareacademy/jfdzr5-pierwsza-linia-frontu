import { TextField } from "@mui/material";

import Typography from "@mui/material/Typography";
import {PageWrapper} from "../../common/page-wrapper";
import { Button } from "@mui/material";

import styled from "styled-components";
import { useState } from "react";
// import { Theme } from "@mui/material";




const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`;




    export const Signup = ({ handleClose }) => {
       
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
      
        const handleSubmit = e => {
          e.preventDefault();
          // console.log(firstName, lastName, email, password);
          handleClose();
        };

    return <PageWrapper title="Home App">
    <Typography variant="subtitle1"></Typography>
    


    <Form onSubmit={handleSubmit}>
    {/* <TextField label="Outlined secondary" color="secondary"
      
    variant="filled" inputProps={{ style: { color: 'white', background: '#424242'}}}/> */}
    <TextField
    sx={{ backgroundColor: '#424242',
      // '& .MuiDataGrid-cell:hover': {
      //   color: "primary",
      }}
        label="First Name"
        variant="filled"
        required
        value={firstName}
        color="warning"
        id="outlined-password-input"
        onChange={e => setFirstName(e.target.value)}
       
          
        
      />
      <TextField
      sx={{ 
        backgroundColor: '#424242',
        }}
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
      sx={{
        backgroundColor: '#424242',
        }}
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
      sx={{ 
        backgroundColor: '#424242',
        }}
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    {/* <Button type="submit">Log in</Button> */}
    <div>
        
        <Button type="submit" variant="contained" color="primary">
          Sign up
        </Button>

        {/* <Button type="submit" variant="contained" color="success">Outlined</Button> */}
      </div>
</Form>

</PageWrapper>
};

