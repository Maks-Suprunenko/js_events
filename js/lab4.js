
function outputCurrentDate() {
  var outputDiv = document.getElementById("curDate");
  var now = getCurrentDate();
  var date = "<p>Дата: " + getDateToOutput(now) + "</p>";
  var week = '<p>День тижня:' + uaDaysOfWeek[now.getDay()] + '</p>';
  var time = '<p>Час:' + fixOutput(now.getHours() + ':' + now.getMinutes()) +
                                                                       '</p>';
  outputDiv.innerHTML = date + week + time;
}

function outputDayOfWeek() {
  var input = document.getElementById("date4week");
  var output = document.getElementById("outputWeek");
  var date = getDateFromStr(input.value);
  console.log(date);
  if(date)
    var week = getDayOfWeek(date);
  else
    var week = null;
  
  if(week) {
    outputWeek.innerHTML = '<p>Номер дня:' + week[0] + '</p>' +
      '<p>Назва дня:' + week[1] + '</p>';
    removeClass(input, uncorCls);
  } else {
    addClass(input, uncorCls);
    outputWeek.innerHTML = "";
  }
}

function searchDate() {
  var input = document.getElementById("daysAgo");
  var nDays = parseInt(input.value);
  var output = document.getElementById("dateNDaysAgo");
  
  if(isNaN(nDays)) {
    output.innerHTML = "";
    addClass(input, uncorCls);
  } else {
    removeClass(input, uncorCls);
    var date = getDateNDaysAgo(nDays);
    output.innerHTML = "<p>Дата: " + getDateToOutput(date) +"</p>";
  }
}

function outputLastDayOfMonth() {
  var monthInput = document.getElementById("month");
  var yearInput = document.getElementById("year");
  var outputDiv = document.getElementById("lastDayOfMonth");
  var month = parseInt(monthInput.value);
  var year = parseInt(yearInput.value);

  if(isNaN(year) || year < 1 || year > 3000) {
    addClass(yearInput, uncorCls);
    outputDiv.innerHTML = "";
    return;
  } else
    removeClass(yearInput, uncorCls);
  
  if(isNaN(month) || month < 1 || month > 12) {
    addClass(monthInput, uncorCls);
    outputDiv.innerHTML = "";
    return;
  } else 
    removeClass(monthInput, uncorCls);
  
  var lastDayDate = getLastDayOfMonth(year, month-1);
  outputDiv.innerHTML = "<p>Дата: " + getDateToOutput(lastDayDate) + "</p>";
}

function outputSeconds() {
  var outputDiv = document.getElementById("seconds");
  var sec = getSeconds();
  outputDiv.innerHTML = "<p>Секунд від початку доби: " + sec.fromStart +
              "c.</p>" +"<p>Секунд до кінця доби: " + sec.toEnd + "c.</p>";
}

function outputFormatedDate() {
  var input = document.getElementById("date2format");
  var outputDiv = document.getElementById("formatedDate");
  var date = getDateFromStr(input.value);

  if(date)
    var res = getFormatedDate(date);
  else
    var res = null;

  if ( res ) {
    removeClass(input, uncorCls);
    outputDiv.innerHTML = "<p>Дата:" + res + "</p>";
  } else {
    addClass(input, uncorCls);
    outputDiv.innerHTML = "";
  }
}

function subDate() {
  var firstInput = document.getElementById("firstDate");
  var secondInput = document.getElementById("secondDate");
  var outputDiv = document.getElementById("subOfDates");
  var firstDate = getDateFromStr(firstInput.value);
  var secondDate = getDateFromStr(secondInput.value);

  if(!firstDate) {
    addClass(firstInput, uncorCls);
    outputDiv.innerHTML = "";
    return;
  }

  removeClass(firstInput, uncorCls);

  if(!secondDate) {
    addClass(secondInput, uncorCls);
    outputDiv.innerHTML = "";
    return;
  }

  removeClass(secondInput, uncorCls);
  var sub = getSubOfDates(firstDate, secondDate);

  if( (sub.years + sub.months + sub.days) ) {
    outputDiv.innerHTML = "<p>Різниця дат:" + checkEnding(sub.years, 'year') +
     checkEnding(sub.months, 'month') + checkEnding(sub.days, 'day');
  } else
    outputDiv.innerHTML = "<p>Дати однакові.</p>";
}

function outputFormatDateTime() {
  var input = document.getElementById("dateTime2Format");
  var outputDiv = document.getElementById("formatedDateTime");
  var date = getDateFromStr(input.value, "+time");

  if(date){
    removeClass(input, uncorCls);
    outputDiv.innerHTML = "<p>" + formatDate(date) + "</p>";
  } else {
    addClass(input, uncorCls);
    outputDiv.innerHTML = "";
  }
}

function parseDate() {
  var input = document.getElementById("date2Parse");
  var outputDiv = document.getElementById("parsedDate");
  var checkbox = document.getElementById("USAFormat");
  console.log(checkbox.checked);
  var date = getDateFromStr(input.value, null, checkbox.checked);

  if ( date ) {
    removeClass(input, uncorCls);
    outputDiv.innerHTML = "<p>Дата: " + getDateToOutput(date) + "</p>";
  } else {
    addClass(input, uncorCls);
    outputDiv.innerHTML = "";
  }
}

function multiLangOutputDate() {
  var radio = document.getElementsByName("lang");
  let outputDiv = document.getElementById("multiLangDate");

  for (var index in radio) {
    if(radio[index].checked){
      radio = radio[index];
      break;
    }
  }
  outputDiv.innerHTML = "<p>" + fixOutput( getLangFormatedDate(radio.value) ) +
                                                                         "</p>";
}