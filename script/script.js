const FRONT= "card_front"
const BACK= "card_back"
const CARD="card"
const ICON= "icon"

let techs=["bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react"
]
let cards=null;
function startGame(){
    initializeCards(game.createCardsFromTechs())
}

// cria a carta visualmente
function initializeCards(cards){
    let gameBoard=document.getElementById("gameBoard")
    gameBoard.innerHTML="",
    game.cards.forEach(card=>{
        let cardElemtent=document.createElement("div")
        cardElemtent.id=card.id
        cardElemtent.classList.add(CARD)
        cardElemtent.dataset.icon=card.icon

        createCardContent(card,cardElemtent)

        cardElemtent.addEventListener("click",flipCard)
        gameBoard.appendChild(cardElemtent)


    })

}


// cria o front e o back da carta
function createCardContent(card,cardElemtent){
    createCardFace(FRONT,card,cardElemtent)
    createCardFace(BACK,card,cardElemtent)

}
//cria a face
function createCardFace(face,card,element){
    let cardElemtentFace=document.createElement("div")
    cardElemtentFace.classList.add(face)
    if(face === FRONT){
        let iconElement=document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src="images/"+card.icon+".png"
        cardElemtentFace.appendChild(iconElement)
    }else{
        cardElemtentFace.innerHTML="&lt/&gt"
    }
    element.appendChild(cardElemtentFace);
}


// vira carta
function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add("flip")
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards()
                if(game.ckeckGameOver()){
                    let gameOverLayer=document.getElementById("gameOver")
                    gameOverLayer.style.display="flex"
                    gameOverLayer.addEventListener("click",restart)
                }
            }else{
                setTimeout(()=>{
                let firstCardView=document.getElementById(game.firstCard.id)
                let secondCardView=document.getElementById(game.secondCard.id)
                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
                game.unflipCards()
                },1000)

            }
        }
        

    }
    

}
startGame()
function restart(){
    startGame()
    let gameOverLayer=document.getElementById("gameOver")
    gameOverLayer.style.display="none"

}