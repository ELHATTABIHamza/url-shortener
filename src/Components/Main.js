import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { FileCopyOutlined as FileCopyOutlinedIcon, } from '@mui/icons-material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import './Main.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Main() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [lastUrls, setLastUrls] = useState([]);
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');

    function fetchData(){
        axios.get('http://127.0.0.1:8000/api/urls')
            .then(response => {
                setLastUrls(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [shortenedUrl]);

    const handleShorten = () => {
        const formData = new FormData();
        formData.append('original_url', originalUrl);

        axios
            .post('http://127.0.0.1:8000/api/shorten', formData)
            .then((response) => {
                setShortenedUrl('http://127.0.0.1:8000/api/' + response.data.short_url)
                console.log('Response:', response.data);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });

    };

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shortenedUrl)
                .then(() => {
                    console.log('Shortened URL copied to clipboard:', shortenedUrl);
                })
                .catch((error) => {
                    console.error('Error copying to clipboard:', error);
                });
        } else {
            console.error('Clipboard API not supported in this browser');
        }
    };

    const style1 = {
        display: 'flex', color: 'black', fontSize: '15px', fontFamily: 'Montserrat', fontWeight: '500', marginLeft: "10px"
    }


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const CARD = (props) => {
        return (

            <div className='card-row'>
                <span className='card-item' style={style1}>http://127.0.0.1:8000/api/{props.nws.short_url}</span>
                <span className='card-item' style={style1}>{truncate(props.nws.original_url, 40)}</span>
                <span className='card-item' style={style1}>{props.nws.click_count}</span>
            </div>

        );
    }


    return (
        <Container component="main" maxWidth="md">
            {/* <CssBaseline /> */}
            <div>
                <div id="header-div">
                    <h1 className="" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: '700' }}>Link Shortener</h1>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            sx={{ fontFamily: 'Montserrat', fontWeight: '500' }}
                            fullWidth
                            placeholder="Enter URL here . . ."
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            required
                            value={originalUrl}
                        />
                    </Grid>
                    <Grid item xs={9} >
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={handleShorten}
                            sx={{ height: '50px', fontFamily: 'Montserrat' }}
                        >
                            Shorten URL
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="outlined"
                            startIcon={<CleaningServicesIcon />}
                            onClick={() => {
                                setOriginalUrl('');
                                setShortenedUrl('');
                                setError('');
                            }}
                            fullWidth
                            color="error"
                            sx={{ height: '50px', fontFamily: 'Montserrat' }}
                        >
                            Clear
                        </Button>
                    </Grid>
                </Grid>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: '40px',
                        justifyContent: 'space-between',
                        backgroundColor: '#91dbf6',
                        margin: '30px 0 10px 0',
                        padding: '5px 0 5px 0',
                        borderRadius: '5px',
                        alignItems: 'center',
                        marginBottom: '100px',
                    }}
                >
                    <div style={style1}>
                        Your short URL:
                    </div>
                    <div style={style1}>
                        {shortenedUrl}
                    </div>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<FileCopyOutlinedIcon />}
                        onClick={handleCopy}
                        sx={{ height: '50px', fontFamily: 'Montserrat' }}
                    >
                        Copy
                    </Button>
                </div>
                <Typography variant="body1" sx={{ textAlign: 'center', color: '#e76f51', fontStyle: 'italic', margin: '0' }}>
                    {error}
                </Typography>
                {/* =============================================================== */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '40px',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontWeight: '700', margin: '0' }}>
                        Top Links
                    </Typography>
                </div>
                <div>
                    <div className='card-row1'>
                        <span className='card-item' style={style1}>Shortened Url</span>
                        <span className='card-item' style={style1}>original Url</span>
                        <span className='card-item' style={style1}>Click Count</span>
                    </div>
                    <div className='cards-container'>
                        {lastUrls.map((nnew) => <CARD key={nnew}
                            nws={nnew} />)}
                    </div>

                </div>
            </div>
        </Container>
    );
}

export default Main;
