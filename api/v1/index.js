const express = require('express');
const router = new express.Router();
const BlogPost = require('../models/blogpost');
router.get('/ping', (req, res) => {
	res.status(200).json({msg: 'pong', date: new Date()});
});

router.get('/blog-posts', (req, res) => {
	BlogPost.find().sort({
		'createdOn': -1
	}).exec()
	.then(
		blogPosts => res.status(200).json(blogPosts)
		.catch(err => res.status(500).json({
			message: "blogpost introuvable",
			error: err
		})));

});

router.post('/blog-posts', (req, res)=>{
	console.log('req.body', req.body);
	const blogPost = new BlogPost(req.body);
	blogPost.save(  
		(err, blogPost) => {
			if(err){
				return res.status(500).json(err);
			} 
			res.status(201).json(blogPost);
		}
	); 
});

router.get('/blog-posts/:id', (req, res) => {
	const id = req.params.id;
	BlogPost.findById(id)
	.then(blogpost => res.status(200).json(blogpost))
	.catch(err => res.status(500).json(
		{
			message : 'blog post with this id : ' + id + 'not found',
			erreur: err,
		}));
})

router.delete('/blog-posts/:id', (req, res) => {
	const id = req.params.id;
	BlogPost.findByIdAndDelete(id, (err, blogpost)=> {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(202).json({msg : ` blog post with id  ${blogpost._id}  deleted `})
	})
})


module.exports = router;