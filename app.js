//requiring packages
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();

//setting up port
app.listen(3000,()=>{
    console.log('server successfully running on port 3000');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//connecting to server and making schema
mongoose.connect("mongodb://localhost:27017/assigDB", { useNewUrlParser: true });
 
//user schema
const userSchema={
username:String,
password:String
};

// vendor schema
const vendorSchema={
    mobile:Number,
    password:String
    };
//items
const itemSchema={
  title:String,
  description:String,
  price:Number
};


const userModel=mongoose.model('User',userSchema);
const vendorModel=mongoose.model('Vendor',vendorSchema);
const itemModel=mongoose.model('Item',itemSchema); 

//User Registration routes(GET AND POST)
app.route('/user/register')
.get((req,res)=>{
    res.render('userRegistration.ejs');
})
.post((req,res)=>{
const userInformation= new userModel({
    username:req.body.username,
    password:req.body.password

});
userInformation.save((err)=>{
    if(err) console.log(err);
    else{
        console.log(res.statusCode);
        console.log("successfully saved");
    }
});
});



//vendor  routes(GET AND POST)
app.route('/vendor/register')
.get((req,res)=>{
    res.render('shopkeeperRegistration.ejs');
})
.post((req,res)=>{
const vendorInformation= new vendorModel({
    mobile:req.body.mobile,
    password:req.body.password

});
vendorInformation.save((err)=>{
    if(err) console.log(err);
    else{
        console.log(res.statusCode);
        console.log("successfully saved");
    }
});
});
   

// user Login
app.route('/user/login')
.get((req,res)=>{
    res.render('userLogin')
})
.post((req,res)=>{
   userModel.findOne({username:req.body.username},(err,result)=>{
       if(err) console.log(err);
       else{
           if(result){
           if(result.password===req.body.password){
            res.send("logged in");
           }
           else{
               res.send('invalid credentials');
           }
        }
        else{
            res.send('invalid credentials');
        }
       }
   })
})


//Shopkeeper login
app.route('/vendor/login')
.get((req,res)=>{
    res.render('shopkeeperLogin')
})
.post((req,res)=>{
   vendorModel.findOne({mobile:req.body.mobile,password:req.body.password},(err,result)=>{
       if(err) console.log(err);
       
       else {
           if(result){
            res.send("logged in");
           }
           else
           res.send('invalid credentials');
       }
   })
})

app.route('/vendor/list')
.get((req,res)=>{
const item1= new itemModel({
    title:'Shoes',
    description:'Comfortable with affordable price',
    price:1000

});
const item2= new itemModel({
    title:'Mobile phone',
    description:'long battery life',
    price:5000

});
const item3= new itemModel({
    title:'ear-phone',
    description:'Awesome noise cancellation',
    price:3000

});
//itemModel.insertMany([item1,item2,item3]);
itemModel.find({},(err,result)=>{
    if(err) console.log(err);
    else{
        res.send(JSON.stringify(result));
    }
})

//items.save();   
});