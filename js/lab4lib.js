var regDate = /^([1-2][0-9]|3[01]|0?[1-9])[\./-\s](0?[1-9]|1[0-2])[\./-\s]((?:1\d|20)\d{2})(?:\s((?:[01]\d)|(?:2[0-3])):([0-5]\d))?$/im;
var regReversDate = /^((?:1\d|20)\d{2})[\./-\s](0?[1-9]|1[0-2])[\./-\s]([1-2][0-9]|3[01]|0?[1-9])$/im;
var regDateUSA = /^(0?[1-9]|1[0-2])[\./-\s]([1-2][0-9]|3[01]|0?[1-9])[\./-\s]((?:1\d|20)\d{2})$/im;

var uaDaysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер",
 "П'ятниця", "Субота"];
var ruDaysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг",
  "Пятница", "Суббота"];
var enDaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"];
var uaMonths = ["січня", "лютого", "березня", "квітня", "травня", "червня",
 "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
var rusMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля",
 "августа", "сентября", "октября", "ноября", "декабря"];
var enMonths = ["January", "February", "March", "April", "May", "June", "July",
 "August", "September", "October", "December"];
var uncorCls = 'uncorrect';

function addClass(obj, cls) {
  var str = obj.className;

  if (!( ~str.indexOf(cls) )) {
    str = str + " " + cls;
    obj.className = str.trim();
  }
}

function removeClass(obj, cls) {
  let reg = new RegExp("\s?"+cls+"\s?","g");
  obj.className = obj.className.replace(reg, " ").trim();
  obj.className = obj.className.replace(/\s{2,}/, " ");
}

function checkEnding(val, num) {
  switch(num) {
    case 'year':
      if(val%10 == 1 && val%100 != 11) return val+" рік, ";
      else if( val%10 > 1 && val%10 < 5 && (val%100 < 12 || val%100 > 14) )
        return val+" роки, ";
      else if(val == 0) return "";
      else return val+" років, ";

    case 'month':
      if(val == 1) return val+" місяць, ";
      else if( val > 1 && val < 5) return val+" місяці, ";
      else if(val == 0) return "";
      else return val+" місяців, ";

    case 'day':
      if(val%10 == 1 && val != 11) return val+" день.";
      else if( (val%10 > 1 && val%10 < 5) && (val < 12 || val > 14 ))
        return val+" дні.";
      else if(val == 0) return "";
      else return val+" днів.";
  }
}

function fixOutput(str) {
  str = " " + str + " ";

  while( str != str.replace(/([^\d])(\d)([^\d])/g, "$1" + 0 +"$2" + "$3") ) {
    str = str.replace(/([^\d])(\d)([^\d])/g, "$1" + 0 +"$2" + "$3");
  }

  return str.trim();
}

function getCurrentDate() {
  let now = new Date();
  return now;
}

function getDayOfWeek(date, daysOfWeek = uaDaysOfWeek) {
  var numOfDays = null;

  if(date) {
    if (!(numOfDays = date.getDay()))
        numOfDays = 7;
    
    return [numOfDays, daysOfWeek[date.getDay()]];
  }
  
  return null;
}


function getLastDayOfMonth(year, month) {
  var numOfDay = 28;
  var date = new Date(year, month, numOfDay);

  while( new Date(year, month, numOfDay + 1).getMonth() ==  date.getMonth()) {
    date = new Date(year, month, ++numOfDay);
  }

  return date;
}

function getSeconds() {
  let now = new Date();
  let secFromStart = now.getHours()*3600 + now.getMinutes()*60 +
                                               now.getSeconds();
  let secToEnd = 86400 - secFromStart;
  return {toEnd:secToEnd, fromStart: secFromStart};
}

function getFormatedDate(date) {
  return fixOutput( date.getDate() + '.' + (date.getMonth()+1) +
                                      '.' + date.getFullYear() );
}

function getSubOfDates(date1, date2) {
    if (date1 > date2) { // swap
        var result = getSubOfDates(date2, date1);
        return result;
    }

    result = {
        years:  date2.getYear()  - date1.getYear(),
        months: date2.getMonth() - date1.getMonth(),
        days:   date2.getDate()  - date1.getDate(),
    };
  
    if (result.days < 0) {
        result.months--;
        result.days = 32-date1.getDate()+date2.getDate();
    }
    
    if (result.months < 0) {
        result.years--;
        result.months+=12;
    }

    return result;
}

  function formatDate(date) {
    var now = new Date();
    var diff = null;

    if( ( diff = now.getTime() - date.getTime() ) < 1000 && diff > -1 )
      return "Тільки що.";
    else if( (diff = now.getTime() - date.getTime()) < 6e4 && diff > 0)
      return ~~(diff/1000) + " сек. назад.";
    else if( (diff = date.getTime() - now.getTime() ) < 3.6e6 && diff > 0)
      return ~~(diff/6e4) + "хв. назад.";
    else
      return fixOutput(getFormatedDate(date) + " " + date.getHours() + ":" +
                                                         date.getMinutes());
  }

function getDateFromStr(str, time = null, USAFormat = false) {
  if(regDate.test(str) ) {
    var dateArr = regDate.exec(str);

    if(time) 
      return new Date(dateArr[3], dateArr[2]-1, dateArr[1], dateArr[4],
                                                            dateArr[5]);

    return new Date(dateArr[3], dateArr[2]-1, dateArr[1]);

  } else if( USAFormat && regDateUSA.test(str) ){
    var dateArr = regDateUSA.exec(str);
    return new Date(dateArr[3], dateArr[1]-1, dateArr[2]);

  } else if( !USAFormat && regReversDate.test(str) ) {
    var dateArr = regReversDate.exec(str);
    return new Date(dateArr[1], dateArr[2]-1, dateArr[3]);
  }

  return null;
}

function getLangFormatedDate(lang) {
  var now = new Date();
  switch(lang) {
    case "uk":
      return getDayOfWeek(now)[1] + ", " + 
      getDateToOutput(now).replace(/\./g, " н. е.</p><p>") +
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    case 'ru':
    return getDayOfWeek(now, ruDaysOfWeek)[1] + ", " + 
    getDateToOutput(now, rusMonths).replace(/року\./g, "года н. э.</p><p>") +
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    case 'en':
    return getDayOfWeek(now, enDaysOfWeek)[1] + ", " + 
    enMonths[now.getMonth()] + " " + now.getDate() + " BC</p><p>" +
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  }
}

function getDateToOutput(date, months = uaMonths) {
  return fixOutput(date.getDate() + " " + months[date.getMonth()] + 
  " " + date.getFullYear() + " року.");
}