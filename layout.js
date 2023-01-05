const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []
let playerArray = []
// let playerHand = []
let multiple = {}
let copyPlayerArray = []
let playerRank = []

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

function checkStraight() {

let size = playerArray.length

    if (size === 7) {
        if (playerArray[3] - playerArray[4] !== 1) {
            if (playerArray[3] === playerArray[4]) {
                playerArray.splice(3, 1)
            }
        } 
        if (playerArray[2] - playerArray[3] !== 1) {
            if (playerArray[2] === playerArray[3]) {
                playerArray.splice(3, 1)
            }
        }
    }
    console.log(size)

    if (playerArray.length > 5) {
  
        if (playerArray[0] - playerArray[1] !== 1) {
          if (playerArray[0] === playerArray[1]) {
                playerArray.splice(0, 1)
                if (playerArray[0] - playerArray[1] !== 1) {
                    playerArray.splice(0, 1)
                }
          }else if (playerArray[1] - playerArray[2] !== 1) {
                
               
                    playerArray.splice(0, 2)
                
          }else {
                playerArray.splice(0, 1)
          }        
        }else if (playerArray[1] - playerArray[2] !== 1) {
            if (playerArray[1] === playerArray[2]) {
                playerArray.splice(1, 1)
            }else {
                playerArray.splice(0, 2)
            }
        }

        console.log(playerArray)
        size = playerArray.length

        if (playerArray[size-3] - playerArray[size-2] !== 1) {
            if (playerArray[size-3] === playerArray[size-2]) {
                if (playerArray[size-2] === playerArray[size-1]) {
                    playerArray.splice(size-2, 2)
                }else if (playerArray[size-2] - playerArray[size-1] !== 1) {
                    playerArray.splice(size-2, 2)
                }else if (playerArray[size-2] - playerArray[size-1] === 1) {
                    playerArray.splice(size-2, 1)
                }
            } else {
                playerArray.splice(size-2, 2)
            }
        }
        if (playerArray[size-2] - playerArray[size-1] !== 1) {
            playerArray.splice(size-1, 1)
        }
    }

    console.log(playerArray)
    let result = null;

    if (playerArray.length > 4) {
      
       result = playerArray.every(function(value, idx) {
            if(value === playerArray[0]) {
              return true
            } 
            if(playerArray[idx-1] - value === 1) {
              return true
            } else return false  
        })
      
    } else result = false
    console.log("you have a straight: " + result)
    return result
    
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
                // array.splice(0,array.length)
                // for(i = 0; i < playerHand; i++) {
                //     array[i] = playerHand[i]
                // }
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
                // array.splice(0,array.length)
                // for(i = 0; i < playerHand; i++) {
                //     array[i] = playerHand[i]
                // }
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
                // array.splice(0,array.length)
                // for(i = 0; i < playerHand; i++) {
                //     array[i] = playerHand[i]
                // }
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
                // array.splice(0,array.length)
                // console.log(playerHand)
                // for(i = 0; i < playerHand; i++) {
                //     array[i] = playerHand[i]
                // }
                return true
            }     
        }   
    }
    return false
}

function removeSuits() {
    playerArray.forEach(function(value,idx) {
        playerArray[idx] = value.substring(1, playerArray.length)
    })
    console.log(playerArray)
}

function sortPlayerArray() {
    playerArray.forEach(function(value, idx) {
        if (isNaN(value) !== true) {
          playerArray[idx] = parseInt(value, 10)
        }
        if (playerArray[idx] === "J") {
          playerArray[idx] = 11
        }
        if (playerArray[idx] === "Q") {
          playerArray[idx] = 12
        }
        if (playerArray[idx] === "K") {
          playerArray[idx] = 13
        }
        if (playerArray[idx] === "A") {
          playerArray[idx] = 14
        }
    })

    playerArray.sort(function(a, b) { return b - a })
    console.log(playerArray)
}

function checkMultiples(val) {
    const tally = playerArray.reduce((value, vote) => {
        value[vote] = value[vote] ? value[vote] + 1 : 1;
        return value;
    }, {});  
      
    console.log(tally)

    for (const key in tally) {
        if (tally[key] === val) {
        multiple[`${key}`] = tally[key]
        }
    }
    console.log(multiple)
    if(Object.keys(tally).length > 0) {
        return true
    } else {
        return false
    }
}

function checkRank() {
    let playerHand = []
    copyPlayerHand()
    console.log(checkFlush(copyPlayerArray))
    console.log("this is the " + playerHand)
    if (checkFlush(copyPlayerArray)) {
        removeSuits()
        if(checkStraight(copyPlayerArray)) {
            if(playerArray[1] === 14) {
                console.log("you have a royal flush")
            } else {
                console.log("you have a straight flush")
            }
        }else {
            console.log("you have a flush")
        }
    }
} 