da=[];
tempamt=0;
for (var i = 0; i < localState.transactions.length; i++) {
    item = localState.transactions[i];
    
//console.log("item",i,item);

    var tempdate = new Date(item.datetime);

    d=tempdate.getDate();
    da.push(d);

    if (d ==1){
        temp=item.amount;
        tempamt+=temp
    
        
        
    }


}
console.log(da);
console.log(tempamt);