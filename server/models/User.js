const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 20
    },
    email : {
        type : String,
        trim : true, // 빈칸을 없애줌
        unique : 1
    },
    password : {
        type : String,
        minlength : 8
    },
    lastname : {
        type : String,
        maxlength : 20
    },
    role: {
        type : Number,
        default : 0
    },
    token:{
        type : String
    },
    tokenExp :{
        type : Number
    } 

})

//몽고DB에 저장하기 전에 무엇을 실행 시킴.
userSchema.pre('save',function(next){

    var user = this


    if(user.isModified('password')){
        //패스워드가 변환 될때만, 실행되는 함수
        //비밀번호를 암호화시킴.
        bcrypt.genSalt(saltRounds,function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err)
                user.password = hash
                //암호화 하는데 성공하면 패스워드를 hash로 변경해줌
                next()
            } )
            //패스워드 가져옴
        })
    }else{
        next()//끝나면 next()함수를 실행해서 내용을 보냄
    }
    
})


userSchema.methods.comparePassword = function(plainPassword, callback){
    //그냥비밀번호랑, 암호화된 비빌번호랑 비교해야 함.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err)
        callback(null, isMatch)//isMatch가 true임.
    })
}

userSchema.methods.generateToken = function(callback){
    
    var user = this;
    //jsonwebToken을 이용해서 Token을 생성하기
    //user._id는 데이터베이스에서 확인할 수 있음
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //위의 매개변수가 합쳐져서 토큰이 만들어짐

    user.token = token
    user.save(function(err){
        if(err) return callback(err)
        callback(null, user)
        //첫번째 매개변수자리가 에러 자리임.
    })
}



userSchema.statics.findByToken = function(token, callback){
  var user = this;

    //토큰을 decode 한다.
  jwt.verify(token, 'secretToken', function(err, decoded){
      //secretToken + user._id = token
      // 유저 아이디를 이용해서 유저를 찾은 다음
      // 클라이언트에서 가져온 token과 DB 보관 내용이 일치하는 지 확인

    user.findOne({"_id": decoded, "token": token}, 
    function(err,user){
        if(err) return callback(err);
        callback(null, user)
    })

  })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}