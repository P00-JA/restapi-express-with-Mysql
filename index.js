const express = require('express');
const User = require('./models/User');
const sequelize = require('./database');
const app = express();
const PORT = 3000

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hi World"})
});
//sync program with database
sequelize.sync({force:false}).then(()=>{
    console.log('All models are synchronized successfully');
}).catch(error => {
   console.log('error occurred during model synchronization');
});

//get all users
app.get('/users',async(req,res)=>{
    const users = await User.findAll();
    res.json(users);
});

//Add a user 
app.post('/users',async(req,res)=>{
    try{
    const {name , email} = req.body;
    console.log(req.body);
    const newUser = await User.create({ id,name, email});
    console.log(newUser);
    res.json(newUser);
    }catch(err){
        console.log(err)
    }
});

app.put('/users/:id',async(req,res)=>{
    const {name, email }=req.body;
    const user = await User.findByPk(req.params.id);
    if(user){
        user.name = name;
        user.email = email;
        await user.save();
        res.json(user);
    }else{
        res.status(404).send("User not found");
    }
});

app.delete('/users/:id',async(req,res)=>{
    const user = await User.findByPk(req.params.id);
    if(user){
        await user.destroy();
        res.status(204).send("user deleted successfully")
    }else{
        res.status(404).send('user not found');
    }
});

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
});