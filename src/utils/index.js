/**
 * Find row by id
 *
 * @param (Event) e
 */
const findRowById = (id, data) => {
  let ret = -1;

  data.some((row, index) => {
    if (row.id === id) {
      ret = index;
      return true;
    }
    return false;
  });
  return ret;
}
const formatcurrencytoNumber = (val) =>{
  console.log(val);
  if(typeof(val)!='string'){
    val = val+'';
  }
  val = val.replaceAll(",", '');
  val = val.replaceAll("$", '');
  return val;
}
const formatNumbertocurrency = (val) =>{
  if(val === NaN || val==='NaN'){
    val='00';
  }
  if (isNaN(val)) {
    val = val.slice(1);
    val = val.replace(",", '');
    val = val.replace("$", '');
  }
  //console.log('Val=>'+val);
  let number = parseFloat(val);
  //console.log('number ' + number);
  let formattedString = '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  //console.log('number after ' + number);
  return  formattedString + '';
}

export { findRowById, formatcurrencytoNumber, formatNumbertocurrency };
