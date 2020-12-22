
import {useSelector} from 'react-redux';
import axios from 'axios';



function UserPage (props){


    const user = useSelector((state)=> state.user)
    console.log(user)

    const onClickHandler = () =>{
        axios.post('http://localhost:5000/api/users/logout',"",{withCredentials:true})
        .then(res => {
            if(res){
                console.log(res.data)
                props.history.push('/')
            }else{
                alert('Fail to logout')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="user">
            {
                user
                ? <h1> {user.email}블로그입니다</h1>
                : <h2>로그인이 되어있지 않습니다</h2>
            }
            
            <div>
             <button onClick={onClickHandler}
             >로그아웃</button>
            </div>
            
            
            
        </div>
    )
}

export default UserPage;