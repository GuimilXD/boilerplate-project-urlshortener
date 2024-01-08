require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

const URLs = []

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(_req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/shorturl/:surl', (req, res) => {
    const { surl } = req.params

    if (isNaN(surl)) {
        res.json({
            error: "Wrong format"
        })
        return
    }

    const url = URLs.at(parseInt(surl))

    if (!url) {
        res.json({
            error: "No short URL found for the given input"
        })

        return
    }

    res.redirect(url)
})

app.post('/api/shorturl', async (req, res) => {
    const { url } = req.body

    try {
        const urlObj = new URL(url)
        await dns.promises.lookup(urlObj)
    } catch {
        res.json({
            error: "invalid url",
        })
        return
    }

    const new_length = URLs.push(url)

    res.json({
        original_url: url,
        short_url: new_length - 1
    })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
