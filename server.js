const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors') 
const app = express()

app.use(cookieParser())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('public'))
}else{
    const corsOptions ={
        origin: "http://localhost:3000",
        methods:"GET,PUT,POST,DELETE",
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(express.json())

// Express Routing:
const toyRoutes = require('./api/toy/toy.controller')

app.use('/api/toy', toyRoutes)

app.get('/**', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030

app.listen(port, () => console.log('Server ready at port:', port))

