const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const path = require("path") // modulo padrão para manipulação de diretorios
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const flash = require("connect-flash")


// configurations
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// tudo que for app.user se refere a configurações de Midllewares
// session
//   app.use(session({
//     secret: "bcrypt",// password
//     resave: true,
//     saveUminitialized: true
//   }))
//   app.use(flash())

//   // middleware -> chamando antes de todo request
//   app.use((req, res, next)=>{
//     //Criando variaveis globais
//     // console.log("Middleware executado");
//     res.locals.bcrypt_msg_isHash = req.flash("bcrypt_msg_isHash"),
//     next(); // liberar a aplicação
//   })

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// bootstrap
//Public
app.use(express.static(path.join(__dirname, "public")))

// routers
app.get("/", function(req, res) {
    res.render("bcrypts/bcrypt")
})

app.post("/bcrypt/comparebleHash", function(req, res) {
    var wordCompareble = req.body.wordCompareble
    var hashComparable = req.body.hashComparable

    bcrypt.compare(wordCompareble, hashComparable, (err, isHash) => {
        // if(isHash){
        //     req.flash("bcrypt_msg_isHash", "Success hash")        
        // }else{
        //     req.flash("bcrypt_msg_isHash", "Invalid hash")        
        // }
        if (isHash) {
            res.render("bcrypts/bcrypt", { isHash: true, wordCompareble, hashComparable })
        } else {
            res.render("bcrypts/bcrypt", { isNotHash: true })
        }
    })
})

app.post("/bcrypt/generatorHash", function(req, res) {

    var wordGenerator = req.body.generatorWord
        // var salt = req.body.generatorSalt

    bcrypt.hash(wordGenerator, 2, (err, hash) => {
        res.render("bcrypts/bcrypt", { hash: hash, generatorWord: wordGenerator })
        console.log(hash)
    });
})

app.get("/about", (req, res) => {
    res.render("about")
})
const PORT = process.env.PORT || 8089
app.listen(PORT, function(req, res) {
    console.log("Running server http://localhost:" + PORT);
})