import React, { useState, useEffect } from 'react'
import axios from 'axios'

let baseURL = 'https://deckofcardsapi.com/api/deck'

const CardBoard = ()=> {
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})
    
    useEffect(() => {
        axios
            .get(`${baseURL}/new/shuffle/`)
            .then(response => {
                setDeck(response.data)
            })
    }, [])

  
    

    // const currentDeck = useRef(deck)

    // const [draw, setDraw] = useState([])
    // const [autoDraw, setAutoDraw] = useState(false)

    // Get a brand new Deck
    // useEffect(() => {
    //     async function getDeck() {
    //         let resp = await axios.get(`${baseURL}/new/shuffle/`)
    //         // console.log("resp1", resp)
    //         console.log("deck1", deck)
    //         // console.log("resp.data: ", resp.data)
    //         setDeck(resp.data)
    //         console.log("deck2", deck)
    //     }
    //     getDeck()
    //     console.log("deck3", deck)
    // }, [])
    // console.log("deck4: ", deck)

    // useEffect(() => {
    //     axios
    //         .get(`${baseURL}/new/shuffle/`)
    //         .then(res => setDeck(res.data))
    //         .catch((err) => console.error('1st useEffect failed: ', err))
    // },[])

    // let currentDeck = deck
    // console.log(deck)

    // currentDeck.current = deck
    // console.log(currentDeck.current)
    


    // useEffect(() => {
    //     // let deck_id = currentDeck.current.deck_id
    //     // console.log(deck_id)
    //     console.log('currentDeck inside 2nd useEffect: ',currentDeck.current)
    //     // axios
    //     //     .get(`${baseURL}/${deck_id}/draw/`)
    //     //     .then(res => console.log(res))
    // },[])


    
    

    return (
        <div className="Card-Board">
            <button>GIMME A CARD!</button>
            <div className="cards"></div>
        </div>
    )
}

export default CardBoard