const http = require("http");
const fs = require("fs");
const path = require("path");
const getPost = (async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    fs.writeFile(path.resolve(__dirname, '1.json'), JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            throw err;
        }
    })
    console.log("done")
    return data;
})
http
    .createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html;  charset=utf-8');
        if (req.url === '/posts') {
            getPost()
            res.write('aaaa')
        }
        res.end()
    })
    .listen(3000)

