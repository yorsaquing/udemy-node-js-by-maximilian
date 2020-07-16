const fs = require('fs')

const requestHandler = (req, res) => {
    let body = `<h1>My React</h1>`
    const { method, url } = req

    if (url === '/') {
        body += `<form action="/message" method="POST">
            <input type="text" name="message" />
            <button type="submit">Send</button>
        </form>`
    }

    if (url === '/message' && method === "POST") {
        const dataChunks = []
        // execute the callback for every changes on "data"
        req.on('data', (chunk) => {
            console.log(chunk)
            dataChunks.push(chunk)
        })
        // execute once all the incoming requests are completed
        return req.on('end', () => {
            const parsedBody = Buffer.concat(dataChunks).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                if (err) { throw new Error(err) }
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }

    let template = `
        <html>
            <head><title>Node.js Course</title></head>
            <body>${body}</body>
        </html>
    `

    res.setHeader('Content-Type', 'text/html')
    res.write(template);
    res.end()
}

module.exports = requestHandler

// module.exports = {
//     key: value
// }
// module.exports.key = valu
// module.key = value