
//create 52 card deck
let numDeck = []
for(let i = 0; i < 8; i++) {
    numDeck.push(i+2)
}
numDeck.toString()
numDeck.push("T","J", "Q", "K", "A");
const suits = ["S", "D", "H", "C"]
let fullDeck = []
numDeck.forEach(function(value) {
    for(let i = 0; i < 4; i++) {
        fullDeck.push(value + suits[i])
    }
})

console.log(fullDeck)

//shuffle the above 52 card deck
fullDeck.forEach(function(value, idx) {
    let placeHolder = fullDeck[idx]
    let int = Math.floor(Math.random() * 52)
    fullDeck[idx] = fullDeck[int]
    fullDeck[int] = placeHolder
    // console.log(holder)
})
console.log(fullDeck)

// Math.floor(Math.random() * 52);