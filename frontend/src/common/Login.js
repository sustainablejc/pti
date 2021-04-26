/* global gapi */
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import { GoogleLogin, GoogleLogout, useGoogleLogin } from 'react-google-login';
import { logout, loginSuccess, loginFailure, useAuthState, useAuthDispatch } from '../Context';


export function Login(props) {
    const [googleProfile, setGoogleProfile] = useState({});

    const clientId = "";
    const dispatch = useAuthDispatch();
    const {user, token} = useAuthState();

    const onSuccess = (e) => {
        axios.post(
            '/rest-auth/google/',
            {access_token: e.accessToken}
        ).then(res => {
            loginSuccess(dispatch, e.profileObj, res.data.key);
        }).catch(err => {
            console.log(err);
        });
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId,
        onFailure: (e) => loginFailure(dispatch, e),
    });

    return (
        <>
            {(token == null || token == "")
                ? (<Button variant="outline-secondary" onClick={signIn}>
                    Sign In Google
                    </Button>
                )
                : (<><div>Welcome {user.email}</div>
                    <Button variant="outline-secondary" onClick={() => logout(dispatch)}>
                    Log out
                    </Button></>)
            }

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

