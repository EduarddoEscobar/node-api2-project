// implement your posts router here
const { Router } = require('express');
const router = Router();
const posts = require('./posts-model');

router.get('/', (req, res) => {
    posts.find()
        .then(post => {
            res.status(200).json(post);
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: "The posts information could not be retrieved"});
        })
    
})

router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post);
            }else{
                res.status(404).json({ message: 'The post with the specified ID does not exist'});
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: "The post information could not be retrieved"});
        })
    
})

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(title && contents){
        posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            }).catch(err => {
                console.error(err);
                res.status(500).json({message: "There was an error while saving the post to the database"});
            })
    }else{
        res.status(400).json({message: "Please provide title and contents for the post"});
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    if(title && contents){
        posts.update(id, req.body)
            .then(post => {
                if(post){
                    res.status(200).json(post)
                }else{
                    res.status(404).json({message: "The post with the specified ID does not exist"})
                }
            }).catch(err => {
                console.error(err);
                res.status(500).json({message: "The post information could not be modified"});
            })
    }else{
        res.status(400).json({message: "Please provide title and contents for the post"})
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    posts.delete(id)
        .then(post => {
            if(post){
                res.status(200).json(post);
            }else{
                res.status(404).json({message: "The post with the specified ID does not"});
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: "The post could not be removed"});
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    posts.findPostComments(id)
        .then(comments => {
            if(comments){
                res.status(200).json(comments);
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist"});
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: "The comments information could not be retrieved"});
        })
})

module.exports = router;