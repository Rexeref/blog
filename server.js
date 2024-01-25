const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

// Dati del blog (esempio)
const posts = [
  { id:1, comments: [], title: `Gatti tecnici informatici?`, cover_image: null, content: `Immaginate un mondo in cui i gatti possono fare il lavoro di un tecnico informatico. Questo sarebbe un mondo molto diverso dal nostro, ma possiamo immaginare alcune possibili sfaccettature basate sulle abitudini naturali dei gatti e sui compiti tipici di un tecnico informatico. Prima di tutto, i gatti sono creature molto indipendenti. Potrebbero svolgere il loro lavoro in modo autonomo, senza la necessità di supervisione costante. Questo potrebbe rendere la loro presenza molto meno invasiva rispetto a quella di un tecnico umano 1. Secondo, i gatti sono molto agili e veloci. Potrebbero essere utilizzati per eseguire compiti che richiedono movimento rapido o precisione, come l'installazione di componenti hardware o la risoluzione di problemi software complessi. Inoltre, i gatti hanno un grande senso dell'udito. Potrebbero essere addestrati per riconoscere specifici segnali acustici che indicano la presenza di problemi tecnologici, permettendo così di intervenire tempestivamente. Infine, i gatti sono creature molto pettegole. Potrebbero essere addestrati per comunicare con gli esseri umani, fornendo feedback o segnalando eventuali problemi che potrebbero non essere immediatamente evidenti. Quindi, sebbene sia improbabile che un gatto possa sostituire completamente un tecnico informatico, potrebbe essere interessante considerare quali compiti potrebbero essere delegati a loro grazie alle loro abitudini naturali.` },
  { id:2, comments: [], title: `Hatsune Miku prossimo frontwoman dei Rammstein`, cover_image: null, content: `Hatsune Miku diventa la nuova frontwoman dei Rammstein. Questa idea è puramente speculativa e non basata su fatti reali, ma è certamente affascinante pensarci. Hatsune Miku è una popolare cantante virtuale giapponese, creata dalla società Crypton Future Media. È conosciuta per le sue capacità vocali avanzate e la sua ampia gamma di espressioni emotive, che la rendono ideale per una varietà di generi musicali. D'altra parte, i Rammstein sono una band tedesca di metal industriale conosciuta per la sua intensità e le sue performance viscerali. Il loro stile musicale e le loro performance live sarebbero un ottimo sfondo per le capacità vocali di Hatsune Miku. Se Hatsune Miku fosse a capo dei Rammstein, ciò potrebbe portare a un mix di suoni e stili musicali che va oltre i limiti tradizionali del metal. Le sue vocalizazioni avanzate e le sue capacità di espressione emotiva potrebbero dare alla band una nuova dimensione sonora. Inoltre, la popolarità di Hatsune Miku potrebbe aiutare a raggiungere un pubblico più ampio. Sebbene i Rammstein siano già molto popolari, l'aggiunta di Hatsune Miku potrebbe attirare nuovi fan e aumentare la loro base di appassionati.` },
  { id:3, comments: [], title: `Scoperta vera identità di Verga`, cover_image: null, content: `Ricordate "Verga", quel personaggio affascinante e misterioso che ha sempre suscitato la nostra curiosità? Bene, dopo mesi di indagini, abbiamo finalmente scoperto la vera identità di Verga. E non è quello che pensate... Verga, in realtà, non era né un personaggio di un film d'azione, né un famoso cantante pop. Era un autore italiano del XIX secolo, famoso per le sue opere che descrivono la vita rurale in Sicilia. Se non ti senti ancora più interessato, ascolta bene. Nato a Catania nel 1840, Verga è noto per aver fondato il movimento letterario del Verismo italiano. Le sue opere, come "I Malavoglia" e "Mastro Don Gesualdo", descrivono la lotta per la vita nelle varie classi sociali e la difficile transizione verso il progresso 1. Ma aspetta, non finisce qui. Verga era anche un pessimista, convinto che il mondo fosse immutabile e che potesse solo descriverlo così com'era, senza intervenire con commenti o giudizi 1. Nonostante tutte queste rivelazioni, la vera sorpresa arriva quando scopriamo che Verga aveva una strana passione per i pinguini. Si dice che avesse una collezione di pinguini di plastica, che aveva raccolto durante i suoi viaggi. Questa passione un po' insolita ha portato molti a credere erroneamente che Verga fosse un pinguino. Quindi, la prossima volta che vedrai una statua di un pinguino, ricorda che potrebbe essere una commemorazione a Verga, l'autore che ha scritto storie sulla vita rurale in Sicilia. E ora che sai la vera identità di Verga, puoi finalmente guardare i pinguini senza preoccuparti che stiano osservandoti.`},
  // Aggiungi altri post se necessario...
];

app.use(express.static('public'));

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
  res.render('admin',{ posts });
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
  res.redirect('/');
});

app.post('/comment/:id', (req, res) => {
  const { comment } = req.body;
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === postId);
  posts[index].comments.push(comment);
  console.log(posts[index].comments, comment);
  res.redirect('/posts/' + postId);
});

app.post('/admin/posts_add', (req, res) => {
  const { title, cover_image, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    comments : [],
    cover_image,
    content
  };
  posts.push(newPost);
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
  res.redirect('/admin');
});





app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});