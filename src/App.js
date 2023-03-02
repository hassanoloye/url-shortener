import logo from './logo.svg';
import OutlinedInput from '@mui/material/OutlinedInput';

import './App.css';
import {Box, Button} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import {useState} from "react";
import axios from "axios"

function App() {

    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState('');

    const handleClick = () => {
        axios.post('https://fasturlshortenerapi.azurewebsites.net/').then(res => {
            setLinks([
                    ...links,
                    {
                        key: res.data.key,
                        url: res.data.url
                    }
                ]
            )
        })

    }
    return (
        <div className="App">
            <header className="App-header">
                Fast URL Shortener
                <h6> Fast URL Shortener is a free tool to shorten URLs</h6>
                <Grid container spacing={2} style={{width: '800px'}}>
                    <Grid xs={12} sm={9}>
                        <OutlinedInput fullWidth value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </Grid>
                    <Grid xs={12} sm={3}>
                        <Button variant="contained" className='shorten-btn' onClick={handleClick}>Shorten URL</Button>
                    </Grid>

                    {links.map(link => {
                        return (
                            <>
                                <Grid xs={6}>
                                    Full URL
                                </Grid>
                                <Grid xs={4}>
                                    Shortened URL
                                </Grid>
                                <Grid xs={2}>
                                    Copy
                                </Grid>
                            </>

                        )
                    })}
                </Grid>

            </header>


        </div>
    );
}

export default App;
