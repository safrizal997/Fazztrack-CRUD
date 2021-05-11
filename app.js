const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fazztrack'
})


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    connection.query('select * from produk', (err, result) => {
        res.render('index.ejs', { products: result });
    });

});


app.post('/insert', (req, res) => {
    const request = req.body;
    connection.query(
        'insert into produk (nama_produk, keterangan, harga, jumlah) values (?,?,?,?)',
        [request.namaProduk, request.keterangan, request.harga, request.jumlah],
        (err, result) => {
            res.redirect('/')
        }
    );
});

app.get('/edit/:id', (req, res) => {
    connection.query(
        'select * from produk where id = ?',
        [req.params.id],
        (error, results) => {
            if (results.length > 0)
                res.render('update.ejs', { product: results[0] });
        }
    );
});

app.post('/update/:id', (req, res) => {
    const request = req.body;
    connection.query(
        'update produk set nama_produk = ?, keterangan = ?, harga = ?, jumlah = ? where id = ?',
        [request.namaProduk, request.keterangan, request.harga, request.jumlah, req.params.id],
        (error, results)=>{
            res.redirect('/');
    });
});
    
app.post('/delete/:id', (req, res) => {
        connection.query(
            'delete from produk where id=?', [req.params.id],
            (err, result) => {
                res.redirect('/');
        });
});    
    
const port = 3000;
    app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
})