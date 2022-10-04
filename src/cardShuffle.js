// Card Constructor
class Card {
    constructor(url, id) {
        this.url = url;
        this.id = id;
    }
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

// Fisher-Yates algorithm
function shuffleArray(arr)
{
    let lastIndex = arr.length-1;
    while(lastIndex > 0)
    {
        const randIndex = getRandomInt(lastIndex);
        [arr[randIndex], arr[lastIndex]] = [arr[lastIndex], arr[randIndex]];
        lastIndex--;
    }
    return arr;
}



export async function createCards(cardAmount)
{
    if(cardAmount % 2 !== 0) throw Error("Card Amount must be dividable by 2!") 

    let cards = [];

    for (let i = 0; i < cardAmount / 2; i++) 
    {
        const image = await fetch("https://picsum.photos/100");
        cards.push(new Card(image.url, i))
        cards.push(new Card(image.url, i))
    }

    return shuffleArray(cards);
}