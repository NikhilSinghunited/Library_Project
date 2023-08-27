const express=require('express')
const app=express()
var session=require('express-session')

const port=8080;
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'))
app.use(session({
    secret:'asdfgh',
    resave:'false',
    saveUninitialized:true,
}));

const {MongoClient}=require('mongodb');
const { type } = require('express/lib/response');
const url = 'mongodb://localhost:27017';
const db_name='sign';
// const newserver_2=new MongoClient(url);

const client=new MongoClient(url)
const sign=client.db(db_name)
// const bdb=newserver_2.db(db_name)
// const client2=new MongoClient(url)
// const book=client2.db(db_name2)

// to send index file on server-
app.get('/',(req,res)=>{
    res.sendFile("index.html")
})
// to fetch data of signup
app.post('/signup.html',async (req,res)=>{
    var name=' '
    var email=' '
    var password=' '
    name=req.body.name
    email=req.body.email
    password=req.body.password

    var dt={
        "name":name,
        "email":email,
     
        "password":password,
    }
    try{

        console.log("in try");
        var c=null;

      const userlogin = await sign.collection('data').findOne({email:email});
      console.log(userlogin+""+  typeof(userlogin))
      if(userlogin.email=== email){
        console.log(" Already existed");
      }
     }
    catch(error){
        sign.collection('data').insertOne(dt,function(err,collection){
            if(err) console.log(err)
            else console.log("Recorded inserted successfully")})
        res.status(400).send("Invalid login details");
    
    }



        
    
})
// Tofetch all the data from database-
app.get("/show",async(req,res) =>{
    console.log("print all data")
    sign.collection('data').find({}).toArray((err,result) => {
    for (var i = 0; i <result.length; i++) {
    console.log(result[i]);
    if (err)  throw err
    
   }
        })
          })
        
      
        //   for login=
        app.post('/login',async (req,res)=>{
            var e=' '
            var password=' '
            e=req.body.email
            password=req.body.password
            
           
               
                var c=null;
        
             const userlogin = await sign.collection('data').findOne({email:e});
              
              if(userlogin.email==e){
                req.session.email=e;
                
              } 
           
        });

        app.get('/login',async(req,res)=>{
            var loginuser= await sign.collection('data').findOne({email:email});
            if(req.session.email){
                res.redirect('./dashboard.html');
            }
            else{
                console.log("no user found");
            }
        })

app.listen(port,()=>{
    console.log(`http://localhost:8080`)
})
