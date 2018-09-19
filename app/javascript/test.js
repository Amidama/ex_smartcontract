const Web3 = require('web3');

const contract = require('truffle-contract');

const express = require("express");

const config = require("../../config/default.json");

const app = express();
const port = process.env.PORT || 8081;

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3.ip_address));

const testing_artifacts = require('../../build/contracts/Test.json')
const Testing = contract(testing_artifacts);
Testing.setProvider(web3.currentProvider)

app.get('/', async (req, res) => {
	let account_m = await web3.eth.getCoinbase();
	res.send('Welcome to Blockchain World Powered by OneSpace Developer <br> account : '+account_m);
})

app.get('/set', async (req, res) => {
	const result = await setWallet();
	let a = await checkWallet('A');
	let b = await checkWallet('B');
	res.send(result.tx+"<br>"+a+"<br>"+b);
})

app.get('/wallet/:name', async (req, res) => {
	let name = req.params.name;
	const result = await checkWallet(name);
	res.send(result);
})

app.get('/sendmoney/:form/:to/:value', async (req, res) => {
	let form = req.params.form;
	let to = req.params.to;
	let value = req.params.value;
	const result = await sendMoney(form, to, value);
	res.send(result);
})

app.listen(port, () => {
	console.log('Starting node.js on port' + port)
})

const setWallet = () => {
	return new Promise((resolve, reject) => {
		Testing.deployed().then((instance) => {
            const con = instance.set( {from : web3.personal.listAccounts[0]}); 
			resolve(con);
		}).catch((err) => {
			console.log('-----------------------')
			console.log(err)
			console.log('-----------------------')
		})
	})
}

const checkWallet = (name) => {
	return new Promise((resolve, reject) => {
		Testing.deployed().then((instance) => {
            const con = instance.checkBalance(name); 
			resolve(con);
		}).catch((err) => {
			console.log('-----------------------')
			console.log(err)
			console.log('-----------------------')
		})
	})
}

const sendMoney = (form, to, value) => {
	return new Promise((resolve, reject) => {
		Testing.deployed().then((instance) => {
            const con = instance.sendMoney(form, to, value, {from : web3.personal.listAccounts[0]}); 
			resolve(con);
		}).catch((err) => {
			console.log('-----------------------')
			console.log(err)
			console.log('-----------------------')
		})
	})
}

