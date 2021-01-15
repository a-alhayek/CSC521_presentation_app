import React , {useState} from 'react';
import {Grid, Card, Typography ,Button, TextField} from '@material-ui/core';




const AuthForm = () => {

    const [name,setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const authentiacte = async () => {
        const basePath = 'api/auth/' ; // server side path
        let url = basePath;
        
    }
}

export default AuthForm;