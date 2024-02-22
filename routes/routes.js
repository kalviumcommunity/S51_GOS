const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const patchRouter = express.Router();
const deleteRouter = express.Router();
const Senaker = require("./../models/senakers.model.js")


getRouter.get('/get', async (req, res) => {
    try {

        const senaker = await Senaker.find(); 
        
        res.status(200).json(senaker);

        
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.post('/post', async (req, res) => {
    try {
        const { SneakerID,Brand ,Model ,Type ,Color, Size,Price,SneakerURL,Availability } = req.body;
        const newsenaker = await Senaker.create({ SneakerID,Brand ,Model ,Type ,Color, Size,Price,SneakerURL,Availability }); 
        res.status(200).json(newsenaker);
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
});


patchRouter.patch('/patch/:SneakerID', async (req, res)=>{
    try {
        const { SneakerID } = req.params; 
        const deletedFields = req.body; 

        
        const deletedSneaker = await Senaker.findOneAndUpdate({ SneakerID: SneakerID }, deletedFields, { new: true });

        if (!deletedSneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        
        res.status(200).json(deletedSneaker);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})


deleteRouter.delete('/delete/:SneakerID', async (req, res)=>{
    try {
        const { SneakerID } = req.params; 
        const deletedFields = req.body; 

       
        const deletedSneaker = await Senaker.findOneAndDelete({ SneakerID: SneakerID }, deletedFields, { new: true });

        if (!deletedSneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        
        res.status(200).json(deletedSneaker);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})




module.exports = {getRouter, postRouter,patchRouter, deleteRouter}