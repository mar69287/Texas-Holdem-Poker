const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []
let playerArray = []

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


    // for(let i = 0; i < 7; i++) {
    //     setTimeout(function(){
    //         const cardEl = document.createElement('div')
    //         cardEl.className = 'card back'  
    //         document.querySelector('.community-container').append(cardEl)
    //     }, 2500)
    // }


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
            createPlayerHand()  
        }

        function createPlayerArray() {
            playerArray.push(deck[0].face)
            playerArray.push(deck[2].face)
            for (let i = 4; i < 9; i++) {
                playerArray.push(deck[i].face)
            }
            console.log(playerArray)
        }

        function createPlayerHand() {
            let spadeCounter = 0;
            let clubCounter = 0;
            let heartCounter = 0;
            let diamondCounter = 0;
            for (let i = 0; i < 7; i++) {
                if (playerArray[i].includes("s")) {
                    spadeCounter++
                }
                if (spadeCounter >= 5) {
                    const playerHand = playerArray.filter(function(spade) { return spade.includes("s")})
                    console.log(playerHand)
                }
            }
            for (let i = 0; i < 7; i++) {
                if (playerArray[i].includes("c")) {
                    clubCounter++
                    if (clubCounter >= 5) {
                        const playerHand = playerArray.filter(function(club) { return club.includes("c")})
                        console.log(playerHand)
                    }
                }
            }
            for (let i = 0; i < 7; i++) {
                if (playerArray[i].includes("h")) {
                    heartCounter++
                    if (heartCounter >= 5) {
                        const playerHand = playerArray.filter(function(heart) { return heart.includes("h")})
                        console.log(playerHand)
                    }
                }    
            }
            for (let i = 0; i < 7; i++) {
                if (playerArray[i].includes("d")) {
                    diamondCounter++
                    if (diamondCounter >= 5) {
                        const playerHand = playerArray.filter(function(diamond) { return diamond.includes("d")})
                        console.log(playerHand)
                    }
                }    
            }
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

