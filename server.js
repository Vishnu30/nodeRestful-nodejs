var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect('mongodb://localhost/api/products');

var ProductSchema = mongoose.Schema({
	name:String,
	sku:String,
	price:Number
});
var Products= restful.model('products',ProductSchema);
Products.methods(['get','post','put','delete']);
Products.register(app,'/api/products');

app.listen(3000);
console.log('server is running at port 3000');
