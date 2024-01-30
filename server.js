const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const FileSystem = require("fs");

app.set('view engine', 'pug');
app.set('views', './views');

// Configurazione di multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage }).single('cover_image');

// File posts
async function savePosts() {
  FileSystem.writeFile('posts.json', JSON.stringify(posts), (error) => {
    if (error) throw error;
  });
}

async function readPosts() {
  FileSystem.readFile('posts.json', 'utf8', (err, data) => {
    if (err) {
      FileSystem.writeFile('posts.json', JSON.stringify(posts), (error) => {
        if (error) throw error;
      });
    } else {
      // parse JSON string to JSON object
      const jsonData = JSON.parse(data);
      posts = jsonData;
    }
  });
}

let posts = [];
readPosts();

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render('post', { post });
});

app.get('/admin', (req, res) => {
  res.render('admin', { posts });
});

app.get('/admin/modify/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render('mod-post', { post });
});

app.post('/admin/posts_modify/:id', (req, res) => {
  const { title, content } = req.body;
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === postId);
  posts[index].title = title;
  posts[index].content = content;
  savePosts();
  res.redirect('/');
});

app.post('/comment/:id', (req, res) => {
  const { comment } = req.body;
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === postId);
  posts[index].comments.push(comment);
  res.redirect('/posts/' + postId);
});

app.post('/admin/posts_add', upload, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    comments: [],
    cover_image: req.file ? req.file.filename : null,
    content
  };

  posts.unshift(newPost);
  savePosts();
  res.redirect('/');
});

app.get('/admin/new', (req, res) => {
  res.render('add-post');
});

app.get('/admin/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }
  savePosts();
  res.redirect('/admin');
});

app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});