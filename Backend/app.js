const express=require('express')
const app=express()
const port=8080;
var bodyParser=require("body-parser");
const {MongoClient}=require('mongodb');
const url = 'mongodb://localhost:27017';
const db_name='sign';
const db_name2='book';

const client=new MongoClient(url)
const sign=client.db(db_name)
const client2=new MongoClient(url)
const book=client2.db(db_name2)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.send("index.html")
})
app.post('/admin.html',async (req,res)=>{
    var name=' '
    var password=' '
    name=req.body.name
    password=req.body.password

    var dt={
        name:"name",
     
        "password":password,
    }
    sign.collection('data').insertOne(dt,function(err,collection){
        if(err) console.log(err)
        else console.log("Record Inserted Succesfully.")})

     
    })
    let tasks=[   ]
    app.get('/show',(req, res) =>{
        let tasklist=tasks.map(t=> `<tr><td>${t}</td><td>${t}</td></tr>`)
        res.sendFile(__dirname +'show.html')
    })
    app.post('/show.html',async(req,res) =>{

        
        var imgname=' '
        var bookd=' '
          var imgname= req.body.imgname
          var bookd=req.body.bookd
         
         
          if(imgname === undefined){
            
    
          }
    
          else{
          var td={
              "imgname":imgname,
           
              "bookd":bookd,
          }
          
            
    
        
           
       
    
          book.collection('data2').insertMany(td,function(err,collection){
            if(err) console.log(err)
            else console.log("Record Inserted Succesfully.")})
          }
          for (var i = 0; i <result.length; i++) {
            console.log(result[i])
             str=str+str1+result[i].imgname+str2+result[i].bookd+str3;
             console.log(str)
          }
         if (err)  throw err
            str=str+"</div>"
           //str=str+str1+result[i].bname+str2+result[i].sno+str3;
            res.send(str)
    
          })
     
            
      


app.listen(port,()=>{
    console.log(`http://localhost:8080`)
})
