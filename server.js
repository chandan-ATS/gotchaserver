const express = require('express');
const Datastore = require('nedb');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const url = require('url');
// const { response } = require('express');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// var clientResponseRef;
// app.get('/*', (req, res) => {
//   var pathname = url.parse(req.url).pathname

//   var obj = {
//     pathname: pathname,
//     method: "get",
//     params: req.query
//   }

//   io.emit("page-request", obj);
//   clientResponseRef = res;
// })

// app.post('/*', (req, res) => {
//   var pathname = url.parse(req.url).pathname

//   var obj = {
//     pathname: pathname,
//     method: "post",
//     params: req.body
//   }

//   io.emit("page-request", obj);
//   clientResponseRef = res;
// })

// io.on('connection', (socket) => {
//   console.log('A node connection');
//   socket.on("page-response", (response) => {
//     clientResponseRef.send(response);
//   })
// })

// http.listen(8000, () => {
//   console.log("server running in 8000")
// })

app.listen(8000, () => {
  // var host = server.address().address;  
  // var port = server.address().port;  
  console.log('Example app listening at 8000');
});

const database = new Datastore('database.db')
database.loadDatabase();
//database.insert({ name: 'Ajay', role:'Admin'})

app.post('/bookappointment', (req, res) => {
  console.log('Got a booking', req);
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data)
  res.json({
    status: 'Success',
    name: data.name,
    role: data.role,
    timestamp: data.timestamp
  })
})

app.get('/bookedappointments', (req, res) => {  
  const response = {  
         first_name:'Ajay',  
         last_name:'Chandan'  
     };  
     console.log(response);  
     res.end(JSON.stringify(response));  
  })  

// app.get('/bookedappointments', (req, res) => {
//   console.log('Get a booking', req);
//   const data = req.body;
//   const timestamp = Date.now();
//   data.timestamp = timestamp;
//   database.insert(data)
//   res.json({
//     status: 'Success',
//     name: data.name,
//     role: data.role,
//     timestamp: data.timestamp
//   })
// })