
import data from "./data.js"
import { Character } from "./Character.js"

let isWaiting = false
let monstersArray = ["orc", "demon", "goblin"]

function getNewMonster() {
    const nextMonsterData = data[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}


function render() {
    document.getElementById('hero').innerHTML = wizard.characterHtml()
    document.getElementById('monster').innerHTML = monster.characterHtml()
}

function attack(){
    if(!isWaiting){
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDice)
    monster.takeDamage(wizard.currentDice) 
    render()

    if(wizard.dead){
         endGame()
}
        else if(monster.dead){
            isWaiting = true
            setTimeout(()=>{
                if(monstersArray.length > 0){
                    console.log(monstersArray)
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                }
                else{
                    endGame()
                }
            },1500)
        }  
        
}
}


function endGame(){
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                     <button id="restart-button">Restart Game</button>
                </div>
                `
                document.getElementById('restart-button').addEventListener('click', restartGame);
        }, 1500)
}
function restartGame() {
    document.body.innerHTML = `
    <main>
        <div id="hero"></div>
        <div id="monster"></div>
    </main>
    <section id="actions">
        <button id="attack-button">Attack</button>
    </section>
`;
    console.log('restart')
    isWaiting = false;
    monstersArray = ["orc", "demon", "goblin"];
    wizard = new Character(data.hero);
    monster = getNewMonster();
    render();
    document.getElementById('attack-button').addEventListener("click", attack);
}





document.getElementById('attack-button').addEventListener("click",attack)

let wizard = new Character(data.hero)
let monster = getNewMonster()
render()