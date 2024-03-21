const Post = require("./../models/Post");
exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then((result) => {
      res.json({ haha: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postPost = (req, res, next) => {
  console.log(req.user.getPosts());
  req.user
    .createPost({
      desc: req.body.desc,
      imgUrl: req.body.imgUrl,
    })
    .then((r) => {
      res.json(r);
    })
    .catch((err) => console.log(err));
};
exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  Post.findByPk(productId)
    .then((result) => {
      res.json({ haha: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.updatePost = (req, res) => {
  const postId = req.body.id;
  const desc = req.body.desc;
  Post.findByPk(postId)
    .then((post) => {
      post.desc = desc;
      post.imgUrl ? (post.imgUrl = imgUrl) : "";
      return post.save();
    })
    .then(() => {
      res.json("update suces");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deletePost = (req, res) => {
  const postId = req.body.id;
  Post.findByPk(postId)
    .then((post) => {
      return post.destroy();
    })
    .then(() => {
      res.json("delete suces");
    })
    .catch((err) => {
      console.log(err);
    });
};
