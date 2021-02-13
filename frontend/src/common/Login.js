/* global gapi */
import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import { GoogleLogin, GoogleLogout, useGoogleLogin } from 'react-google-login';


export function Login(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [googleProfile, setGoogleProfile] = React.useState({});
    const [accessToken, setAccessToken] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const clientId = "";

    const onSuccess = (e) => {
        console.log(e);
        setGoogleProfile(e.profileObj);
        setAccessToken(e.accessToken);
        setIsLoggedIn(true);
        axios.post(
            'http://localhost:8000/rest-auth/google/',
            {access_token: e.accessToken}
        ).then(res => {
            console.log(res);
            axios.get(`http://localhost:8000/api/v1/weekly-assessment/`, {
                headers: {'Authorization': 'Token ' + res.data.key}})
                .then(res => {
                    debugger;
                }).catch(err => {
                    debugger;
                });
        }).catch(err => {
            console.log(err);
        });
    }

    const onFailure = (e) => {
        console.log(e);
        setGoogleProfile({});
        setAccessToken(null);
        setIsLoggedIn(false);
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
    });


    /*
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Login
        </Button>
    */
    return (
        <>
        <Button variant="outline-secondary" onClick={signIn}>
           Sign In 
        </Button>

        <LoginModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        </>
    );
}


function LoginModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Login With Social Media
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <GoogleLogin />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
  );
}


function GoogleLoginComponent(props) {
    const responseGoogle = (response) => {
        console.log('here');
        console.log(response);
    }
    return (
        <GoogleLogin
            clientId=""
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={(e) => console.log(e)}
            onFailure={(e) => console.log(e)}
            onRequest={(e) => console.log(e)}
        />
    );
}

function GoogleLogoutComponent(props) {
    const logout = (e) => {
        console.log(e);
    }
    return (
        <div>test</div>
    );
}
