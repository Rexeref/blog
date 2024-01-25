const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

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

// Dati del blog (esempio)
const posts = [
  { id: 1, 
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'], 
    title: `Gatti tecnici informatici?`, 
    cover_image: 'gattino.jfif', 
    content: `Immaginate un mondo in cui i gatti possono fare il lavoro di un tecnico informatico. Questo sarebbe un mondo molto diverso dal nostro, ma possiamo immaginare alcune possibili sfaccettature basate sulle abitudini naturali dei gatti e sui compiti tipici di un tecnico informatico. Prima di tutto, i gatti sono creature molto indipendenti. Potrebbero svolgere il loro lavoro in modo autonomo, senza la necessità di supervisione costante. Questo potrebbe rendere la loro presenza molto meno invasiva rispetto a quella di un tecnico umano 1. Secondo, i gatti sono molto agili e veloci. Potrebbero essere utilizzati per eseguire compiti che richiedono movimento rapido o precisione, come l'installazione di componenti hardware o la risoluzione di problemi software complessi. Inoltre, i gatti hanno un grande senso dell'udito. Potrebbero essere addestrati per riconoscere specifici segnali acustici che indicano la presenza di problemi tecnologici, permettendo così di intervenire tempestivamente. Infine, i gatti sono creature molto pettegole. Potrebbero essere addestrati per comunicare con gli esseri umani, fornendo feedback o segnalando eventuali problemi che potrebbero non essere immediatamente evidenti. Quindi, sebbene sia improbabile che un gatto possa sostituire completamente un tecnico informatico, potrebbe essere interessante considerare quali compiti potrebbero essere delegati a loro grazie alle loro abitudini naturali.` 
  },
  { id: 2, 
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'], 
    title: `Hatsune Miku prossimo frontwoman dei Rammstein`, 
    cover_image: 'metal.jpg', 
    content: `Hatsune Miku diventa la nuova frontwoman dei Rammstein. Questa idea è puramente speculativa e non basata su fatti reali, ma è certamente affascinante pensarci. Hatsune Miku è una popolare cantante virtuale giapponese, creata dalla società Crypton Future Media. È conosciuta per le sue capacità vocali avanzate e la sua ampia gamma di espressioni emotive, che la rendono ideale per una varietà di generi musicali. D'altra parte, i Rammstein sono una band tedesca di metal industriale conosciuta per la sua intensità e le sue performance viscerali. Il loro stile musicale e le loro performance live sarebbero un ottimo sfondo per le capacità vocali di Hatsune Miku. Se Hatsune Miku fosse a capo dei Rammstein, ciò potrebbe portare a un mix di suoni e stili musicali che va oltre i limiti tradizionali del metal. Le sue vocalizazioni avanzate e le sue capacità di espressione emotiva potrebbero dare alla band una nuova dimensione sonora. Inoltre, la popolarità di Hatsune Miku potrebbe aiutare a raggiungere un pubblico più ampio. Sebbene i Rammstein siano già molto popolari, l'aggiunta di Hatsune Miku potrebbe attirare nuovi fan e aumentare la loro base di appassionati.` 
  },
  { id: 3, 
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'], 
    title: `Scoperta vera identità di Verga`, 
    cover_image: 'verga.jpg', 
    content: `Ricordate "Verga", quel personaggio affascinante e misterioso che ha sempre suscitato la nostra curiosità? Bene, dopo mesi di indagini, abbiamo finalmente scoperto la vera identità di Verga. E non è quello che pensate... Verga, in realtà, non era né un personaggio di un film d'azione, né un famoso cantante pop. Era un autore italiano del XIX secolo, famoso per le sue opere che descrivono la vita rurale in Sicilia. Se non ti senti ancora più interessato, ascolta bene. Nato a Catania nel 1840, Verga è noto per aver fondato il movimento letterario del Verismo italiano. Le sue opere, come "I Malavoglia" e "Mastro Don Gesualdo", descrivono la lotta per la vita nelle varie classi sociali e la difficile transizione verso il progresso 1. Ma aspetta, non finisce qui. Verga era anche un pessimista, convinto che il mondo fosse immutabile e che potesse solo descriverlo così com'era, senza intervenire con commenti o giudizi 1. Nonostante tutte queste rivelazioni, la vera sorpresa arriva quando scopriamo che Verga aveva una strana passione per i pinguini. Si dice che avesse una collezione di pinguini di plastica, che aveva raccolto durante i suoi viaggi. Questa passione un po' insolita ha portato molti a credere erroneamente che Verga fosse un pinguino. Quindi, la prossima volta che vedrai una statua di un pinguino, ricorda che potrebbe essere una commemorazione a Verga, l'autore che ha scritto storie sulla vita rurale in Sicilia. E ora che sai la vera identità di Verga, puoi finalmente guardare i pinguini senza preoccuparti che stiano osservandoti.` 
  },
  {
    id: 4,
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'],
    title: `Il mio gatto e il suo telefono`,
    cover_image: 'telefono.jpg',
    content: `Immaginate un giorno di routine. Svegliati, prenditi una tazza di caffè, poi si siedi al computer. Il tuo gatto entra nella stanza, guarda il tuo schermo, e poi... prende il telefono! Sì, hai letto bene. Il tuo gatto sta cercando di prendere il tuo telefono. Non è una battaglia quotidiana, ma è un momento che rende la vita con un gatto un po' più interessante. Potrebbe sembrare assurdo, ma è un esempio di come i gatti possono rendere la vita più divertente.`
   },
   {
    id: 5,
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'],
    title: `Come ho imparato a cucinare con i miei scarafaggi`,
    cover_image: 'scarafaggi.jpg',
    content: `Hai mai avuto l'esperienza di avere scarafaggi nel tuo cibo? No, non è un modo gradevole per scoprire che hai mangiato insetti. Ma cosa succede se decidi di trasformare questa esperienza in un'occasione di cucina? Immagina di preparare un piatto con scarafaggi. Non è un'idea comune, ma può essere un modo per combattere l'infestazione di scarafaggi. Potresti scoprire che i scarafaggi hanno un sapore dolce e leggermente croccante. Nonostante l'aspetto poco attraente, potrebbe essere un modo unico per sperimentare nuovi ingredienti culinari.`
   },
   {
    id: 6,
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'],
    title: `L'importanza della buona igiene dentale per i gatti`,
    cover_image: 'dentista.jpg',
    content: `Le buone abitudini igieniche sono importanti per tutti, inclusi i gatti. I gatti, infatti, hanno bisogno di pulizia dentale regolare per mantenere la salute dei loro denti e delle loro gengive. Tuttavia, i gatti sono creature molto indipendenti e spesso non amano essere trattati come bambini. Quindi, come si può fare per convincere un gatto a pulirsi i denti? Un'opzione potrebbe essere offrire una torta di pollo come premio. I gatti amano il pollo, quindi potrebbero essere più propensi a pulirsi i denti per ottenere la loro bella torta.`
   },
   {
    id: 7,
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'],
    title: `L'arte di mangiare pane in un secondo`,
    cover_image: 'pane.jpg',
    content: `L'arte di mangiare pane in un secondo è un'abilità che molte persone non riescono a padroneggiare. Tuttavia, chi può farlo in un secondo potrebbe avere una serie di vantaggi. Per esempio, potrebbe risparmiare tempo a colazione, evitare di bruciare il pane o potrebbe semplicemente avere un senso del ritmo. Ma come si fa? Ecco alcuni suggerimenti per coloro che vogliono migliorare le loro abilità di mangiare pane in un secondo. Pratica, pratica, pratica. Quanto più lo fai, tanto più velocemente sarai in grado di mangiare pane in un secondo. Potrebbe sembrare semplice, ma la maggior parte delle persone non riesce a farlo in un secondo. Quindi, la prossima volta che ti trovi a mangiare pane, prova a fare lo stesso. Potrebbe sembrare difficile all'inizio, ma con la pratica diventerà secondaria.`
   },
   {
    id: 8,
    comments: ["Fantastico!", 'non ci avevo mai pensato', 'incredibile', 'Avrei voluto saperlo prima'],
    title: `I vantaggi di avere un nome difficile da pronunciare`,
    cover_image: 'nome.jpg',
    content: `Avere un nome difficile da pronunciare può sembrare un handicap, ma ci sono alcuni vantaggi che potrebbe avere. Per esempio, ogni volta che qualcuno pronuncia il tuo nome sbagliato, avrai l'opportunità di correggerlo. Questo significa che potrai migliorare le tue abilità linguistiche e di comunicazione. Inoltre, potresti avere la possibilità di fare battute divertenti o di creare situazioni imbarazzanti per gli altri. Ad esempio, potresti dire "Sono un grande fan di ..." e poi lasciare che la persona faccia un'ipotesi. Quando la persona pronuncia il tuo nome sbagliato, potrai ridere divertito. Quindi, nonostante i tuoi nomi possano sembrare complicati, potrebbero avere dei vantaggi nascosti.`
   }   
];

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