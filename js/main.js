const searchCharacter = async character => {
    apikey = 'f61da983b82fb9ee7fceda7367ccfe0b'
    timestamp = 1
    hash = '9ce346a6184f82ffb198f9234287ae18'
    url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${character.replace(' ', '%20')}&apikey=${apikey}&ts=${timestamp}&hash=${hash}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.data.results.length === 0) {
        alert('Personaje no encontrado :(')   
    }
    return data
}

const loadCards = arr => {
    const container = document.getElementsByClassName('cards-container')[0]
    const fragment = new DocumentFragment()
    container.innerHTML = ''

    arr.forEach(e => {
        const card = document.createElement('article')
        card.classList.add('card')
        card.innerHTML = `
        <picture>
            <img src=${e.thumbnail.path}.${e.thumbnail.extension} alt=${e.name}>
        </picture>
        <div class="text">
            <h3>${e.name}</h3>
            <p>${e.description}</p>
        </div>
        `
        fragment.appendChild(card)
    })
    container.appendChild(fragment)
}

const searchField = document.getElementById('search-field')
searchField.addEventListener('keyup', async e => {
    if (e.keyCode === 13) {
        const data = await searchCharacter(searchField.value)
        loadCards(data.data.results)
    }
})