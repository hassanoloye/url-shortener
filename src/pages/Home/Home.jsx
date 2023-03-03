import './Home.css';
import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import {Button} from "@mui/material";


import api from '../../utils/api'

function App() {
    const [link, setLink] = useState({key: '', url: ''});
    const [url, setUrl] = useState('example.com');
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e) => {
        console.log({
            url
        })
        e.preventDefault();
        api.post('/', {
            url
        }).then(res => {
            setLink(res.data)
        })
    }

    const shortenedUrl = link.key && `${window.location.protocol}//${window.location.host}/${link.key}`;

    const copyToClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 400000);
        } catch (err) {
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                URL Shortener
                <p> URL Shortener is a free tool to shorten URLs</p>
                <Grid container spacing={2} style={{width: '800px'}}>
                    <Grid xs={12} sm={9}>
                        <OutlinedInput fullWidth value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </Grid>
                    <Grid xs={12} sm={3} className="shorten">
                        <Button onClick={handleSubmit} type="submit" variant="contained" className='shorten-btn'>Shorten
                            URL</Button>
                    </Grid>
                    {
                        link.key && link.url && (
                            <Grid container className="link-container">
                                <Grid xs={8}>
                                    {shortenedUrl}
                                </Grid>
                                <Grid xs={4} className="copy-to-clipboard">
                                    <Button variant="outlined" onClick={() => copyToClipBoard(shortenedUrl)}>Copy</Button>
                                    {copied ? <div>Copied!!!</div> : null}
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>

            </header>


        </div>
    )
}

export default App;
