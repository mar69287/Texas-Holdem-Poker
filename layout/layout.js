const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []

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
deck.forEach(function(value, idx) {
    let placeHolder = deck[idx]
    let int = Math.floor(Math.random() * 52)
    deck[idx] = deck[int]
    deck[int] = placeHolder
    
})



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


    for(let i = 4; i < 7; i++) {
        setTimeout(function(){
            const cardEl = document.createElement('div')
            cardEl.className = 'card ' + deck[i].face
            document.querySelector('.community-container').append(cardEl)
        }, 2500)
    }


}
renderDeck()

//making click listeners

const checkBtn = document.getElementById("check")
checkBtn.addEventListener("click", function(evt) {
    console.log(evt.target)
});


const foldBtn = document.getElementById("fold")
foldBtn.addEventListener("click", function(evt) {

    const cards = document.querySelectorAll(".card") 
    cards.forEach(card => card.remove())
    shuffleDeck()
    console.log(deck)
    renderDeck()
});
