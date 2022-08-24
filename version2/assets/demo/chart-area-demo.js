Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var chart = document.getElementById('chart_type');
var  sort_by= document.getElementById('sort_by');




$(document).ready(function(){
  $("select[name='chart_type[]']").change(function(){
   let selected_chart_type=$(this).val();
   if (selected_chart_type == 'bar' || 'line' || 'doughnut'){
    console.log($(this).val());
    temp=document.getElementById('sort_container');
    if (temp !== null) {
      console.log(' Element exists');
      temp.remove();
      sort_ui()
    } else {
      
      sort_ui()
      console.log('Element does NOT exist in DOM');
    }

    
    // selectBox.options[0].setAttribute('selected', true);

    $("select[name='sort_by[]']").change(function()
      {
        var selected_sort_by =$(this).val();
        if (selected_sort_by == 'last_month' || 'last_3month' || 'last_6month' || 'last_1year' || 'custom_date' || 'custom_month' || 'custom_year')
        {
          console.log($(this).val());
        }
        else{
          console.log("failed")
        }
      }
    );
   }
   else{
    console.log("failed")
   }
   
  }); 
})


var CurrentDate = new Date();

function total_days(){
  var month = CurrentDate.getMonth();
  var year = CurrentDate.getFullYear();
  return new Date(year, month, 0).getDate();
}

noOfDays=total_days();
console.log("Current Date:", total_days().date);
console.log("no of days",noOfDays)
daysAxis=[];
for(i=1;i<noOfDays+1;i++){
  daysAxis.push(i);
}

console.log(daysAxis);
//x axis done


var localState = JSON.parse(localStorage.getItem('BudgetTracker'));
var allAmount=[];
var StoragedateTime=[];
var incomeAmount=[];
var expenseAmount=[];
for(i=0;i<localState.transactions.length;i++)
  {
    if (localState.transactions[i].transaction_type=="income"){
        incomeAmount.push(localState.transactions[i].amount);
     }
    else if(localState.transactions[i].transaction_type=="expense"){
      expenseAmount.push(localState.transactions[i].amount);
    }
  };


  for(i=0;i<localState.transactions.length;i++)
  {
    
    StoragedateTime.push(localState.transactions[i].datetime);

  };






console.log(StoragedateTime);
console.log(expenseAmount);
var ctx = document.getElementById("myAreaChart");


incomeAxis=[];
expenseAxis=[];


for(i=0;i<daysAxis.length;i++){
  d=CurrentDate.getDate();//1-31
  m=CurrentDate.getMonth();//0-11
  y=CurrentDate.getFullYear();// current year

  td=new Date(StoragedateTime[i]).getDate();
  tm=new Date(StoragedateTime[i]).getMonth();//0-11
  ty=new Date(StoragedateTime[i]).getFullYear();
    if (y == ty && m == tm && d == td){
      if (localState.transactions[i].transaction_type=="income"){
        inctemp=0;
        inctemp+=localState.transactions[i].amount
        //temp.push(localState.transactions[i].amount);
      }
      
      else if(localState.transactions[i].transaction_type=="expense"){
        exptemp=0;
        exptemp+=localState.transactions[i].amount
        //exptemp.push(localState.transactions[i].amount);
      }
      incomeAxis.push(inctemp)||expenseAxis.push(exptemp);
    }


};
console.log("income axis",incomeAxis);
console.log("expense",expenseAxis);


var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:daysAxis,
    datasets: [{
      label: "Income",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: incomeAxis,
    },
    {
      label: "Expense",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: expenseAxis,
    },
    


  
  ],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'year'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 40000,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: true
    }
  }
});


function sort_ui(){
  var visualize = document.getElementById("visualisations");
  
  var div=document.createElement("div");
  div.id="sort_container";
  div.setAttribute("class", "form-group col-2");
  
  var selectBox = document.createElement("select");
  selectBox.setAttribute("class", " form-select ");
  selectBox.id="sort_by";
  selectBox.name="sort_by[]";


  const values=["","last_month","last_3month","last_6month","last_1year","custom_date","custom_month","custom_year"];
  const options=["Sort by","last Month by Date","By last 3 Months","By last 6 Months",
"By last 1 Year","Custom:By Date","Custom:By Month","Custom:By Year"];
  
   // create option using DOM

  for (var i = 0; i < values.length; i++){
    var newOption = document.createElement('option');
    var optionText = document.createTextNode(options[i]);
    
    // opt.disabled = true;
    // set option text
    
    // and option value
    newOption.setAttribute('value',values[i]);
    
  newOption.appendChild(optionText);
    
  selectBox.appendChild(newOption);
  };

  div.appendChild(selectBox);
  visualize.appendChild(div);
  selectBox.options[0].disabled = true;
   
  // add the option to the select box
};