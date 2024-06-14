const Post = require("../../models/Post");

var router = require("express").Router();

// @AssetPlus: This is a sample get request
router.get("/", async (req, res) => {
    var posts = await Post.find();
    return res.send(posts);
});

// @AssetPlus: Add other routes here
router.post("/add", async(req,res)=>{
    try{
        const {title, description, posterData} = req.body;
        if(!title || !posterData){
            return res.status(400).json({ message: 'Title and image are required' });
        }

        const poster = new Post({
            title: title,
            description: description,
            poster: posterData,
            createdBy: 'Admin',
            updatedBy: 'Admin',
        });

        await poster.save();
        res.status(201).json(poster);


    }catch(err){
        console.log("Error in creating poster", err);
        return res.status(400).json({message: "Error in creating poster"});
    }
})

router.get('/poster', async(req,res)=>{
    const {page = 1, limit = 4} = req.query;
    try {

        const totalCount = await Post.countDocuments({});
        const posts = await Post.find()
                        .skip((page - 1) * limit)
                        .limit(parseInt(limit))
                        .lean(); 
                  

                        const response = {
                            totalPages:totalCount,
                            posts: posts
                        };
        return res.status(200).json(response);
    } catch (err) {
        console.log("Error in fetching posters", err);
    }
});

// router.put("/update")

module.exports = router;