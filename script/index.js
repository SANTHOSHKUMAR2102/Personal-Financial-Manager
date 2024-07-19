const totalAmount = document.querySelector('#total-amc');
const creditAmount = document.querySelector('#credit-amc');
const debitAmount = document.querySelector('#debit-amc');
const description = document.querySelector('#desc');
const date = document.querySelector("#date");
const inputAmount = document.querySelector('#input-amc');
const trans = document.querySelector('#trans');
const form = document.querySelector('#form');



/*const dummyData = [
  {id: 1, description: "flower", amount:-20},
  {id: 2, description: "salary", amount:25000},
  {id: 3, description: "tax", amount:-2000}
];

let transactions = dummyData; */

const  localStorageTransactions = JSON.parse(localStorage.getItem("data"));

let transactions = localStorage.getItem("data") != null ? localStorageTransactions : [];


// load deatails in html page

function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add("d-flex");
  item.classList.add("justify-content-between");
  item.classList.add("mb-2");
  item.classList.add("ps-2");
  item.classList.add("align-items-center");
  item.classList.add(transaction.amount > 0 ? "inc" : "exp");

  item.innerHTML = `
    ${transaction.description}
    <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <span>${transaction.date}</span>
    <div>
      <button class="btn btn-success btn-sm" onclick = "edit(${transaction.id})">Edit</button>
      <button class="btn btn-danger btn-sm" onclick = "removeTrans(${transaction.id})">Delete</button>
    </div> 
  `;
  trans.appendChild(item);
}

function updateAmount(){
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc,itemAmount) => (acc+=itemAmount),0).toFixed(2);
  totalAmount.innerHTML =`₹ ${total}`;

  const credit = amounts.filter((itemAmount) => itemAmount > 0).reduce((acc,itemAmount) => (acc+=itemAmount),0).toFixed(2);
  creditAmount.innerHTML =`₹ ${credit}`;

  const debit = amounts.filter((itemAmount) => itemAmount < 0).reduce((acc,itemAmount) => (acc += itemAmount),0);
  debitAmount.innerHTML =`₹ ${Math.abs(debit)}`;
}

// edit button

function edit(id){
  document.querySelector(".edit-card").style.display = "block";
  document.querySelector(".overlay").style.display = "block";

  var obj = transactions.find(transaction => transaction.id === id);
  document.querySelector("#id").value = obj.id;
  document.querySelector("#udesc").value = obj.description;
  document.querySelector("#udate").value = obj.date;
  document.querySelector("#uinput-amc").value = obj.amount;

  config();
  updateAmount();
}

// update button

function update(){

  var id = parseInt(document.querySelector("#id").value);
  var description = document.querySelector("#udesc").value;
  var date = document.querySelector("#udate").value;
  var amount = Number(document.querySelector("#uinput-amc").value);

  var index = transactions.findIndex(transaction => transaction.id == id);
  transactions[index] = {id, description, date, amount};

  document.querySelector('.edit-card').style.display = "none";
  document.querySelector('.overlay').style.display = "none";

  config();
  updateAmount();
}

// delete button

function removeTrans(id){
  if(confirm("Are you sure you want to delete Transaction!")){
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  }
  else{
    return;
  } 
}

function addTransaction(e){
  event.preventDefault();
  if(description.value.trim() == "" || inputAmount.value.trim() == "")
    {
      alert("Please Enter Describtion and Amount");
    }
    else
    {
      const transaction = {
        id: unique(),
        description: description.value,
        date: date.value,
        amount: Number(inputAmount.value),
      };
      transactions.push(transaction);
      loadTransactionDetails(transaction);
      description.value="";
      date.value="";
      inputAmount.value="";
      updateAmount();
      updateLocalStorage();
    }
}

function unique(id){
  return Math.floor(Math.random() * 1000000);
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load", function() {
  config();
  updateAmount();
})

function config(){
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
}

function updateLocalStorage(){
  localStorage.setItem("data", JSON.stringify(transactions));
}

function logOut(){
  localStorage.removeItem('username');
  localStorage.removeItem('userpassword');

  alert('You have Log out!')

  window.location.href = 'signin.html'
}