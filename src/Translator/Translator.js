import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
export default function Translator() {
    const [language, setLanguage] = useState(0);
    const [translation, setTranslation] = useState("");

    const [enButtonVariant, setENButtonVariant] = useState("contained");
    const [huButtonVariant, setHUButtonVariant] = useState("outlined");
    const [esButtonVariant, setESButtonVariant] = useState("outlined");
    const [cnButtonVariant, setCNButtonVariant] = useState("outlined");
    const [prButtonVariant, setPRButtonVariant] = useState("outlined");

    useEffect(() => {
        let inputFieldValue = document.getElementById('translateTextField').value;

        if(inputFieldValue == null || inputFieldValue == "")
            return;
        
        getTranslation();
    }, [enButtonVariant, huButtonVariant, esButtonVariant, cnButtonVariant, prButtonVariant])
    

    const getTranslation = () => {
        let value = document.getElementById('translateTextField').value;
        callApi(value);
    }

    const callApi = async (value) => {
        let url = `https://localhost:7076/translate/${language}/${value}`

        await fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': '',
                'Accept': 'text/plain'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }).then((response) => response.json())
        .then((data) => setTranslation(data));
    }

    function debounce(func, delay = 1000) {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const debouncedUserInput = debounce(getTranslation);

    return (
        <Grid2 sx={{width: '100%', padding: '5%'}}>
            <Grid2 container xs={12}>
                <Grid2 item xs={5.5}>
                </Grid2>
                <Grid2 item xs={1}>
                    {/* filler */}
                </Grid2>
                <Grid2 item xs={5.5}>
                    <Button variant={enButtonVariant} 
                        onClick={(c) => {setLanguage(0); 
                                        setENButtonVariant("contained"); 
                                        setHUButtonVariant("outlined"); 
                                        setESButtonVariant("outlined"); 
                                        setCNButtonVariant("outlined");
                                        setPRButtonVariant("outlined")}}
                    >English
                    </Button>
                    <Button variant={huButtonVariant} 
                        onClick={(c) => {setLanguage(1); 
                                        setENButtonVariant("outlined"); 
                                        setHUButtonVariant("contained"); 
                                        setESButtonVariant("outlined"); 
                                        setCNButtonVariant("outlined");
                                        setPRButtonVariant("outlined")}}
                    >Hungarian
                    </Button>
                    <Button variant={esButtonVariant} 
                        onClick={(c) => {setLanguage(2); 
                                        setENButtonVariant("outlined"); 
                                        setHUButtonVariant("outlined"); 
                                        setESButtonVariant("contained"); 
                                        setCNButtonVariant("outlined");
                                        setPRButtonVariant("outlined")}}
                    >Spanish
                    </Button>
                    <Button variant={cnButtonVariant} 
                        onClick={(c) => {setLanguage(3); 
                                        setENButtonVariant("outlined"); 
                                        setHUButtonVariant("outlined"); 
                                        setESButtonVariant("outlined"); 
                                        setCNButtonVariant("contained");
                                        setPRButtonVariant("outlined")}}
                    >Chinese
                    </Button>
                    <Button variant={prButtonVariant} 
                        onClick={(c) => {setLanguage(4); 
                                        setENButtonVariant("outlined"); 
                                        setHUButtonVariant("outlined"); 
                                        setESButtonVariant("outlined"); 
                                        setCNButtonVariant("outlined");
                                        setPRButtonVariant("contained")}}
                    >Portuguese
                    </Button>
                </Grid2>
            </Grid2>
            <Grid2 container xs={12} sx={{paddingTop: '1%'}}>
                <Grid2 item xs={5.5}>
                    <TextField id='translateTextField' multiline inputProps={{style: {height: "100px", fontSize: '30px'},}} variant="outlined" sx={{width: '100%'}} onInput={(i) => {debouncedUserInput()}}/>
                </Grid2>
                <Grid2 item xs={1}>
                    {/* filler */}
                </Grid2>
                <Grid2 item xs={5.5} sx={{height: '50vh'}}>
                    <TextField value={translation} multiline inputProps={{style: {height: "100px", fontSize: '30px'},}} variant="outlined" sx={{width: '100%'}}/>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}
