import { useState } from "react";
import './Login.css';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/_actions/user_action';

function LoginPage(props){

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailHandler =(e)=>{
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e)=>{
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();

        let body={
            email : email,
            password : password
        }

        dispatch(loginUser(body))
        .then(res =>{
            if(res.payload.loginSuccess){
                props.history.push('/user')
            }else{
                alert('Error')
            }
        })
    }

    return(
        <div id="login">
            <form onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <button type="submit">login</button>
            </form>
            
        </div>
    )
}

export default LoginPage;