const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []
let playerArray = []; let dealerArray = []
let copyPlayerArray = []; let copyDealerArray = []
let multiple = {}; let multiple2 = {}; let multiple3 = {}; let multiple4 = {}
let playerMultiple = {}; let playerMultiple2 = {}; let playerMultiple3 = {}; let playerMultiple4 = {}
let dealerMultiple = {}; let dealerMultiple2 = {}; let dealerMultiple3 = {}; let dealerMultiple4 = {}
let playerRankObject = {}; let playerObjectCopy = {}
let playerHand = []; let dealerHand = []
let winnerResult = false
let faceVal = 1
let counter = 0
const checkBtn = document.getElementById("check")
const foldBtn = document.getElementById("fold")
const raiseBtn = document.getElementById("raise")
const submitBtn = document.getElementById("submit")
const playerName = document.getElementById("name")
let playerMoney = 2000
const bank = document.getElementById("bank")
const user = document.getElementById("userName")
const betting = document.getElementById("betting")
const winnings = document.getElementById("winnings")
raiseBtn.disabled = true;
let betTotal = 0
let bet = 200
let moneyCounter = 0
let potential = bet + betTotal

generateDeck()
shuffleDeck()
renderDeck()

submitBtn.addEventListener("click", function(evt) {
    var name = playerName.value
    if (name !== "") {
        evt.preventDefault()
        document.querySelector("form").style.zIndex = "-4"
    }
    user.innerHTML = name
    bank.innerHTML = "Bank: $" + playerMoney
    betting.innerHTML = "Bet total: $" + betTotal
    winnings.innerHTML = "Potential Winnings: $" + betTotal
})

checkBtn.addEventListener("click", function(evt) {
    counter++
    checkBtn.innerHTML = "CHECK"
    foldBtn.innerHTML = "FOLD"
    

    if(counter===1) {
        playerMoney = playerMoney - 100
        bank.innerHTML = "Bank: $" + playerMoney
        betTotal = 100
        betting.innerHTML = "Bet total: $" + betTotal
        winnings.innerHTML = "Potential Winning: $" + 200
        checkBtn.disabled = true;
        setTimeout(function() {
            checkBtn.disabled = false;
        }, 1500);
        for(let i = 4; i < 7; i++) {
            setTimeout(function() {
                if (i===4) {
                    const cardEl = document.createElement('div')
                    cardEl.className = 'card ' +  deck[i].face 
                    document.querySelector('.community-container').append(cardEl)
                    raiseBtn.disabled = false;
                }
            }, 300); 
            setTimeout(function() {
                if (i===5) {
                    const cardEl = document.createElement('div')
                    cardEl.className = 'card ' +  deck[i].face 
                    document.querySelector('.community-container').append(cardEl)
                    raiseBtn.disabled = false;
                }
            }, 600);
            setTimeout(function() {
                if (i===6) {
                    const cardEl = document.createElement('div')
                    cardEl.className = 'card ' +  deck[i].face 
                    document.querySelector('.community-container').append(cardEl)
                    raiseBtn.disabled = false;
                }
            }, 1200);      
        }
    }
    
    if((counter > 1) && (counter < 4)) {
        checkBtn.disabled = true;
        setTimeout(function() {
            checkBtn.disabled = false;
        }, 1500);
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + deck[counter + 5].face
        document.querySelector('.community-container').append(cardEl)
    }

    if(counter === 4) {
        checkBtn.disabled = true;
        raiseBtn.disabled = true;
        counter = 0
        for(i = 0; i < 2; i++) {
            const cards = document.querySelectorAll(".back") 
            cards.forEach(function(card) {
                card.classList.remove("back")
                card.classList.add(deck[i + faceVal].face)
                faceVal = 3
            })
        }

        createPlayerArray(playerArray, 0, 2)
        checkPlayerRank(playerArray)
        copyRank(playerRankObject)
        copyPlayerMultiples()
        reset()
        createPlayerArray(dealerArray, 1, 3)
        checkPlayerRank(dealerArray)
        copydealerMultiples()
        checkWinner(playerObjectCopy, playerRankObject)
        foldBtn.innerHTML = "AGAIN?"
    }

});

