async function registerSW() {
    if('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js')
        } catch (e) {
            console.log('SW registration failed')
        }
    }
}

async function app() {
    const quotes = await fetch('http://localhost:3000/quotes').then(resp => resp.json())
    const quoteBtn = document.getElementById('quote-btn')
    const quoteBox = document.getElementById('quote-box')
    let idx = 0

    quoteBtn.addEventListener('click', e => {
        idx++;
        quoteBox.innerHTML = quotes[idx % quotes.length].quote
    })

    if(quotes.length > 0) {
        quoteBox.innerHTML = quotes[idx % quotes.length].quote
    }
}

window.addEventListener('load', () => {
    app()
    registerSW()
})
