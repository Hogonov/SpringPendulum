const express = require('express')
const app = express()

const  PORT = process.env.PORT || 80

app.use('/public', express.static("client/public"))

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`)
})

app.listen(PORT, () => {
    try {
        console.log(`Server has been started on port ${PORT}...`)
    } catch (e) {
        console.log('Server Error: ', e);
        process.exit(1)
    }
})