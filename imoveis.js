class Imoveis{

	constructor(){
		console.log('Bem vindo!');
	}

	imoveis = [
		{
			nome: 'teste',
			valor: 0.0
		}
	];

	addImovel(nome, endereco, tipo, valor_aluguel, status = 0){
		const imovel = {
			nome: nome,
			endereco: endereco,
			tipo: tipo,
			valor_aluguel: valor_aluguel,
			status: status
		} 

		imoveis.push(imovel);
	}

	getImoveis(){
		 console.log('Imoveis');	
		 console.log(imoveis);
	}


}