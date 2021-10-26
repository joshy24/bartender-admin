export const getDate = (d) => {

    let date = new Date(d);

    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    let hour = date.getHours();
    let minute = date.getSeconds();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    
    return dt+' - '+month+' - '+year +" | "+hour +":"+minute  ;
}

export const sentenceCase = (str) => {
    if ((str===null) || (str===''))
         return false;
    else
     str = str.toString();
  
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const getAmount = (amount) => {
    if(amount || amount==0){
      var a = amount.toString();
    
      if(a.includes('.')){
        let s = a.split(".")
        a = s[0];
      }

      switch(a.length){
        case 4:
          return "₦"+a.slice(0,1) +"," +a.slice(1);
        case 5:
          return "₦"+a.slice(0,2) +"," +a.slice(2);
        case 6:
          return "₦"+a.slice(0,3) +"," +a.slice(3);
        case 7:
          return "₦"+a.slice(0,1) +"," +a.slice(1,4)+","+a.slice(4);
        case 8:
          return "₦"+a.slice(0,2) +"," +a.slice(2,5)+","+a.slice(5);
        case 9:
          return "₦"+a.slice(0,3) +"," +a.slice(3,6)+","+a.slice(6);
        default: 
          return "₦"+a;
      }
    }
}

export const getTruePrice = (price, profit) => {
  return Math.round(price / (1 + (profit / 100)));
}

export const getMonth = (month) => {
    switch(month){
        case 1:
        return "January";
        break;
        case 2:
        return "Febuary";
        break;
        case 3:
        return "March";
        break;
        case 4:
        return "April";
        break;
        case 5:
        return "May";
        break;
        case 6:
        return "June";
        break;
        case 7:
        return "July";
        break;
        case 8:
        return "August";
        break;
        case 9:
        return "September";
        break;
        case 10:
        return "October";
        break;
        case 11:
        return "November";
        break;
        case 12:
        return "December";
        break;
    }
}

export const cityOptions = [
  { value: "LAGOS", label: "Lagos" },
  { value: "ACCRA", label: "Accra" }
];

export const getCities = (cities) => {
     if(!cities || cities.length <= 0)
        return null

     var array = cities.map(city => {
        return cityOptions.forEach(cityOption => {
          if(city == cityOption.value){
              return cityOption;
          }
        })
     })

     return array;
}