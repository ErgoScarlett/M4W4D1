const ApiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTU3ODljNDM3MDAwMTkzYzM2ZDAiLCJpYXQiOjE3MDg2MjU3OTEsImV4cCI6MTcwOTgzNTM5MX0.tRlxkMUL3o4I-PHlYX-JkWGMFIZ0be_6tssVtNrgMK8'
  
// Recupera ID dalla query string
// recupero id dall'API
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


async function getInfo() {
    const response = await fetch(ApiUrl + id, {
        headers: {
        "Authorization": token
      }
    });

    if(response.status === 401) {
        throw new Error('Unauthorized');
    }
    return await response.json();
  }
  
  async function generateInfoCards() {
    const prodotti = await getInfo();
    const container = document.querySelector('#infobox');
  
    prodotti.forEach(prodotto => {
  
      const card = document.createElement('div');
      const innerCard = document.createElement('div');
      innerCard.classList.add('card');
  
      const img = document.createElement('img');
      img.src = prodotto.imageUrl;
      img.classList.add('card-img-top');
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = prodotto.name;

      const brand = document.createElement('h7');
      brand.classList.add('card-subtitle');
      brand.textContent = prodotto.brand;

      const text = document.createElement('p');
      text.classList.add('card-text');
      text.textContent = prodotto.description;

      cardBody.appendChild(title);
      cardBody.appendChild(brand);
      cardBody.appendChild(text);

      innerCard.appendChild(img);
      innerCard.appendChild(cardBody);
  
      card.appendChild(innerCard);
  
      container.appendChild(card);
  
    });
}