import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

import { setMessage, setUser } from "@/redux/generalSlice";

import Input from "../Input/Input";
import Grid from "../styled/Grid";
import Button from "../Button/Button";

import { syncUrl } from "@/utils/sync.utils";

// dev test credentials: admin, password
// dev test credentials 2: test, password

const fetchUserData = async (body: {username: string, password: string}, path: string) => {
	const data = await fetch(syncUrl+path, {
		method: 'POST', 
		headers: {'content-type': 'application/json'},
		credentials: 'include',
		body: JSON.stringify(body)
	}).then(res => res.json());

	return data;
}

const UserLoginRegister = () => {
	const dispatch = useAppDispatch();
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ fetching, setFetching ] = useState(false);

	const onLogin = async () => {
		dispatch(setMessage({text: '', type: ''}));
		setFetching(true);

		try {
			const data = await fetchUserData({username, password}, 'login');
	
			setFetching(false);
			if (data.status === 'success') {
				setUsername('');
				setPassword('');
				dispatch(setUser(data.user));
			} else {
				if (data.type === 'logout') dispatch(setUser(null));
				dispatch(setMessage({text: data.message, type: 'error'}))
			}
		} catch (err: any) {
			console.log(err.message);
            dispatch(setMessage({text: 'Failed to contact server.', type: 'error'}));
            setFetching(false);
		}
	}

	const onRegister = async () => {
		if (username.length < 3) {
            dispatch(setMessage({text: 'Username should be 3 or more characters', type: 'error'}));
            return;
        }

        if (password.length < 8) {
            dispatch(setMessage({text: 'Password should be 8 or more characters', type: 'error'}));
            return;
        }

        dispatch(setMessage({text: '', type: ''}));
        setFetching(true);

		try {
			const data = await fetchUserData({username, password}, 'register');

			setUsername('');
            setPassword('');
            setFetching(false);
            if (data.status === 'success') dispatch(setUser(data.user));
            else dispatch(setMessage({text: data.message, type: 'error'}));
		} catch (err: any) {
			console.log(err.message);
            dispatch(setUser(null));
            dispatch(setMessage({text: 'Failed to contact server. Please try again.', type: 'error'}));
            setFetching(false);
		}
	}

	return (
		<>
			<Grid template="1fr" width='250px'>
				<Input label='Username' labelWidth="100px" value={username} onChange={setUsername}/>
				<Input type='password' label='Password' labelWidth="100px" value={password} onChange={setPassword}/>
			</Grid>
			<Grid template='1fr 1fr' width='250px' style={{marginTop: '10px'}}>
				<Button label='Login' onClick={onLogin} loading={fetching}/>
				<Button label='Register' onClick={onRegister} loading={fetching}/>
			</Grid>
		</>
	);
}

export default UserLoginRegister;