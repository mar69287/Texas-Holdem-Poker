const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []
let playerArray = []; let dealerArray = []
let copyPlayerArray = []; let copyDealerArray = []
let multiple = {}; let multiple2 = {}; let multiple3 = {}; let multiple4 = {}
let playerMultiple = {}; let playerMultiple2 = {}; let playerMultiple3 = {}; let playerMultiple4 = {}
let dealerMultiple = {}; let dealerMultiple2 = {}; let dealerMultiple3 = {}; let dealerMultiple4 = {}
let playerRankObject = {}; let playerObjectCopy = {}
let winnerResult = false

function generateDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
             deck.push({
                'face': suit + face,
            })
        })
    })
}
generateDeck()
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
shuffleDeck()
renderDeck()


    let faceVal = 1
    let counter = 0
    const checkBtn = document.getElementById("check")
    checkBtn.addEventListener("click", function(evt) {
        counter++

        if(counter===1) {
            for(let i = 4; i < 7; i++) {
                const cardEl = document.createElement('div')
                cardEl.className = 'card ' +  deck[i].face 
                document.querySelector('.community-container').append(cardEl)
            }
        }
        
        if((counter > 1) && (counter < 4)) {
            const cardEl = document.createElement('div')
            cardEl.className = 'card ' + deck[counter + 5].face
            document.querySelector('.community-container').append(cardEl)
        }

        if(counter === 4) {
            document.getElementById("check").disabled = true;
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
        }

    });


const foldBtn = document.getElementById("fold")
foldBtn.addEventListener("click", function(evt) {
    if(winnerResult === true) {
        document.getElementById("winner").style.zIndex = "-2"
        winnerResult = false
    }
    counter = 0
    faceVal = 1
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
});

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
                const playerHand = array.filter(function(spade) { return spade.includes("s")})
                return true
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if (array[i].includes("c")) {
            clubCounter++
            if (clubCounter >= 5) {
                const playerHand = array.filter(function(club) { return club.includes("c")})
                return true
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if (array[i].includes("h")) {
            heartCounter++
            if (heartCounter >= 5) {
                const playerHand = array.filter(function(heart) { return heart.includes("h")})
                return true
            }
        }    
    }

    for (let i = 0; i < 7; i++) {
        if (array[i].includes("d")) {
            diamondCounter++
            if (diamondCounter >= 5) {
                const playerHand = array.filter(function(diamond) { return diamond.includes("d")})
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

        if(checkStraight(playerHand)) {
            if(playerHand[0] === 14) {
                // playerRank.push(1)
                playerRankObject["Royal Flush"] = 1
            } else {
                // playerRank.push(2)
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
        // playerRank.push(3)
        playerRankObject["Four of a Kind"] = 3
    } 

    if(Object.keys(multiple3).length>1) {
        // playerRank.push(4)
        playerRankObject["Full House"] = 4
    } else if((Object.keys(multiple3).length>0) && (Object.keys(multiple2).length>0)) {
        playerRankObject["Full House"] = 4
    }

    copyPlayerHand(checkArray)
    if(checkFlush(copyPlayerArray)) {
        // playerRank.push(5)
        playerRankObject["Flush"] = 5
    }

    removeSuits(copyPlayerArray)
    sortPlayerArray(copyPlayerArray)
    if(checkStraight(copyPlayerArray)) {
        // playerRank.push(6)
        playerRankObject["Straight"] = 6
    }

    if(Object.keys(multiple3).length>0) {
        // playerRank.push(7)
        playerRankObject["Three of a Kind"] = 7
    } 

    if(Object.keys(multiple2).length>1) {
        // playerRank.push(8)
        playerRankObject["Two Pair"] = 8
    } else if(Object.keys(multiple2).length === 1) {
        // playerRank.push(9)
        playerRankObject["Pair"] = 9
    } else {
        // playerRank.push(10)
        playerRankObject["High Card"] = 10
    }
}

function checkWinner(playerObj, dealerObj) {
    const playerRank = Object.keys(playerObj)[0]
    const dealerRank = Object.keys(dealerObj)[0]
    winnerResult = true
    const div = document.getElementById("winner")
    div.style.zIndex = "5";

    if(Object.values(playerObj)[0] < Object.values(dealerObj)[0]) {
        div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`
    } else if(Object.values(playerObj)[0] > Object.values(dealerObj)[0]) {
        div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`
    } else if(Object.values(playerObj)[0] === Object.values(dealerObj)[0]) {
        div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`
        console.log(playerObj) //hand ranks
        console.log(dealerObj)
        console.log(playerMultiple2)
        console.log(dealerMultiple2)
        tiebreaker(playerObj, dealerObj)
    }
    
}

function tiebreaker(playerObj, dealerObj) {
    console.log(playerMultiple)
    console.log(dealerMultiple)
    console.log(playerArray)
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
        if(playerArray[0] > dealerArray[0]) {
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater High Card`
        }else if(playerArray[0] < dealerArray[0]) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater High Card`
        } else {
            return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same High Card`
        }
    }else if(Object.values(playerObj)[0] === 9) {
        if(playerKey === dealerKey) {
            const playerHigh = parseInt(Object.keys(playerMultiple2)[0], 10)
            const dealerHigh = parseInt(Object.keys(dealerMultiple2)[0], 10)
            removeSuits(playerArray)
            sortPlayerArray(playerArray)
            removeSuits(dealerArray)
            sortPlayerArray(dealerArray)
            let playerResult = false;
            let dealerResult = false;
            if(playerHigh !== playerArray[0]) {
                playerResult = true
            }
            if(dealerHigh !== dealerArray[0]) {
                dealerResult = true
            }
            if(dealerResult && playerResult) {
                if(dealerArray[0] > playerArray[0]) {
                    return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer also has Greater Kicker`
                }else if(dealerArray[0] < playerArray[0]) {
                    return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`  + "<br/>" + `Player also has Greater Kicker`
                }else {
                    return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both have Same Pair with Same High Kicker`
                }
            }else {
                if(dealerArray[2] > playerArray[2]) {
                    return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer also has Greater Kicker`
                }else if(dealerArray[2] < playerArray[2]) {
                    return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}`  + "<br/>" + `Player also has Greater Kicker`
                }else {
                    return div.innerHTML = `Draw!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Both also have Same Kicker`
                }
                
            } 
        } else if(playerKey > dealerKey) {
            div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Higher pair`
        } else {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Higher pair`
        }
    } else if(Object.values(playerObj)[0] === 8) {
        const playerHigh = parseInt(Object.keys(playerMultiple2).pop(), 10)
        const dealerHigh = parseInt(Object.keys(dealerMultiple2).pop(), 10)
        const playerHigh2 = parseInt(Object.keys(Object.keys(playerMultiple2).length-1, 10)
        const dealerHigh2 = parseInt(Object.keys(Object.keys(dealerMultiple2).length-1, 10)
        if(playerHigh > dealerHigh) {
            return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater Pairs`
        }else if(playerHigh < dealerHigh) {
            return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater pair`
        }else {
            if (playerHigh2 > dealerHigh2) {
                return div.innerHTML = `Player Wins!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Player has Greater 2nd Pair`
            }else  if (playerHigh2 < dealerHigh2) {
                return div.innerHTML = `Dealer Wins! Better luck next time!` + "<br/>" + `Player has: ${playerRank} and Dealer has: ${dealerRank}` + "<br/>" + `Dealer has Greater 2nd Pair`
            }
        }
         
    }

}