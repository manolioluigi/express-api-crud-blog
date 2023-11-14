const posts = require('../posts.json');

//index
function index(req, res) {
    const postList = posts.map(post => `
        <li>
            <button>
                <a href="/posts/${post.slug}/download">Scarica</a>
            </button>
            <a href="/posts/${post.slug}">${post.title}</a>
        </li>
    `).join('');
    const html = `
            <h1>Lista dei Post</h1>
            <ul>${postList}</ul>
            <button>
                <a href="/posts/create">Crea un nuovo post</a><br>
            </button>
        `;
    res.send(html);

}

//show
function show(req, res) {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    console.log('Requested Slug:', slug);
    console.log('Matching Post:', post);

    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post non trovato');
    }
}

//create
function create(req, res) {
    res.format({
        html: () => {
            const html = '<h1>Creazione nuovo post</h1>';
            res.send(html);
        },
        default: () => {
            res.status(406).send('Not Acceptable');
        },
    });
}

//download 
function download(req, res) {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    if (post) {
        const imagePath = `public/imgs/posts/${post.image}`;
        res.download(imagePath, post.image);
    } else {
        res.status(404).send('Post non trovato');
    }
}

//store
function store(req, res) {

    const { title, content, image, tags } = req.body;

    const newPost = {
        title,
        content,
        image,
        tags,
        slug: generateSlug(title),
    };

    posts.push(newPost);

    if (req.accepts('html')) {
        res.redirect('/');
    } else {
        res.json(newPost);
    }
}


//funzioni utilities
function generateSlug(title) {
    const trimmedTitle = title.trim();
    const slug = trimmedTitle.replace(/\s+/g, '-');
    const lowercaseSlug = slug.toLowerCase();
    return lowercaseSlug;
}

module.exports = {
    index,
    show,
    create,
    download,
    store,
};