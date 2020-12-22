import axios from 'axios';
import { useEffect } from 'react';




function LandingPage(){

    useEffect(()=>{
        axios.get('http://localhost:5000/api/hello')
        .then((res)=>{console.log(res.data)})
        .catch(err => console.log(err))
    },[])


    return(
        <div style={{
            display : 'flex',
            justifyContent :'center', height : '100vh',
            alignItems : 'center', width: '100%'
        }}>
            
        </div>
    )
}

export default LandingPage;