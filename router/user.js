
const express = require('express');
const User = require('../model/user');

const router = express.Router()


//post
router.post('/users', (req, res) => {
    console.log(req.body);

    const users = new User(req.body)
    users.save()
        .then((user) => { res.status(200).send(user) })
        .catch((e) => { res.status(400).send(e) })
})

/////////////////////////////////////////////////////////

//get All
router.get('/users', (req, res) => {
    User.find({}).then((users) => { res.status(200).send(users) })
        .catch((e) => { res.status(500).send(e) })
})


///////////////////////////////////////////////////////////////////////

//get 1 2

router.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (user) {
            return res.status(200).send(user)
        } res.status(404).send('errooooooooooooooooooooor')
    }).catch((e) => { res.status(500).send(e)})
})

//////////////////////////////////////////////////////////////////////////
// router.get('/users/:email', (req, res) => {
//     const email = req.params.email
//     User.find(email).then((user) => {
//         if (user) {
//             return res.status(200).send(user)
//         } res.status(404).send('errooooooooooooooooooooor')
//     }).catch((e) => { res.status(500).send(e) })
// })

//////////////////////////////////////////////////////////////////////////

//patch

router.patch('/users/:id', async (req, res) => {

    try {
        const _id = req.params.id

        const updates = Object.keys (req.body)

        const user = await User.findById (_id)

        // const user = await User.findByIdAndUpdate(_id, req.body , {
        //     new: true,
        //     runValidators: true
        // })


        if(user){res.status(200).send(user)}


        updates.forEach((ele) => (user[ele] = req.body[ele]))

     
        await user.save()
 


        res.status(404).send('not fonnnddddd')
    }catch{(e)=>{res.status(500).send(e)}}

})


///////////////////////////////////////////////////////////////////

//delete

router.delete('/users/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(user){res.status(200).send(user) }
        res.status(404).send('can not reach')
    }catch{(e)=>{res.status(500).send(e)}}
})

///////////////////////////////////////////////////////////////

router.post('/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        
        res.status(200).send({user})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})








module.exports = router