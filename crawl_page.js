'use strict';

const validator = require('validator');
const puppeteer = require('puppeteer');

async function getCrawledContent( url ) {

	if (url.charAt(0) == "/") {
		url = url.replace("/","");
	}

	url = decodeURIComponent(url);

	let isValidUrl = validator.isURL(url);

	if ( !isValidUrl ) {
		return "Invalid URL: " + url;
	}

	// const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
	const browser = await puppeteer.launch({
	    args: [
	    '--no-sandbox',
	    '--headless',
	    '--disable-gpu',
	    '--window-size=1920x1080'
	]});
	// const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.waitFor(10000);
	await page.goto( url, {waitUntil: 'networkidle2'} );
	await page.screenshot({ path: "./page.png" });
	const pageContent = await page.content();
	await browser.close();

	return pageContent;

}

exports.getCrawledContent = getCrawledContent;