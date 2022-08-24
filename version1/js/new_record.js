var state = {
    balance: 1000,
    income: 400,
    expense: 100,
    transactions: [
        
    ]
}


var category = document.getElementById("category");
var amount = document.getElementById("amount");
var datetime = document.getElementById("datetime");
var description = document.getElementById("description");
var transaction_type = document.getElementById("transaction_type");
var new_record = document.getElementById("new_record");

// new_record.onclick=function()

// {
//     var category1 = category.value;
//     var amount1 = amount.value;
//     var datetime1 =datetime.value;
//     var description1 = description.value;
//     var transaction_type1 = transaction_type.value;
//     console.log(category1);
//     console.log(amount1);
//     console.log(datetime1);
//     console.log(description1);
//     console.log(transaction_type1);



// };
function init() {
    var localState = JSON.parse(localStorage.getItem('BudgetTracker'));

    if (localState !== null) {
        state = localState;
    }
    console.log("currentstate",state);
    updateState();
    initListeners();
}
function initListeners() {
    new_record.addEventListener('click', onAddRecordClick);
}

function onAddRecordClick() {
    addTransaction();
}

function uniqueId() {
    return Math.round(Math.random() * 1000000);
}

function addTransaction() {
    var category1 = category.value;
    var amount1 = amount.value;
    var datetime1 =datetime.value;
    var description1 = description.value;
    var transaction_type1 = transaction_type.value;
    if ( category1 !== '' && amount1 !=='' && datetime1 !=='' && description1!=='' && transaction_type1 !=='') {
        var transaction = { 
            id: uniqueId(),
            category:category1,
            amount:parseInt(amount1),
            datetime:datetime1,
            description:description1,
            transaction_type:transaction_type1
        };
        state.transactions.push(transaction);

        updateState();
    } 
    else {
        alert('Please enter valid data');
    }
    
    category.value='';
    amount.value='';
    datetime.value='';
    description.value='';
    transaction_type.value='';
}

// initListeners();


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

}

//console.log(state);

init();