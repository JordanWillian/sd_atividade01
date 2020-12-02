const net = require('net');

const readline = require('readline');
const read = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})


const client = new net.Socket();

client.connect(4000, '127.0.0.1', ()=>{
	console.log('new client connected');
	read.addListener('line', line =>{
		client.write(line);
	})
})