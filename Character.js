import { getDice ,getDiceArrRadom, getPercentage} from "./dice.js"

function Character(data){
    Object.assign(this, data)
    this.health = data.health
    this.currenthealth = this.health


    this.diceHtml = getDice(this.diceCount)
    

    this.setDiceHtml= function(){
       this.currentDice = getDiceArrRadom(this.diceCount)
        this.diceHtml = this.currentDice.map(item=>`<div class="dice">${item}</div>`).join("")
    }
        
    
    this.takeDamage = function (attackdame) {
        const damage = attackdame.reduce((total, num) => total + num)
        this.health -= damage
        if(this.health <= 0){
            this.dead = true
            this.health = 0
        }
        
    }
    this.getHealthBarHtml = function(){
        const percent = getPercentage(this.health,this.currenthealth)

        
        return  `<div class="health-bar-outer">
        <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
        style="width:${percent}%;">
        </div>
        </div>`

    }
    
    this.characterHtml = function(){
        const healthBar = this.getHealthBarHtml()
        const  {name, avatar ,diceHtml , health,} = this
        return `<div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}" />
        <div class="health">health: <b> ${health} </b></div>
        ${healthBar}
        <div class="dice-container">
            ${diceHtml}
        </div>
    </div>`
    }
}
export{Character}