const Express = require('express')
const app = new Express()
const port = process.env.PORT || 8080

// middleware to serve contents of the public folder.
app.use(Express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.redirect('/process.html')
})

app.listen(port)