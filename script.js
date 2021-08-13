/** @format */

'use strict';

const account1 = {
	name: 'Ritesh Khadka',
	movements: [500, 300, -400, 600, 250, 750, 12, 7],
	intrestRate: 6.5,
	pin: 1110,
};

const account2 = {
	name: 'Dan bdr. adhikari',
	movements: [102, 202, -675, 765, -897, -44, 34, 13],
	intrestRate: 3.5,
	pin: 2121,
};

const account3 = {
	name: 'Pushparaj kalikote',
	movements: [226, 567, 987, -908, -912, -123, 34, 45],
	intrestRate: 2.5,
	pin: 3131,
};

const account4 = {
	name: 'gaurav shrestha',
	movements: [231, 222, 14, 56, -66, -76, -23, 55],
	intrestRate: 3.2,
	pin: 4141,
};

const accounts = [account1, account2, account3];

const welcome = document.querySelector('.welcome');
const loginBtn = document.querySelector('.login__btn');
const app = document.querySelector('.app');

const balanceValue = document.querySelector('.balance__value');
const balanceLabel = document.querySelectorAll('.balance__label');
const containerMovements = document.querySelector('.movements');

const summary = document.querySelector('.summary');
const btnSort = document.querySelector('.btn--sort');

const summaryValueIn = document.querySelector('.summary__value--in');
const summaryValueOut = document.querySelector('.summary__value--out');
const summaryValueIntrest = document.querySelector('.summary__value--interest');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const formInputLoanAmount = document.querySelector('.form__input--loan-amount');
const btnClose = document.querySelector('.form__btn--close');

const date = document.querySelector('.date');
const timer = document.querySelector('.timer');

const loginInputUser = document.querySelector('.login__input--user');
const loginInputPin = document.querySelector('.login__input--pin');

const formInputTo = document.querySelector('.form__input--to');
const formInputAmount = document.querySelector('.form__input--amount');
const formInputUser = document.querySelector('.form__input--user');
const formInputPin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
	containerMovements.innerHTML = '';

	const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
	movs.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';
		const html = `
         <div class="movements__row">
					<div class="movements__type movements__type--${type}">${i + 1}${type}</div>
				
					<div class="movements__value">${mov} $</div>
				</div> `;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const movements = [500, 300, -400, -600, 250, -750, 12, 7];

//const euroToUSD = 1.1;

//const movementsUSD = movements.map(mov => mov * euroToUSD);

const calcDisplayBalance = function (acc) {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	balanceValue.textContent = `${acc.balance} $`;
};

const calcDisplayIncome = function (acc) {
	const income = acc.movements
		.filter(mov => mov > 0)
		.reduce((acc, mov) => acc + mov, 0);
	summaryValueIn.textContent = `${income} $`;

	const output = acc.movements
		.filter(mov => mov < 0)
		.reduce((acc, mov) => acc + mov, 0);
	summaryValueOut.textContent = `${Math.abs(output)} $`;

	const intrestM = movements
		.filter(mov => mov > 0)
		.map(deposit => (deposit * acc.intrestRate) / 100)
		.reduce((acc, int) => acc + int, 0);
	summaryValueIntrest.textContent = `${intrestM} $`;
};
//map method
const createUser = function (user) {
	user.forEach(function (userEl) {
		userEl.username = userEl.name
			.toLowerCase()
			.split(' ')
			.map(mapE => mapE[0])
			.join('');
		return createUser;
	});
};
createUser(accounts);

