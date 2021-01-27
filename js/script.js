// array codici-simboli per costi di mana
const fieldCodes = [
  'W', 'U', 'B', 'R', 'G'
];

// array valori di potere disponibili
const powerValues = [1, 2, 3, 4, 5];

// array tipi di carte
const cardTypes = [
  'terre',
  'creature',
  'incantesimi',
  'artefatti',
  'instantanei',
  'stregonerie'
];

// oggetto di edizioni, contenente sub-oggetti che le descrivono
const editions = {
  'BL': {
      edition: 'Boolean',
      rarity: 'blue'
  },
  'SP': {
      edition: 'Special',
      rarity: 'red'
  }
}

// array di oggetti "carte"
const cards = [
  {
    cardName: 'Grizzly Bears', // nome carta
    cost: { // oggetto con voci di costo:
      genericCostNumber: 1, // costo generico
      costFields: [ // costo di mana con riferimento ad array fieldCodes
        fieldCodes[0],
        fieldCodes[2]
      ]
    },
    picture: 'img/01.jpg', // immagine carta
    cardType: cardTypes[1], // tipo carta
    cardObject: 'Bear', // oggetto specifico carta
    editionType: editions['BL'], // edizione (a scelta dall'array)
    description: 'Lorem ipsum', // descrizione abilità
    story: 'Naltro Lorem Ipsum', // citazione (testo-colore)
    score: { // valori di forza
      power: powerValues[3],  // potere, con riferimento ad array powerValues
      toughness: 2 // costituzione
    }
  },
  {
    cardName: 'Sviluppatore guerriero',
    cost: {
      genericCostNumber: 3,
      costFields: [
        fieldCodes[2],
        fieldCodes[3]
      ]
    },
    picture: 'img/02.jpg',
    cardType: cardTypes[5],
    cardObject: 'Esaurito',
    editionType: editions['BL'],
    description: 'Lo sviluppatore guerriero spezza i byte in bit!',
    story: 'Lo sviluppatore guerriero è una forma di essere umano evoluto.',
    score: {
      power: powerValues[2],
      toughness: 3
    }
  },
  {
    cardName: 'Maurizio Costanzo',
    cost: {
      genericCostNumber: 1,
      costFields: [
        fieldCodes[1],
        fieldCodes[0]
      ]
    },
    picture: 'img/03.jpg',
    cardType: cardTypes[3],
    cardObject: 'Obeso',
    editionType: editions['BL'],
    description: 'Presentatore senza collo, ma con cravatta, camicia e panza',
    story: 'State boni...',
    score: {
      power: powerValues[4],
      toughness: 3
    }
  },
  {
    cardName: 'Robin',
    cost: {
      genericCostNumber: 2,
      costFields: [
        fieldCodes[0],
        fieldCodes[4]
      ]
    },
    picture: 'img/04.jpg',
    cardType: cardTypes[1],
    cardObject: 'Spalla sfigata',
    editionType: editions['BL'],
    description: 'Il Numero 2 per antonomasia, sempre un passo dietro al Bat-mentore',
    story: 'Holy Bat!',
    score: {
      power: powerValues[0],
      toughness: 3
    }
  },
  {
    cardName: 'Asciugamani sporco',
    cost: {
      genericCostNumber: 5,
      costFields: [
        fieldCodes[1],
        fieldCodes[2]
      ]
    },
    picture: 'img/05.jpg',
    cardType: cardTypes[4],
    cardObject: 'Reliquia usata',
    editionType: editions['SP'],
    description: 'Nemica giurata delle lavatrici, può assumere strani odori',
    story: 'Candeggina Ace, non mi avrai mai!',
    score: {
      power: powerValues[4],
      toughness: 1
    }
  }
];

// funzione filtra per tipo carta
const filterByType = ((array, value) => {
  return array.filter((element) => {
    let {cardType} = element;
    return cardType === value;
  })

});

// funzione filtra per potere-carta
const filterByPower = ((array, value) => {
  return array.filter((element) => {
    let {power} = element.score;
    return power === value;
  })
});

// funzione innesto HTML lista card
const innerCardsList = ((htmlContainer, array) => {
  $(`${htmlContainer}`).text(''); // reset html
  array.forEach((element) => {
    let {
      cardName, cardType, cardObject, description, story, picture, score
    } = element;
    $(`${htmlContainer}`).append(`
      <li class="card">
        <h2>${cardName}</h2>
        <h4>( ${score.power} / ${score.toughness} )</h3>
        <h3>${cardType} / ${cardObject}</h3>
        <img src="${picture}">
        <p>${description} <br/><br/> "<i>${story}</i>"</p>
      </li>
      `);
  });
});

// funzione innesto HTML lista copzioni
const innerOptionsList = ((htmlContainer, array) => {
  array.forEach((element) => {
    $(`${htmlContainer}`).append(
      `<option value="${element}">${element}</option>`
    );
  });
});

// creiamo lista opzioni lista potere nel selettore Html
innerOptionsList('.select-power', powerValues);

// creiamo lista opzioni lista potere nel selettore Html
innerOptionsList('.select-type', cardTypes);

// selezioniamo lista carte flitrando i tipi
$('.select-type').change(function(){
  const thisValue = $(this).val();
  const selectedList = filterByType(cards, thisValue);
  innerCardsList('.cards-list', selectedList);
});

// selezioniamo lista carte flitrando il valore poteri
$('.select-power').change(function(){
  const thisValue = parseInt($(this).val());
  const selectedList = filterByPower(cards, thisValue);
  innerCardsList('.cards-list', selectedList);
});

// selezioniamo lista carte flitrando il valore poteri
$('.reset').click(function(){
  innerCardsList('.cards-list', cards);
});

// stampiamo lista carte, avviando immediatamente il click di reset
$('.reset').click();
