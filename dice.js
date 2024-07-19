function getDiceArrRadom(diceCount){
    return new Array(diceCount).fill(0).map(() =>   Math.floor(Math.random() * 6) + 1)
}

function getDice(diceCount){
    return new Array(diceCount).fill(0).map(item => `<div class="placeholder-dice"></div>`).join("")
}

const getPercentage = (remainingHealth, maximumHealth) => 
    remainingHealth/maximumHealth*100

export {getDice ,getDiceArrRadom ,getPercentage}

