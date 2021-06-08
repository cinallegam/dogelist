function remove(id) {
  let getItem = OnInit();
  let index = id - 1;
  getItem.splice(index, 1);
  localStorage.setItem('doge-token', JSON.stringify(getItem));
  OnInit();
};

function addData(price,volume){
  const token  = localStorage.getItem('doge-token');
  if(token) {
    let data = JSON.parse(token);
    let newData = { price:parseFloat(price), volume:parseFloat(volume), end:'t' };
    data.push(newData);
    localStorage.setItem('doge-token', JSON.stringify(data));
  } else {
    let data = [];
    let newData = { price:parseFloat(price), volume:parseFloat(volume), end:'t' };
    data.push(newData);
    localStorage.setItem('doge-token', JSON.stringify(data));
  }
  document.querySelector("#myPrice").value = "";
  document.getElementById("myVolume").value = "";
  OnInit();
};

function chkNumber(event) {
  let e_k = event.keyCode;
  if (((e_k < 48) || (e_k > 57)) && e_k != 46 ) event.returnValue = false;
};

function btnAdd() {
  const price = document.querySelector("#myPrice").value;
  const volume = document.querySelector("#myVolume").value;
  if(!price && !volume) {
    document.querySelector('.errSt').innerHTML = '* Price & Volume required!';
  } else {
    if(price){
      (volume)? addData(price, volume) : document.querySelector('.errSt').innerHTML = '* Volume required!';
    } else {
      document.querySelector('.errSt').innerHTML = '* Price required!';
    }
  }
};

const OnInit = () => {
  document.querySelector('.errSt').innerHTML = '';
  const token = localStorage.getItem('doge-token');
  const list = document.querySelector('#myTbody');
  while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
  };
  var sumP = 0;
  var sumV = 0;
  var sumT = 0;
  let row = "";
  if(token){
    let data = JSON.parse(token);
    data = data.map((res, ii) => ({index: ii + 1, ...res}));
    for(let ii = 0; ii < data.length; ii++){    
      row += `<tr class="tr-ex">
      <td>${data[ii].index}</td>
      <td>${data[ii].price}</td>
      <td>${data[ii].volume}</td>
      <td>${data[ii].price * data[ii].volume}</td>
      <td id="${data[ii].index}" class="btnClose" onclick="remove(id)">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </td>
      </tr>`;
      document.querySelector("#myTbody").innerHTML = row;
      sumP += Number(data[ii].price);
      sumV += Number(data[ii].volume);
      sumT += Number(data[ii].price) * Number(data[ii].volume);
    }
    document.getElementById('sum-price').innerHTML = sumP;
    document.getElementById('sum-volume').innerHTML = sumV;
    document.getElementById('sum-total').innerHTML = sumT;
    document.getElementById('avg').innerHTML = (sumT / sumV).toFixed(2);
    return JSON.parse(token);
  }
};

OnInit();