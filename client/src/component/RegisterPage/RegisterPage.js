import { useState } from "react";
import './Register.css';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../redux/_actions/user_action';


function RegisterPage(props){


    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmed, setConfirmed] = useState("")

    const onNameHandler =(e)=>{
        setName(e.currentTarget.value)
    }

    const onEmailHandler =(e)=>{
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e)=>{
        setPassword(e.currentTarget.value)
    }

    const onConfirmedHandler = (e)=>{
        setConfirmed(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();

        if(password !== confirmed){
            return alert("비밀번호와 비밀번호확인은 같아야 합니다")
        }

        let body={
            name : name,
            email : email,
            password : password,
            confirmed : confirmed
        }

        dispatch(registerUser(body))
        .then(res =>{
            if(res.payload.success){
                props.history.push('/login')
            }else{
                alert('Fail to sign up')
            }
        })
    }


    return(
        <div id="register">
            
            <form onSubmit={onSubmitHandler}>
                <h2>회원가입</h2>
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler}/>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <label>Confirmed Password</label>
                <input type="password" value={confirmed} onChange={onConfirmedHandler}/>
                <button type="submit">회원가입</button>
            </form>
            
        </div>
    )
}

export default RegisterPage;