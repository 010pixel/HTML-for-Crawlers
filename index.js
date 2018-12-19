'use strict';

const express = require("express");
const crawler = require("./crawl_page.js");

const app = express();

app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001);

app.route( "*" )
	.get(async function ( req, res ) {
		if ( req.url == "/favicon.ico" ) return res.end("no data.");
		let url = req.originalUrl;
		const pageHtml = await crawler.getCrawledContent(url).then(function( html ){
			return html;
		}).catch(function(err){
			console.log("Page loading failed for: " + url);
		});
		return res.end(pageHtml);
	});

 app.listen( app.get('port') , function (req, res) {

	console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));

});


module.exports = app;