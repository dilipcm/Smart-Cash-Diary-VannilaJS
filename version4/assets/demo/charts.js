Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var chart = document.getElementById('chart_type');
var  sort_by= document.getElementById('sort_by');

var CurrentDate =new Date();
cd=CurrentDate.getDate();//1-31
cm=CurrentDate.getMonth()+1;//0-11
cy=CurrentDate.getFullYear();// current year

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
          if(selected_sort_by == 'last_month'){
            
            dayaxis();
            plot(selected_chart_type);
            console.log("you selected",$(this).val());
          } 
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

function dayaxis(){
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

      console.log("day Axis",daysAxis);
      //x axis done


      var localState = JSON.parse(localStorage.getItem('BudgetTracker'));

      incomeAxis=new Array(31).fill(0);
      expenseAxis=new Array(31).fill(0);

      for(i=0;i<daysAxis.length;i++){

        tempinc=0;
        tempexp=0;
        for (var j = 0; j < localState.transactions.length; j++) {
            item = localState.transactions[j];
            
        //console.log("item",i,item);

            var tempdate = new Date(item.datetime);

            d=tempdate.getDate();
            m=tempdate.getMonth()+1; //0-11
            y=tempdate.getFullYear(); // current year

            if (y==cy && m==cm && d ==i+1){
              if(item.transaction_type=="income"){
                  temp1=item.amount;
                  tempinc+=temp1;
              }
                else if(item.transaction_type=="expense"){
                  temp2=item.amount;
                  tempexp+=temp2;
              }
            }
            incomeAxis[i]=tempinc;
            expenseAxis[i]=tempexp;
            
      }

      };
      console.log(incomeAxis);
      console.log(expenseAxis);
};




function plot(visual_type){

  // chart_type,xaxis,y1axis,y2axis=None

  var ctx = document.getElementById("myAreaChart");
  var myLineChart = new Chart(ctx, {
    type: visual_type,
    data: {
      labels:daysAxis,
      datasets: [{
        label: "Income",
        backgroundColor: "blue",
        borderColor: "green",
        data: incomeAxis,
      },
      {
        label: "Expense",
        backgroundColor: "pink",
        borderColor: "red",
        data: expenseAxis,
      }
    ],
    },
  });

};











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

