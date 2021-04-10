import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import Card from './Card'
import './DeckBoard.css'


let baseURL = 'https://deckofcardsapi.com/api/deck'

const DeckBoard = () => {
    const [shuffleDeck, setShuffleDeck] = useState({})
    const [drawCard, setDrawCard] = useState([])
    const [autoDraw, setAutoDraw] = useState(false)
    const timer = useRef()
    console.log(timer)

    //Get a shuffle deck from API
    useEffect(() => {
        async function shuffleDeck(){
            const res = await axios.get(`${baseURL}/new/shuffle/`)
            setShuffleDeck(res.data)
        }
        shuffleDeck()
    }, [setShuffleDeck])

    // Draw a card from the deck in state
    useEffect(() => {
        async function drawShuffleCard() {
            
            try {
                let { deck_id } = shuffleDeck
                const res = await axios.get(`${baseURL}/${deck_id}/draw/`)    
            
                if(res.data.remaining === 0){
                    setAutoDraw(false)
                    alert("no cards remaining")
                    throw new Error("no cards remaining ")
                }
            
                const cards = res.data.cards[0]

                setDrawCard( card => [
                    ...card,
                    {
                        id: cards.code,
                        name:`${cards.suit} ${cards.value}`,
                        image: cards.image
                    }
                ])
            
            } catch (error) {
                console.error(error)
            }       
        }
        
        if(autoDraw){
            timer.current = setInterval(async () => {
                await drawShuffleCard()
            }, 1000)
        }
        
        const stopTimer = () => {
            clearInterval(timer.current)
            timer.current = null
        }
        return stopTimer

    }, [shuffleDeck, autoDraw, setAutoDraw])

    const buttonHandler = () => {
        setAutoDraw(a => !a)
    }

    const cards = drawCard.map(card => (     
        <Card key={card.id} image={card.image} name={card.name} />
    ))

    return (
        <div >
            {shuffleDeck ? (
                <button className="DeckButton" onClick={buttonHandler}>
                    {autoDraw ? 'STOP' : "KEEP"} GIMME A CARD
                </button>
            ) : null}

            <div className="CardBoard">{cards}</div>
        </div>
    )
}
    
export default DeckBoard