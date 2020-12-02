const net = require('net');
//i = require('./imoveis.js');
//const i = new Imoveis();

class Imoveis{

	imoveis = [
		{
			id: 1,
			nome: 'Condomínio NodeJS',
			tipo: 'Apartamento',
			endereco: 'Rua Teste, Bairro Teste, 999, São Luís, MA, 00000-000',
			valor_aluguel: 'R$135,00/noite',
			status: 'Disponível',
			nome_cliente: ''
		},
		{
			id: 2,
			nome: 'Condomínio ECP',
			tipo: 'Casa',
			endereco: 'Rua Teste2, Bairro Teste2, 999, São Luís, MA, 99999-999',
			valor_aluguel: 'R$99,00/noite',
			status: 'Disponível',
			nome_cliente: ''
		}
	];

	constructor(){
		console.log('Bem vindo!');
	}

	addImovel(nome = '', endereco = '', tipo = '', valor_aluguel = '', status = 'Indisponível', nome_cliente = ''){
		const id = this.imoveis.length;
		const imovel = {
			id: id,
			nome: nome,
			endereco: endereco,
			tipo: tipo,
			valor_aluguel: valor_aluguel,
			status: status,
			nome_cliente: ''
		} 

		this.imoveis.push(imovel);
		console.log('Novo aluguel cadastrado com sucesso');
	}

	showImoveis(){
		 //console.log('Imoveis');	
		 this.imoveis.forEach((element)=>{
		 	console.log(element.nome)
		 	console.log(element.tipo)
		 	console.log(element.endereco)
		 	console.log(element.valor_aluguel)
		 	console.log(element.status)
		 	console.log(element.nome_cliente)
		 	console.log()
		 })
	}

	reserveApartment(id, nome_cliente){
		const ap = this.imoveis.find((element) => {return element.id === id});
		console.log('apartment selected ', ap);
		ap['status'] = 'Indisponível';
		ap['nome_cliente'] = nome_cliente;
		this.imoveis[ap['id'] - 1] = ap;
		console.log('Apartamento reservado com sucesso');
	}

}

const i = new Imoveis();
let _new_app

const handle = (socket) =>{
	console.log('somebody connected');
	//console.log(socket);

	socket.on("error", (err) =>{
    	console.log("connection destroyed")
    	console.log(err.stack)
  	})

	//console.log(socket);
	socket.on('end', function(){
		console.log('somebody disconected');
	})


  	socket.on('data', data =>{
  		const msg = data.toString();
  		console.log(msg);

  		if(msg == 'quit'){
  			socket.end();
  		}else if(msg == 'LIST'){
  			i.showImoveis();
  		}else if(msg == 'NOVO'){
  			console.log('Insira os dados separados por ponto e vírgula (;)');
  			console.log('Nome; Endereço, Tipo (apartamento, flat, casa); Valor (em reais); Status (Disponível ou Indisponível)');
  			console.log('Finalize a operação com ADD');	
  		}else if(msg == 'ADD'){
  			let _ap =  this._new_app.split(';');
  				console.log('new apartment to register', _ap);
  				const new_app = {
  					nome: _ap[0] || 'Não informado',
					endereco: _ap[1] || 'Não informado',
					tipo: _ap[2] || 'Não informado',
					valor_aluguel: _ap[3]|| 'Não informado',
					status: _ap[4] || 'Não informado'
  				}
  			console.log('ap will be registered ', new_app);
  			i.addImovel(new_app.nome, new_app.endereco, new_app.tipo, new_app.valor_aluguel, new_app.status);
  			_new_app = null;
  		}else if(msg.indexOf('RESERVE') != -1){
  			console.log('entered in reserve');
  			const data =  msg.split("/"); //msg[msg.length-1]
  			console.log('data resorve ',data);
  			let id = Number(data[1]);
  			let name = data[2];
  			i.reserveApartment(id, name);
  		}else{
  			this._new_app = msg;
  			console.log('entered in default');
  			console.log(this._new_app);
  		}
  	});

}


const server = net.createServer(handle);

server.listen(4000, '127.0.0.1');









