const searchCharacter = async character => {
    apikey = 'f61da983b82fb9ee7fceda7367ccfe0b'
    timestamp = 1
    hash = '9ce346a6184f82ffb198f9234287ae18'
    url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${character.replace(' ', '%20')}&apikey=${apikey}&ts=${timestamp}&hash=${hash}`

    const res = await fetch(url)
    const data = await res.json()
    return data
}

const loadCards = arr => {
    const card = document.createElement('article')
    card.classList.add('card')
    card.innerHTML = JSON.stringify(arr[0])
    const container = document.getElementsByClassName('container')[0]
    container.appendChild(card)
}

const searchField = document.getElementById('search-field')
searchField.addEventListener('keyup', async e => {
    if (e.keyCode === 13) {
        const data = await searchCharacter(searchField.value)
        console.log(data.data.results)
        loadCards(data.data.results)
    }
})