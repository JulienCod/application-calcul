let number1 = 1;
let number2 = 2;
let userInput = 0;
let result = 0;
let symbol = "";
let level=0;
let randomRange = 0;
let score = 0;
let counter = 0;
// variable configuration perso
let valeurMin = 0;
let valeurMax = 0;
let secondNumber = 0;




document.getElementById("level").innerHTML=`
<div id="welcome">
  <h2>Bienvenue</h2>
  <p>Dans cette application vous allez avoir le choix entre : </p><br />
  <p>1) Des calculs personalisés afin de s'adapté a vos exercices.<button class="button" value="1" onclick="calculPerso()">CLIQUEZ ICI</button></p><br />
  <p>2) Des calculs aléatoires avec plusieur niveaux de difficulté.<button class="button" value="2" onclick="screenLevel()">CLIQUEZ ICI</button></p><br />
</div>`



function calculPerso(){
  document.getElementById("level").innerHTML=`
  <div id="calculPerso">
    <div id="typeCalcul">
      <p>Type de calcul</p>
      <button class="button" value='+' onclick="setSymbolPerso(this)">+</button>
      <button class="button" value='-' onclick="setSymbolPerso(this)">-</button>
      <button class="button" value='x' onclick="setSymbolPerso(this)">x</button>
      <button class="button" value='/' onclick="setSymbolPerso(this)">/</button>
    </div>

    <div id="configPerso">
      <p>Configuration</p>
      
      <label for="intervalValue">Interval entre :</label>
      <input type="number" name="valueMin" id="valueMin" placeholder="Valeur minimum">
      <input type="number" name="valueMax" id="valueMax" placeholder="Valeur maximum">
      <label for="">Deuxième nombre :</label>
      <input type="number" name="twoNum" id="twoNum" placeholder="Entrer une valeur">
      <button class="button" onclick="configCalculPerso()">Valider</button>
    </div>
  </div>`  
}
function configCalculPerso(){
  let inputValueMin = parseFloat(document.getElementById('valueMin').value);
  let inputValueMax = parseFloat(document.getElementById('valueMax').value);
  let inputSecondNumber = parseFloat(document.getElementById('twoNum').value);

  valeurMin = inputValueMin;
  valeurMax = inputValueMax;
  secondNumber = inputSecondNumber;
    
  if(!isNaN(valeurMin) && !isNaN(valeurMax) && !isNaN(secondNumber) ){
    if(symbol !==""){
      level = "Profil personnalisé"
      calculateTest(1);
      showScoreInformation();
    }else{
      alert(' veuillez sélectionner un type de calcul !')
    }
  }else{
    alert(' veuillez remplir tous les champs !')
  }
}

function screenLevel(){
  
  document.getElementById("level").innerHTML=`
  <div >
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
}


function setSymbolPerso(sym){
  symbol = sym.value;
}

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
      randomRange = 21;
    break;
    case '3':
      randomRange = 31;
    break;
    case '4':
      randomRange = 41;
    break;
    case '5':
      randomRange = 51;
    break;
              
    default:console.log("Not number");
    break;
  }
  startTestQuestion()
}

function startTestQuestion() {
  if (symbol != '' && level > 0) {
    calculateTest(2);
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

//La fonctionne calculateTest reçois un numbre en argument afin de gérer le cas du calcul aléatoire (num=2) de la configuration perso (num=1);
function calculateTest(num){
 
  document.getElementById('result').innerHTML='';
  if(num === 1){
    number1 = Math.floor(Math.random()*(valeurMax - valeurMin) + valeurMin);
    number2 = secondNumber;
  }else if (num === 2){
    number1 = Math.floor(Math.random()*(randomRange));
    number2 = Math.floor(Math.random()*(randomRange));
  }
 
 
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
  testQuestion(num);
}

 //afficher le test
function testQuestion(num){
           
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
     setUserInput(num)
  })
}

//Récupérer le résultat de l’utilisateur.
function setUserInput(num){
  let inputUserResult = parseFloat(document.getElementById('playerInput').value);
    console.log(inputUserResult);
  if(!isNaN(inputUserResult)){
    userInput = inputUserResult;
    checkUserResult(num);
  }else{
    alert(' Veuillez saisir une valeur !')
  }
}

//Afficher le résultat du test.
function checkUserResult(num){
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
  setTimeout(calculateTest,3000, num)
  }else{

    setTimeout(fin,3000)
    function fin(){

      document.getElementById('score').innerHTML='';
      document.getElementById('calcul').innerHTML='';
      document.getElementById('result').innerHTML=`<div>Ton score est de : ${score}/10</div>`;
    }
  }
}