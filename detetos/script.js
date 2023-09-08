function notify(type,message){
   (()=>{
     let n = document.createElement("div");
     let id = Math.random().toString(36).substr(2,10);
     n.setAttribute("id",id);
     n.classList.add("notification",type);
     n.innerText = message;
     document.getElementById("notification-area").appendChild(n);
     setTimeout(()=>{
       var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
       for(let i=0;i<notifications.length;i++){
         if(notifications[i].getAttribute("id") == id){
           notifications[i].remove();
           break;
         }
       }
     },5000);
   })();
 }

 function notifySuccess(){
   notify("success","Encrypting Information!");
 }

 function notifyError(){
   notify("error","Fill out the boxes!")
 }

function notifyError2(){
   notify("error","Please select an algorithm from the given options.")
}

function notifyInfo(){
   notify("info","Data can only contain alpahbetical characters")
}
var letters = [
   "A",
   "B",
   "C",
   "D",
   "E",
   "F",
   "G",
   "H",
   "I",
   "J",
   "K",
   "L",
   "M",
   "N",
   "O",
   "P",
   "Q",
   "R",
   "S",
   "T",
   "U",
   "V",
   "W",
   "X",
   "Y",
   "Z"
];
var option = document.getElementById("algorithm-option");
var inputField = document.getElementById("input");
var shiftInputDiv = document.getElementById("shift-input-div");
var shiftInputField = document.getElementById("shift-input");
var output = document.getElementById("output");
var encryptBtn = document.getElementById("encrypt-btn");
var decryptBtn = document.getElementById("decrypt-btn");

// Mozilla Reload Bug Fix
option.value = "caeser";

encryptBtn.addEventListener("click", () => {
   var data = inputField.value;
   if (option.value == "atbash") {
      if (!inputField.value.replace(/\s/g, "").length) {
         notifyError()
      } else {
         crypt(data, applyAtbash);
      }
   } else if (option.value == "caeser") {
      if (
         !inputField.value.replace(/\s/g, "").length ||
         !shiftInputField.value.replace(/\s/g, "").length
      ) {
         notifyError()
      } else {
         crypt(data, applyCaeserEncrypt);
      }
   } else {
      notifyError2()
   }
});

decryptBtn.addEventListener("click", () => {
   var data = inputField.value;
   if (option.value == "atbash") {
      if (!inputField.value.replace(/\s/g, "").length) {
         
      } else {
         crypt(data, applyAtbash);
      }
   } else if (option.value == "caeser") {
      if (
         !inputField.value.replace(/\s/g, "").length ||
         !shiftInputField.value.replace(/\s/g, "").length
      ) {
         notifyError()
      } else {
         crypt(data, applyCaeserDecrypt);
      }
   } else {
      notifyError2()
   }
});

option.addEventListener("change", e => {
   var selectedOption = option.value;
   if (selectedOption === "caeser") {
      shiftInputDiv.style.display = "block";
   } else if (selectedOption === "atbash") {
      shiftInputDiv.style.display = "none";
   }
});

// Atbash Algorithm Method
function applyAtbash(data) {
   data = data.toUpperCase();
   data = data.split("");
   var newData = data
      .map(char => {
         if (char == " ") {
            return " ";
         } else {
            var index = letters.indexOf(char);
            var newIndex = Math.abs(index - 25);
            return letters[newIndex];
         }
      })
      .join("");
   return newData;
}

// Caeser Algorithm Encryption Method
function applyCaeserEncrypt(data) {
   data = data.toUpperCase();
   data = data.split("");
   var newData = data
      .map(char => {
         if (char == " ") {
            return " ";
         } else {
            var index = letters.indexOf(char);
            var newIndex =
               Math.abs(index + parseInt(shiftInputField.value)) % 26;
            return letters[newIndex];
         }
      })
      .join("");
   return newData;
}

// Caeser Algorithm Decryption Method
function applyCaeserDecrypt(data) {
   data = data.toUpperCase();
   data = data.split("");
   var newData = data
      .map(char => {
         if (char == " ") {
            return " ";
         } else {
            var index = letters.indexOf(char);
            var newIndex =
               Math.abs(index - parseInt(shiftInputField.value)) % 26;
            return letters[newIndex];
         }
      })
      .join("");
   return newData;
}

inputField.addEventListener("keypress", e => {
   var key = e.keyCode || e.charCode;
   if (
      (key >= 65 && key <= 90) ||
      (key >= 97 && key <= 122) ||
      key == 8 ||
      key == 32
   ) {
      return true;
   } else {
      notifyInfo()
      e.preventDefault();
   }
});

shiftInputField.addEventListener("keypress", e => {
   var key = e.keyCode || e.charCode;
   if (key >= 48 && key <= 57) {
      return true;
   } else {
      notifyInfo()
      e.preventDefault();
   }
});

inputField.addEventListener("input", () => {
   output.innerHTML = inputField.value;
});

function crypt(data, cb) {
   output.innerHTML = "";
   output.scrollIntoView();
   var result = cb(data).split("");
   var rate = 50;
   var time = data.length * rate;
   var randomLetters = [];
   var key = setInterval(() => {
      for (var i = 0; i < data.length; i++) {
         randomLetters[i] = letters[Math.floor(Math.random() * Math.floor(26))];
      }

      output.innerHTML = "";

      randomLetters.forEach(letter => {
         output.innerHTML += letter;
      });
   }, rate);

   setTimeout(() => {
      clearInterval(key);
      output.innerHTML = result.join("");
   }, time);
}