const updateUI = function (acc) {
	displayMovements(acc.movements);

	//display summary
	calcDisplayIncome(acc);

	//display balance
	calcDisplayBalance(acc);
};
let currentAccount;
loginBtn.addEventListener('click', function (e) {
	//to avoid submit
	e.preventDefault();
	currentAccount = accounts.find(acc => acc.username === loginInputUser.value);
	console.log(currentAccount);
	//display ui and message
	if (currentAccount?.pin === Number(loginInputPin.value)) {
		welcome.textContent = `Welcome back, ${currentAccount.name.split(' ')[0]}`;
		app.style.opacity = 100;

		//clear input fields
		loginInputUser.value = loginInputPin.value = '';

		//clear pin focus
		loginInputPin.blur();

		//display movements
		updateUI(currentAccount);
	} else app.style.opacity = 0;
});
btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(formInputAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === formInputTo.value);

	console.log(amount, receiverAcc);

	formInputAmount.value = formInputTo.value = '';
	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc?.username !== currentAccount.username
	) {
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);
		updateUI(currentAccount);
	}
});
btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	if (
		formInputUser.value === currentAccount.username &&
		Number(formInputPin.value) === currentAccount.pin
	) {
		const index = accounts.findIndex(
			acc => acc.username === currentAccount.username,
		);
		//console.log(index);
		accounts.splice(index, 1);
		app.style.opacity = 0;
	}
	formInputUser.value = formInputPin.value = '';
});
btnLoan.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(formInputLoanAmount.value);

	if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
		currentAccount.movements.push(amount);

		updateUI(currentAccount);
	}
	formInputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
	e.preventDefault();
	displayMovements(currentAccount.movements, !sorted);

	sorted = !sorted;
});

//console.log(accounts);

//filter method
const deposits = movements.filter(function (mov, i, arr) {
	return mov > 0;displayMovements(currentAccount.movements);

		//display summary
		calcDisplayIncome(currentAccount);

		//display balance
		calcDisplayBalance(currentAccount);
});
console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

const withdrawalFor = [];
for (const mov of movements) if (mov < 0) withdrawalFor.push(mov);
console.log(withdrawalFor);

//reduce method
const balance = movements.reduce(function (acc, cur, i, arr) {
	console.log(`iteration ${i}: ${acc}`);
	return acc + cur;
}, 100);
console.log(balance);

const balance = movements.reduce((acc, cur) => acc + cur, 100);
console.log(balance);

//using for of loop
let balance2 = 100;
for (const mov of movements) balance2 += mov;
console.log(balance2);
//finding higher accumalator on array/
const max = movements.reduce((acc, mov) => {
	if (acc > mov) return acc;
	else return mov;
}, movements[0]);
console.log(max);

const euroToUSD = 1.1;
const dollarDepositUSD = movements
	.filter(mov => mov > 0)
	.map((mov, i, arr) => mov * euroToUSD)
	.reduce((acc, mov) => acc + mov, 0);
console.log(dollarDepositUSD);
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.name === 'pushparaj kalikote');
console.log(account);

//multiple chaining array method
const overBalance = accounts
	.map(acc => acc.movements)
	.flat()
	.reduce((acc, mov) => acc + mov, 0);
console.log(overBalance);
//single label of chaining arrays
const balance2 = accounts
	.flatMap(acc => acc.movements)
	.reduce((acc, mov) => acc + mov, 0);

console.log(balance2);

//sorting array Descending  order

movements.sort((a, b) => {
	if (a > b) return 1;
	if (a < b) return -1;
});
console.log(movements);

//sorting array ascending order

movements.sort((a, b) => a - b);
console.log(movements);

const arr = [1, 2, 3, 4, 5, 6, 7];

arr.fill(40, 3, 5);
console.log(arr);

const arrr = new Array(5, 7, 8);
arrr.fill(12);
console.log(arrr);

const y = Array.from({ length: 4 }, () => 1);
console.log(y);

const z = Array.from({ length: 4 }, (_, i) => i + 1);
console.log(z);

balanceValue.addEventListener('click', function () {
	const movementsUI = Array.from(
		document.querySelectorAll('.movements__value'),
		el => Number(el.textContent.replace('$', ' ')),
	);
	console.log(movementsUI);
	const movementsUI2 = [...document.querySelectorAll('movements__value')];
});*/

const flight = 'LH2345';
const jonas = {
	name: 'jonas',
	password: 2939495969,
};

const checkIn = function (flightNum, passenger) {
	flightNum = 'LH45654';
	passenger.name = 'mr' + passenger.name;

	if ((passenger.password = 2939495969)) {
		alert('you are logged in');
	} else {
		alert('you are not acessed');
	}
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
const flightNum = flight;
const passenger = jonas;
