var state = {
    balance: 1000,
    income: 400,
    expense: 100,
    transactions: [
        
    ]
}


var balanceEle = document.getElementById('balance');
var incomeEle = document.getElementById('income');
var expenseEle = document.getElementById('expense');
var transactionsEle = document.getElementById('transaction');

function init() {
    var localState = JSON.parse(localStorage.getItem('BudgetTracker'));

    if (localState !== null) {
        state = localState;
    }
    
    //render();

    updateState();
    // initListeners();
}

function onDeleteClick(event) {
    console.log('hello');
    var id = parseInt(event.target.getAttribute('data-id'));
    console.log
    var deleteIndex;
    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].id === id) {
            deleteIndex = i;
            break;
        }
    }

    state.transactions.splice(deleteIndex, 1);

    updateState();
}

function updateState() {
    var balance = 0,
        income = 0,
        expense = 0,
        item;

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];

        if (item.transaction_type === 'income') {
            income += item.amount;
        } else if (item.transaction_type === 'expense') {
            expense += item.amount;
        }
    }

    balance = income - expense;

    state.balance = balance;
    state.income = income;
    state.expense = expense;

    localStorage.setItem('BudgetTracker', JSON.stringify(state))

    render();
}

function render() {

    balanceEle.innerHTML = `${state.balance}`;
    incomeEle.innerHTML = `${state.income}`;
    expenseEle.innerHTML = `${state.expense}`;
    var containerEl,idEle, catEle,amtEle,dtEle,descEle,transTypeEle,editEle,editbtn,delEle,delbtn, item;
    //var transactionEle; //, containerEl, amountEl, item, btnEl;
    transactionsEle.innerHTML = '';
    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];

        containerEl = document.createElement('tr');

        idEle  = document.createElement('td'); 
        idEle.innerHTML = `${item.id}`;
        containerEl.appendChild(idEle);

        catEle = document.createElement('td');
        catEle.innerHTML = `${item.category}`;
        containerEl.appendChild(catEle);

        amtEle = document.createElement('td');
        amtEle.innerHTML = `&#8377;${item.amount}`;
        containerEl.appendChild(amtEle);

        dtEle = document.createElement('td');
        var x=new Date(item.datetime);
        n = x.toLocaleString();
        dtEle.innerHTML = `${n}`;
        // dtEle.innerHTML = `${item.datetime}`;
        containerEl.appendChild(dtEle);

        descEle = document.createElement('td');
        descEle.innerHTML = `${item.description}`;
        containerEl.appendChild(descEle);

        transTypeEle = document.createElement('td');
        transTypeEle.innerHTML = `${item.transaction_type}`;
        containerEl.appendChild(transTypeEle);

        delEle = document.createElement('td');
        // delEle.innerHTML = 'Delete';
        

        delbtn = document.createElement('button');
        delbtn.innerHTML = 'Delete';
        // delbtn.classList.add('del-btn');
        delbtn.setAttribute('data-id', item.id);
        delbtn.addEventListener('click', onDeleteClick);
        delEle.appendChild(delbtn);
        containerEl.appendChild(delEle);
        
        // delbtn.onclick= function(){alert("hello");};

        transactionsEle.appendChild(containerEl);
}
}

init();
console.log(state)