foldBtn.addEventListener("click", function(evt) {
    raiseBtn.disabled = true;
    foldBtn.innerHTML = "FOLD"
    checkBtn.innerHTML = "PLAY"
    foldBtn.disabled = true;
    setTimeout(function() {
        foldBtn.disabled = false;
    }, 1500);
    if (checkBtn.innerHTML === "PLAY") {
        foldBtn.innerHTML = "RESET"
    }
    if(winnerResult === true) {
        // document.getElementById("winner").style.zIndex = "-2"
        document.getElementById("winner").classList.remove("winner")
        winnerResult = false
    }
    counter = 0
    moneyCounter = 0
    faceVal = 1
    betTotal = 0
    bet = 200
    const cards = document.querySelectorAll(".card") 
    cards.forEach(card => card.remove())
    shuffleDeck()
    renderDeck()
    document.getElementById("check").disabled = false;
    playerArray.splice(0, playerArray.length)
    dealerArray.splice(0, dealerArray.length)
    for (const key in playerObjectCopy) {
        delete playerObjectCopy[key]
    }
    reset()
    deletePlayerMultiples()
    deleteDealerMultiples()
    if(playerMoney < 200) {
        bet = playerMoney
    }
    if(playerMoney <= 0) {
        playerMoney = 2000
        bank.innerHTML = "$" + playerMoney
    }
    betting.innerHTML = "Bet total: $" + 0
    winnings.innerHTML = "Potential Winning: $" + 0
    const div = document.getElementById("winner")
    div.innerHTML = ""
});

raiseBtn.addEventListener("click", function(evt){
    moneyCounter++
    if(counter < 4 ) {
        playerMoney = playerMoney - bet
        bank.innerHTML = "$" + playerMoney
        betTotal = betTotal + bet
        betting.innerHTML = "Bet total: $" + betTotal
        potential = betTotal * 2
        winnings.innerHTML = "Potential Winnings: $" + potential  
        raiseBtn.disabled = true;
        if(playerMoney === 0) {
            raiseBtn.disabled = true;
        }else {
            setTimeout(function() {
            raiseBtn.disabled = false;
            }, 1000);
        }
    }
    if(playerMoney <= 200) {
        bet = playerMoney
    }
})

function generateDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
             deck.push({
                'face': suit + face,
            })
        })
    })
}

function shuffleDeck() {
    deck.forEach(function(value, idx) {
        let placeHolder = deck[idx]
        let int = Math.floor(Math.random() * 52)
        deck[idx] = deck[int]
        deck[int] = placeHolder
        
    }) 
}

function renderDeck() {
    
    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + deck[0].face
        document.querySelector("#player").append(cardEl)
    }, 300)

    
    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card back'
        document.querySelector('#dealer').append(cardEl)
        
    }, 600)

    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + deck[2].face
        document.querySelector("#player").append(cardEl)
    }, 1200)

    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card back' 
        document.querySelector('#dealer').append(cardEl)
    }, 1500)

}

function createPlayerArray(array, val1, val2) {
    array.push(deck[val1].face)
    array.push(deck[val2].face)
    for (let i = 4; i < 9; i++) {
        array.push(deck[i].face)
    }
}


function copyPlayerHand(array) {
    array.forEach(function(val, idx) {
        copyPlayerArray[idx] = val
    })
    
}

function checkStraight(array) {

    let size = array.length

    if (size === 7) {
        if (array[3] - array[4] !== 1) {
            if (array[3] === array[4]) {
                array.splice(3, 1)
            }
        } 
        if (array[2] - array[3] !== 1) {
            if (array[2] === array[3]) {
                array.splice(3, 1)
            }
        }
    }

    if (array.length > 5) {
  
        if (array[0] - array[1] !== 1) {
          if (array[0] === array[1]) {
                array.splice(0, 1)
                if (array[0] - array[1] !== 1) {
                    array.splice(0, 1)
                }
          }else if (array[1] - array[2] !== 1) {
                array.splice(0, 2)
          }else {
                array.splice(0, 1)
          }        
        }else if (array[1] - array[2] !== 1) {
            if (array[1] === array[2]) {
                array.splice(1, 1)
            }else {
                array.splice(0, 2)
            }
        }

        size = array.length

        if (array[size-3] - array[size-2] !== 1) {
            if (array[size-3] === array[size-2]) {
                if (array[size-2] === array[size-1]) {
                    array.splice(size-2, 2)
                }else if (array[size-2] - array[size-1] !== 1) {
                    array.splice(size-2, 2)
                }else if (array[size-2] - array[size-1] === 1) {
                    array.splice(size-2, 1)
                }
            } else {
                array.splice(size-2, 2)
            }
        }
        if (array[size-2] - array[size-1] !== 1) {
            array.splice(size-1, 1)
        }
    }

    let result = null;

    if (array.length > 4) {
      
       result = array.every(function(value, idx) {
            if(value === array[0]) {
              return true
            } 
            if(array[idx-1] - value === 1) {
              return true
            } else return false  
        })
      
    } else result = false
    
    if (result) {
        return true
    } else return false
    
}

