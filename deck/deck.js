
const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
let deck = []

function generateDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
             deck.push({
                'face': suit + face,
            })
        })
    })
}

deck.forEach(function(value, idx) {
    let placeHolder = deck[idx]
    let int = Math.floor(Math.random() * 52)
    deck[idx] = deck[int]
    deck[int] = placeHolder
    
})
generateDeck()
console.log(deck)


function renderDeck() {

    // for(let i = 0; i < 2; i++) {
    //     const cardEl = document.createElement('div')
    //     cardEl.className = 'card ' + deck[i].face
    //     console.log(cardEl)
    // }

    deck.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('body').append(cardEl)
    })
}
renderDeck()