const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';

export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${ROOT_URL}/login`, requestOptions);
		let data = await response.json();

		if (data.user) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}

/**
 * Called after we have successfully logged in
 */
export function loginSuccess(dispatch, user, token) {
    const data = {
        'user': user,
        'token': token
    };

	try {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        localStorage.setItem('currentUser', JSON.stringify(data));
        return data;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
	}
}


export function loginFailure(dispatch, error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}
