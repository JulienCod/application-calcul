let number1 = 1;
let number2 = 2;
let userInput = 0;
let result = 0;
let symbol = "";
let level = 0;
let randomRange = 0;
let score = 0;
let counter = 0;   



document.getElementById("level").innerHTML=`<div>
<p>Type de calcul</p>
<button class="button" value='+' onclick="setSymbol(this)">+</button>
<button class="button" value='-' onclick="setSymbol(this)">-</button>
<button class="button" value='x' onclick="setSymbol(this)">x</button>
<button class="button" value='/' onclick="setSymbol(this)">/</button>
</div>

<div>
<p>Niveau</p>
<button class="button" value="1" onclick="setLevel(this)">1</button>
<button class="button" value="2" onclick="setLevel(this)">2</button>
<button class="button" value="3" onclick="setLevel(this)">3</button>
<button class="button" value="4" onclick="setLevel(this)">4</button>
<button class="button" value="5" onclick="setLevel(this)">5</button>
</div>`



// étape 1 récupération des informations de l'utilisateur.
function setSymbol(sym){
  symbol = sym.value;
  startTestQuestion();
}

function setLevel(lev) {
  
  level = lev.value
  
  switch (level) {
    case '1':
      randomRange = 11;
    break;
    case '2':
      randomRange = 101;
    break;
    case '3':
      randomRange = 1001;
    break;
    case '4':
      randomRange = 10001;
    break;
    case '5':
      randomRange = 1000001;
    break;
              
    default:console.log("Not number");
    break;
  }
  startTestQuestion()
}

function startTestQuestion() {
  if (symbol != '' && level > 0) {
    calculateTest();
  }
  showScoreInformation();
}

//Afficher le score et les options 

function showScoreInformation(){
  document.getElementById('score').innerHTML=`
  <p>Score : ${score}/10</p>
  <p>Expression : ${symbol} </p>
  <p>Level : ${level}</p>
  `;
}

//Préparer le test
function calculateTest(){
 
  document.getElementById('result').innerHTML='';
 
  number1 = Math.floor(Math.random()*(randomRange));
  number2 = Math.floor(Math.random()*(randomRange));
 
  switch(symbol){
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case 'x': 
      result = number1 * number2;
    break;
      case '/':
      if (number2 === 0) {
          result = (number1 / number2 +1).toFixed(2);
          
      }else{
          result = (number1 / number2).toFixed(2);
      }
      break;
  };
  testQuestion();
}


 //afficher le test
function testQuestion(){
           
  //hide level and expression option
  document.getElementById('level').innerHTML='';
             
  //show math question
  document.getElementById('calcul').innerHTML= `
      <div>
        <span>${number1} ${symbol} ${number2} =</span>
      </div>
        <input type="number" id="playerInput">
      <div>
        <button class="button" id="valider" onclick="setUserInput()">valider</button>
      </div>`
  document.getElementById("playerInput").focus();
  document.getElementById("playerInput").addEventListener("keydown",(value) =>{
     if (value.key === 'Enter')
     setUserInput()
  })
  
}
function onKeydown(value){
 
}

//Récupérer le résultat de l’utilisateur.
function setUserInput(){
  let inputUserResult = parseFloat(document.getElementById('playerInput').value);
    console.log(inputUserResult);
  if(!isNaN(inputUserResult)){
    userInput = inputUserResult;
    checkUserResult();
  }else{
    alert(' no number found in input !')
  }
}

//Afficher le résultat du test.
function checkUserResult(){
  document.getElementById('calcul').innerHTML='';
  if (userInput == result){
    document.getElementById('result').innerHTML=`
    <div id="goodanswer">
      <div>${number1} ${symbol} ${number2} = ${userInput} bonne réponse !</div>
    </div>`;
    score++;
  }else {
    document.getElementById('result').innerHTML=`
    <div id="wronganswer">
      <div>${number1} ${symbol} ${number2} = ${userInput} Mauvaise réponse le résultat attendu était : ${result} !</div>
    </div>`;
  }
  counter++;
  showScoreInformation();
  if(counter < 10){
  setTimeout(calculateTest,3000)
  }else{

    setTimeout(fin,3000)
    function fin(){

      document.getElementById('score').innerHTML='';
      document.getElementById('calcul').innerHTML='';
      document.getElementById('result').innerHTML=`<div>Ton score est de : ${score}/10</div>`;
    }
  }
}
