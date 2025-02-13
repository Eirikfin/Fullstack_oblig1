const events = ["start-race", "reset-race", "winning-time", "horse-moved", "race-finished"]


events.forEach( item => {
    document.addEventListener(item, (e) => {
        console.log(`Event: ${e.type} fired with payload: ${e.detail}`)
    })
})

