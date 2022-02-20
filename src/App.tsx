import React from 'react';
import './App.css';
import UserCard from "./src/users/components/UserCard";
import {Container, Grid} from "@mui/material";

function App() {
    return (
        <div className="App" style={{backgroundColor:'#f5f9ea',minHeight:'100vh'}}>
            <Container maxWidth={'lg'}>
                <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5,6,7,8].map((s) => <Grid item xs={3} lg={3} md={4} sm={12}><UserCard/></Grid>)}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
