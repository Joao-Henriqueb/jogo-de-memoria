let game={
    
    lockMode:false,
    firstCard:null,
    secondCard:null,
    
    setCard:function(id){
      let card=  this.cards.filter(card=>card.id===id)[0]
      if(card.flipped || this.lockMode){
        return false

      }

      if(!this.firstCard){
        this.firstCard=card
        this.firstCard.flipped=true
        return true

      }
      else{
        this.secondCard=card
        this,this.secondCard.flipped=true
        this.lockMode=true
        return true
      }

    },

    checkMatch:function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards:function(){
        this.firstCard=null
        this.secondCard=null // ???
        this.lockMode=false
    },
    //desflipa carta 1 e 2 pra nao dar bug
    unflipCards(){
        this.firstCard.flipped=false
        this.secondCard.flipped=false
        this.clearCards()

    },
    // retorna true quando todas cartas tiverem flipada(virada)
    ckeckGameOver(){
        return this.cards.filter(card=>!card.flipped).length==0

    },


    techs:["bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react"],

    cards:null,


    //cria cartas
    createCardsFromTechs:function(){
        this.cards=[];
        
        this.techs.forEach((tech)=>{
            this.cards.push(this.createPairFromTech(tech))
        })
        this.cards= this.cards.flatMap(pair=>pair) // desmebra os array
        this.shuffleCards()
        return this.cards
    },

    // cria o par da carta
    createPairFromTech:function(tech){
        return[{
            id: this.createIdWithTech(tech),
            icon:tech,
            flipped:false,
        },
            {
                id:this.createIdWithTech(tech),
                icon:tech,
                flipped:false,
            }]

    },

    //cria id da carta
    createIdWithTech:function(tech){
        return tech+parseInt(Math.random()*1000)

    },



    //embaralhar cartas
     shuffleCards:function(cards){
        let currentIndex=this.cards.length
        let randomIndex=0
        while(currentIndex!==0){
            randomIndex= Math.floor(Math.random()*currentIndex)
            currentIndex--
            [this.cards[randomIndex],this.cards[currentIndex]]=[this.cards[currentIndex],this.cards[randomIndex]]
        }
    }



}