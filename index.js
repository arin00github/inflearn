const express = require('express')
const app = express()
const port = 5000;
const moogoose = require('mongoose')
const config = require('./server/config/key');
const cookiePaser = require('cookie-parser');
const {auth} = require('./server/middleware/auth');
const {User} = require('./server/models/User');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOption = {
    origin : 'http://localhost:3000',
    credentials : true,
}

app.use(cors(corsOption))

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json());

app.use(cookiePaser());

moogoose.connect(config.mongoURI, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=> console.log('MongoDB Connected')).catch(err=> console.log(err))

app.get('/',(req,res)=> res.send('Hello World'));




app.post('/api/register',(req,res)=>{
    const user = new User(req.body)

    user.save((err,doc)=>{
        if(err)return res.json({ success:false, err})
        return res.status(200).json({success:true})
    })
})


app.get('/api/hello',(req,res)=>{
    res.send("안녕하세요")
})




app.post('/api/users/login',(req, res)=>{
    
    User.findOne({email:req.body.email}, (err,user)=>{
        if(!user){
            return res.json({loginSuccess : false, message: "해당하는 유저가 없습니다."})
        }

        user.comparePassword(req.body.password, (err,isMatch)=>{
            if(!isMatch){
                return res.json({
                    loginSuccess :false,
                    message : "비밀번호가 일치하지 않습니다."
                })
            }
            

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err)

                res.cookie('x_auth',user.token).status(200)
                .json(
                    {loginSuccess:true,
                     userData : user,
                     userId : user._id
                    })
            })
        })
    })
})


app.get('/api/users/auth',auth ,(req, res)=>{
    //콜백함수 실행 전에 auth 실행
    //여기까지 오면 미들웨어 통과 했다는 이야기
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth:true,
        email: req.user.email,
        name : req.user.name,
        role:req.user.role
    }) //성공하면 정보를 이렇게 표현 


})

app.post('/api/users/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id: req.user._id}, 
        {token : ""}, (err, user)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).send({success:true})
        })
})




// app.get('/api/hello', (req,res)=>{
//     res.send("hello design")
// })

 app.listen(port, ()=> console.log(`Example app listening in port ${port}`))