function checkFlush(array) {
    
    let spadeCounter = 0;
    let clubCounter = 0;
    let heartCounter = 0;
    let diamondCounter = 0;

    for (let i = 0; i < 7; i++) {
        if (array[i].includes("s")) {
            spadeCounter++
            if (spadeCounter >= 5) {
                array = array.filter(function(spade) { return spade.includes("s")})
                return true
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if (array[i].includes("c")) {
            clubCounter++
            if (clubCounter >= 5) {
                array = array.filter(function(club) { return club.includes("c")})
                return true
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if (array[i].includes("h")) {
            heartCounter++
            if (heartCounter >= 5) {
                array = array.filter(function(heart) { return heart.includes("h")})
                return true
            }
        }    
    }

    for (let i = 0; i < 7; i++) {
        if (array[i].includes("d")) {
            diamondCounter++
            if (diamondCounter >= 5) {
                array = array.filter(function(diamond) { return diamond.includes("d")})
                return true
            }     
        }   
    }
    return false
}

function removeSuits(array) {
    array.forEach(function(value,idx) {
        array[idx] = value.substring(1, array.length)
    })
}

function sortPlayerArray(array) {
    array.forEach(function(value, idx) {
        if (isNaN(value) !== true) {
          array[idx] = parseInt(value, 10)
        }
        if (array[idx] === "J") {
          array[idx] = 11
        }
        if (array[idx] === "Q") {
          array[idx] = 12
        }
        if (array[idx] === "K") {
          array[idx] = 13
        }
        if (array[idx] === "A") {
          array[idx] = 14
        }
    })

    array.sort(function(a, b) { return b - a })
}

function checkMultiples(array, val) {
let result = null;

    const tally = array.reduce((value, vote) => {
        value[vote] = value[vote] ? value[vote] + 1 : 1;
        return value;
    }, {});  

    for (const key in tally) {
        if (tally[key] === val) {
        multiple[`${key}`] = tally[key]
        }
    }

    if(Object.keys(multiple).length > 0) {
        for (const key in multiple) {
            if (multiple[key] === val) {
                result =  true
            }
        }
    } else {
        result = false
    }

    if (result) {
        return multiple
    } else return false
}

function copyPlayerMultiples() {

    if(Object.keys(multiple).length > 0) {
        for (const key in multiple) {
            playerMultiple[`${key}`] = multiple[key]
        }
    }    
    if(Object.keys(multiple4).length > 0) {
        for (const key in multiple4) {
            playerMultiple4[`${key}`] = multiple4[key]
        }
    }
    if(Object.keys(multiple3).length > 0) {
        for (const key in multiple3) {
            playerMultiple3[`${key}`] = multiple3[key]
        }
    }
    if(Object.keys(multiple2).length > 0) {
        for (const key in multiple2) {
            playerMultiple2[`${key}`] = multiple2[key]
        }
    }

}

function copydealerMultiples() {

    if(Object.keys(multiple).length > 0) {
        for (const key in multiple) {
            dealerMultiple[`${key}`] = multiple[key]
        }
    }
    if(Object.keys(multiple4).length > 0) {
        for (const key in multiple4) {
            dealerMultiple4[`${key}`] = multiple4[key]
        }
    }
    if(Object.keys(multiple3).length > 0) {
        for (const key in multiple3) {
            dealerMultiple3[`${key}`] = multiple3[key]
        }
    }
    if(Object.keys(multiple2).length > 0) {
        for (const key in multiple2) {
            dealerMultiple2[`${key}`] = multiple2[key]
        }
    }

}

function copyRank(obj) {
    for (const key in obj) {
        playerObjectCopy[`${key}`] = obj[key]
    }
}

function reset() {
    if(Object.keys(multiple).length > 0) {
        for (const key in multiple) {
            delete multiple[key]
        }
    }
    if(Object.keys(multiple4).length > 0) {
        for (const key in multiple4) {
            delete multiple4[key]
        }
    }
    if(Object.keys(multiple3).length > 0) {
        for (const key in multiple3) {
            delete multiple3[key]
        }
    }
    if(Object.keys(multiple2).length > 0) {
        for (const key in multiple2) {
            delete multiple2[key]
        }
    }
    if(Object.keys(playerRankObject).length > 0) {
        for (const key in playerRankObject) {
            delete playerRankObject[key]
        }
    }
    if(Object.keys(playerRankObject).length > 0) {
        for (const key in playerRankObject) {
            delete playerRankObject[key]
        }
    }

}

function deletePlayerMultiples() {

    if(Object.keys(playerMultiple).length > 0) {
        for (const key in playerMultiple) {
            delete playerMultiple[key]
        }
    }
    if(Object.keys(playerMultiple4).length > 0) {
        for (const key in playerMultiple4) {
            delete playerMultiple4[key]
        }
    }
    if(Object.keys(playerMultiple3).length > 0) {
        for (const key in playerMultiple3) {
            delete playerMultiple3[key]
        }
    }
    if(Object.keys(playerMultiple2).length > 0) {
        for (const key in playerMultiple2) {
            delete playerMultiple2[key]
        }
    }
}

function deleteDealerMultiples() {

    if(Object.keys(dealerMultiple).length > 0) {
        for (const key in dealerMultiple) {
            delete dealerMultiple[key]
        }
    }
    if(Object.keys(dealerMultiple4).length > 0) {
        for (const key in dealerMultiple4) {
            delete dealerMultiple4[key]
        }
    }
    if(Object.keys(dealerMultiple3).length > 0) {
        for (const key in dealerMultiple3) {
            delete dealerMultiple3[key]
        }
    }
    if(Object.keys(dealerMultiple2).length > 0) {
        for (const key in dealerMultiple2) {
            delete dealerMultiple2[key]
        }
    }
}

function twoThreeFour() {
    for (const key in multiple) {
        if (multiple[key] === 4) {
        multiple4[`${key}`] = multiple[key]
        }
    }
    for (const key in multiple) {
        if (multiple[key] === 3) {
        multiple3[`${key}`] = multiple[key]
        }
    }
    for (const key in multiple) {
        if (multiple[key] === 2) {
        multiple2[`${key}`] = multiple[key]
        }
    }

}

function checkPlayerRank(checkArray) {
    let playerHand = []
    copyPlayerHand(checkArray)

    if (checkFlush(copyPlayerArray)) {
        removeSuits(copyPlayerArray)
        sortPlayerArray(copyPlayerArray)
        if(checkStraight(copyPlayerArray)) {
            if(playerHand[0] === 14) {
                playerRankObject["Royal Flush"] = 1
            } else {
                playerRankObject["Straight Flush"] = 2
            }
        }
    }

    copyPlayerHand(checkArray)
    removeSuits(copyPlayerArray)
    sortPlayerArray(copyPlayerArray)
    checkMultiples(copyPlayerArray, 4)
    checkMultiples(copyPlayerArray, 3)
    checkMultiples(copyPlayerArray, 2)
    twoThreeFour()
    
    if(Object.keys(multiple4).length>0) {

        playerRankObject["Four of a Kind"] = 3
    } 

    if(Object.keys(multiple3).length>1) {
        playerRankObject["Full House"] = 4
    } else if((Object.keys(multiple3).length>0) && (Object.keys(multiple2).length>0)) {
        playerRankObject["Full House"] = 4
    }

    copyPlayerHand(checkArray)
    if(checkFlush(copyPlayerArray)) {
        playerRankObject["Flush"] = 5
    }

    removeSuits(copyPlayerArray)
    sortPlayerArray(copyPlayerArray)
    if(checkStraight(copyPlayerArray)) {
        playerRankObject["Straight"] = 6
    }

    if(Object.keys(multiple3).length>0) {
        playerRankObject["Three of a Kind"] = 7
    } 

    if(Object.keys(multiple2).length>1) {
        playerRankObject["Two Pair"] = 8
    } else if(Object.keys(multiple2).length === 1) {
        playerRankObject["Pair"] = 9
    } else {
        playerRankObject["High Card"] = 10
    }
}

function checkWinner(playerObj, dealerObj) {
    const playerRank = Object.keys(playerObj)[0]
    const dealerRank = Object.keys(dealerObj)[0]
    winnerResult = true
    const div = document.getElementById("winner")
    div.classList.add("winner")
    // div.style.zIndex = "5";

    if(Object.values(playerObj)[0] < Object.values(dealerObj)[0]) {
        playerMoney = playerMoney + betTotal*2
        bank.innerHTML = "$" + playerMoney
        div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`
    } else if(Object.values(playerObj)[0] > Object.values(dealerObj)[0]) {
        div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`
    } else if(Object.values(playerObj)[0] === Object.values(dealerObj)[0]) {
        div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`
        tiebreaker(playerObj, dealerObj)
    }
    
}

function tiebreaker(playerObj, dealerObj) {

    const div = document.getElementById("winner")
    const playerRank = Object.keys(playerObj)[0]
    const dealerRank = Object.keys(dealerObj)[0]
    const playerKey = parseInt(Object.keys(playerMultiple2)[0], 10)
    const dealerKey = parseInt(Object.keys(dealerMultiple2)[0], 10)

    if(Object.values(playerObj)[0] === 10) {
        removeSuits(playerArray)
        sortPlayerArray(playerArray)
        removeSuits(dealerArray)
        sortPlayerArray(dealerArray)
        for (let i = 0; i < 5; i++) {
            if(playerArray[i] > dealerArray[i]) {
                playerMoney = playerMoney + betTotal*2
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater High Cards`
            }else if(playerArray[i] < dealerArray[i]) {
                return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater High Cards`
            }
            if(i === 4) {
                playerMoney = playerMoney + betTotal
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Hand`
            }
        }
    }else if(Object.values(playerObj)[0] === 9) {
        if(playerKey === dealerKey) {
            const playerHigh = parseInt(Object.keys(playerMultiple2)[0], 10)
            const dealerHigh = parseInt(Object.keys(dealerMultiple2)[0], 10)
            removeSuits(playerArray)
            sortPlayerArray(playerArray)
            removeSuits(dealerArray)
            sortPlayerArray(dealerArray)
            playerArray = playerArray.filter(function(value){return (value !== playerKey)})
            dealerArray = dealerArray.filter(function(value){return (value !== dealerKey)})
            for (let i = 0; i < 3; i++) {
                if(playerArray[i] > dealerArray[i]) {
                    playerMoney = playerMoney + betTotal*2
                    bank.innerHTML = "$" + playerMoney
                    return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Same Pair plus Greater High Card`
                }else if(playerArray[i] < dealerArray[i]) {
                    return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Same pair plus Greater High Card`
                }
                if(i === 2) {
                    playerMoney = playerMoney + betTotal
                    bank.innerHTML = "$" + playerMoney
                    return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Pair and Kickers`
                }
            }
        } else if(playerKey > dealerKey) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Higher pair`
        } else {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Higher pair`
        }
    }else if(Object.values(playerObj)[0] === 8) {
        const playerHigh = parseInt(Object.keys(playerMultiple2).pop(), 10)
        const dealerHigh = parseInt(Object.keys(dealerMultiple2).pop(), 10)
        const playerHigh2 = parseInt(Object.keys(playerMultiple2)[Object.keys(playerMultiple2).length-2], 10)
        const dealerHigh2 = parseInt(Object.keys(dealerMultiple2)[Object.keys(dealerMultiple2).length-2], 10)
        
        if(playerHigh > dealerHigh) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater First Pair`
        }else if(playerHigh < dealerHigh) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater First Pair`
        }else {
            if (playerHigh2 > dealerHigh2) {
                playerMoney = playerMoney + betTotal*2
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater 2nd Pair`
            }else  if (playerHigh2 < dealerHigh2) {
                return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater 2nd Pair`
            }else {
                removeSuits(playerArray)
                sortPlayerArray(playerArray)
                playerArray = playerArray.filter(function(value){return (value !== playerHigh2)})
                playerArray = playerArray.filter(function(value){return (value !== playerHigh)})
                removeSuits(dealerArray)
                sortPlayerArray(dealerArray)
                dealerArray = dealerArray.filter(function(value){return (value !== dealerHigh2)})
                dealerArray = dealerArray.filter(function(value){return (value !== dealerHigh)})
                if (playerArray[0] > dealerArray[0]) {
                    playerMoney = playerMoney + betTotal*2
                    bank.innerHTML = "$" + playerMoney
                    return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Kicker`
                } else if (playerArray[0] < dealerArray[0]) {
                    return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Kicker`
                } else {
                    playerMoney = playerMoney + betTotal
                    bank.innerHTML = "$" + playerMoney
                    return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both also have Same Kicker`
                }
            }
        }
         
    }else if(Object.values(playerObj)[0] === 7) {
        const playerHigh = parseInt(Object.keys(playerMultiple3)[0], 10)
        const dealerHigh = parseInt(Object.keys(dealerMultiple3)[0], 10)
        if (playerHigh > dealerHigh) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Higher Three of a Kind`
        }else if (playerHigh < dealerHigh) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Higher Three of a Kind`
        } else {
            removeSuits(playerArray)
            sortPlayerArray(playerArray)
            removeSuits(dealerArray)
            sortPlayerArray(dealerArray)
            playerArray = playerArray.filter(function(value){return (value !== playerHigh)})
            dealerArray = dealerArray.filter(function(value){return (value !== dealerHigh)})
            if (playerArray[0] > dealerArray[0]) {
                playerMoney = playerMoney + betTotal*2
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Kicker`
            } else if (playerArray[0] < dealerArray[0]) {
                return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Kicker`
            } else {
                if (playerArray[1] > dealerArray[1]) {
                    playerMoney = playerMoney + betTotal*2
                    bank.innerHTML = "$" + playerMoney
                    return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater 2nd Kicker`
                } else if (playerArray[1] < dealerArray[1]) {
                    return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater 2nd Kicker`
                }else {
                    playerMoney = playerMoney + betTotal
                    bank.innerHTML = "$" + playerMoney
                    return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both also have Same Kickers`
                }
            }
        }
    }else if(Object.values(playerObj)[0] === 6) {
        removeSuits(playerArray)
        sortPlayerArray(playerArray)
        checkStraight(playerArray)
        removeSuits(dealerArray)
        sortPlayerArray(dealerArray)
        checkStraight(dealerArray) 
        if (playerArray[0] > dealerArray[0]) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Straight`
        }else if (playerArray[0] < dealerArray[0]) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Straight`            
        } else {
            playerMoney = playerMoney + betTotal
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both also have Same Straight`
        }
    }else if(Object.values(playerObj)[0] === 5) {
        checkFlush(playerArray)
        removeSuits(playerArray)
        sortPlayerArray(playerArray)
        checkFlush(dealerArray)
        removeSuits(dealerArray)
        sortPlayerArray(dealerArray)
        if (playerHand[0] > dealerHand[0]) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Flush`
        }else if (playerHand[0] < dealerHand[0]) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Flush`
        } else {
            playerMoney = playerMoney + betTotal
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Flush`
        }
    }else if(Object.values(playerObj)[0] === 4) {
        const playerKey3 = parseInt(Object.keys(playerMultiple3)[0], 10)
        const dealerKey3 = parseInt(Object.keys(dealerMultiple3)[0], 10)
        if (playerKey3 > dealerKey3) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Full House`
        }else if (playerKey3 < dealerKey3) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Full House`
        }else {
            if (playerKey > dealerKey) {
                playerMoney = playerMoney + betTotal*2
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Full House`
            }else if (playerKey < dealerKey) {
                return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Full House`
            }else {
                playerMoney = playerMoney + betTotal
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Full House`
            }
        }
    }else if(Object.values(playerObj)[0] === 3) {
        const playerKey4 = parseInt(Object.keys(playerMultiple4)[0], 10)
        const dealerKey4 = parseInt(Object.keys(dealerMultiple4)[0], 10)
        if (playerKey4 > dealerKey4) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Four of a Kind`
        }else if (playerKey4 < dealerKey4) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Four of a Kind`
        }else {
            removeSuits(playerArray)
            sortPlayerArray(playerArray)
            removeSuits(dealerArray)
            sortPlayerArray(dealerArray)
            playerArray = playerArray.filter(function(value){return (value !== playerKey4)})
            dealerArray = dealerArray.filter(function(value){return (value !== dealerKey4)})
            if(playerArray[0] > dealerArray[0]) {
                playerMoney = playerMoney + betTotal*2
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Four of a Kind plus Greater High Card`
            }else if(playerArray[0] < dealerArray[0]) {
                return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Four of a Kind plus Greater High Card`
            }else {
                playerMoney = playerMoney + betTotal
                bank.innerHTML = "$" + playerMoney
                return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Four of a Kind`
            }
        }
    }else if(Object.values(playerObj)[0] === 2) {
        checkFlush(playerArray)
        removeSuits(playerArray)
        sortPlayerArray(playerArray)
        checkStraight(playerArray)
        checkFlush(dealerArray)
        removeSuits(dealerArray)
        sortPlayerArray(dealerArray)
        checkStraight(dealerArray)
        if(playerArray[0] > dealerArray[0]) {
            playerMoney = playerMoney + betTotal*2
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Straight Flush`
        }else if(playerArray[0] < dealerArray[0]) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater Straight Flush`
        }else {
            playerMoney = playerMoney + betTotal
            bank.innerHTML = "$" + playerMoney
            return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Straight`
        }
    }

}
