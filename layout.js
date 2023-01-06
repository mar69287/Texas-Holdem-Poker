const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []
let playerArray = []
let multiple = {}
let multiple4 = {}
let multiple3 = {}
let multiple2 = {}
let copyPlayerArray = []
let playerRank = []
let playerRankObject = {}

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
    }, 500)

    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card back'
        document.querySelector('#dealer').append(cardEl)
    }, 1000)

    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + deck[2].face
        document.querySelector("#player").append(cardEl)
    }, 1500)

    setTimeout(function() {
        const cardEl = document.createElement('div')
        cardEl.className = 'card back' 
        document.querySelector('#dealer').append(cardEl)
    }, 2000)

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

            createPlayerArray()
            checkRank()
            //console.log(checkFlush())
            // removeSuits()
            // sortPlayerArray()
            //console.log(checkStraight())
            // checkMultiples()
        }

    });


const foldBtn = document.getElementById("fold")
foldBtn.addEventListener("click", function(evt) {
    counter = 0
    faceVal = 1
    const cards = document.querySelectorAll(".card") 
    cards.forEach(card => card.remove())
    shuffleDeck()
    renderDeck()
    document.getElementById("check").disabled = false;
    playerArray.splice(0, playerArray.length)
    reset()
});

function createPlayerArray() {
    playerArray.push(deck[0].face)
    playerArray.push(deck[2].face)
    for (let i = 4; i < 9; i++) {
        playerArray.push(deck[i].face)
    }
    console.log(playerArray)
}

function copyPlayerHand() {
    playerArray.forEach(function(val, idx) {
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

    // console.log(array)
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
    // console.log("you have a straight: " + result)
    
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
                console.log(playerHand)
                return true
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if (array[i].includes("c")) {
            clubCounter++
            if (clubCounter >= 5) {
                const playerHand = array.filter(function(club) { return club.includes("c")})
                console.log(playerHand)
                return true
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if (array[i].includes("h")) {
            heartCounter++
            if (heartCounter >= 5) {
                const playerHand = array.filter(function(heart) { return heart.includes("h")})
                console.log(playerHand)
                return true
            }
        }    
    }

    for (let i = 0; i < 7; i++) {
        if (array[i].includes("d")) {
            diamondCounter++
            if (diamondCounter >= 5) {
                const playerHand = array.filter(function(diamond) { return diamond.includes("d")})
                console.log(playerHand)
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
    if(playerRank.length>0) {
        playerRank.splice(0, playerRank.length)
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

function checkRank() {
    let playerHand = []
    copyPlayerHand()

    if (checkFlush(copyPlayerArray)) {
        removeSuits(copyPlayerArray)
        sortPlayerArray(copyPlayerArray)
        if(checkStraight(copyPlayerArray)) {
            if(copyPlayerArray[0] === 14) {
                console.log("you have a royal flush")
                playerRank.push(1)
                playerRankObject["Royal Flush"] = 1
            } else {
                console.log("you have a straight flush")
                playerRank.push(2)
                playerRankObject["Straight Flush"] = 2
            }
        }
    }

    copyPlayerHand()
    removeSuits(copyPlayerArray)
    sortPlayerArray(copyPlayerArray)
    checkMultiples(copyPlayerArray, 4)
    checkMultiples(copyPlayerArray, 3)
    checkMultiples(copyPlayerArray, 2)
    twoThreeFour()
    
    if(Object.keys(multiple4).length>0) {
        console.log("you have four of a kind")
        playerRank.push(3)
        playerRankObject["Four of a Kind"] = 3
    } 

    if(Object.keys(multiple3).length>1) {
        console.log("you have full house")
        playerRank.push(4)
        playerRankObject["Full House"] = 4
    } else if((Object.keys(multiple3).length>0) && (Object.keys(multiple2).length>0)) {
        playerRankObject["Full House"] = 4
    }

    copyPlayerHand()
    if(checkFlush(copyPlayerArray)) {
        console.log("you have a flush")
        playerRank.push(5)
        playerRankObject["Flush"] = 5
    }

    removeSuits(copyPlayerArray)
    sortPlayerArray(copyPlayerArray)
    if(checkStraight(copyPlayerArray)) {
        console.log("you have a straight")
        playerRank.push(6)
        playerRankObject["Straight"] = 6
    }

    if(Object.keys(multiple3).length>0) {
        console.log("you have three of a kind")
        playerRank.push(7)
        playerRankObject["Three of a Kind"] = 7
    } 

    if(Object.keys(multiple2).length>1) {
        console.log("you have a two pair")
        playerRank.push(8)
        playerRankObject["Two Pair"] = 8
    } else if(Object.keys(multiple2).length=1) {
        console.log("you have a pair")
        playerRank.push(9)
        playerRankObject["Pair"] = 9
    } else {
        console.log("you have a high card")
        playerRank.push(10)
        playerRankObject["High Card"] = 10
    }
} 

