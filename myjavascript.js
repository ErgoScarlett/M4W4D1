//Autorizzazione fetch
fetch("https://striveschool-api.herokuapp.com/api/product/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTU3ODljNDM3MDAwMTkzYzM2ZDAiLCJpYXQiOjE3MDg2MjU3OTEsImV4cCI6MTcwOTgzNTM5MX0.tRlxkMUL3o4I-PHlYX-JkWGMFIZ0be_6tssVtNrgMK8"
}
})

const ApiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTU3ODljNDM3MDAwMTkzYzM2ZDAiLCJpYXQiOjE3MDg2MjU3OTEsImV4cCI6MTcwOTgzNTM5MX0.tRlxkMUL3o4I-PHlYX-JkWGMFIZ0be_6tssVtNrgMK8'
  
  

//Js per prendere i prodotti dall'api e visualizzarli nel DOM
async function getProdotti() {
    const response = await fetch(ApiUrl, {
        headers: {
        "Authorization": token
      }
    });

    if(response.status === 401) {
        throw new Error('Unauthorized');
    }
    return await response.json();
  }
  
  // Genera le card 
 async function generateCards() {
    const prodotti = await getProdotti();
    const container = document.querySelector('#prodotti');
  
    prodotti.forEach(prodotto => {
  
      const card = document.createElement('div');
      card.classList.add('col-lg-3');
      card.classList.add('col-md-6');
      card.classList.add('mb-3');
  
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
      text.textContent = prodotto.price + '€';
  
      const btn1 = document.createElement('a');
      btn1.classList.add('btn');
      btn1.classList.add('btn-outline-primary');
      btn1.classList.add('me-2');
      btn1.textContent = 'Buy';
  
      const btn2 = document.createElement('a');
      btn2.classList.add('btn'); 
      btn2.classList.add('btn-outline-info');
      btn2.textContent = 'Info';
      btn2.dataset.id = prodotto._id;
      btn2.addEventListener('click', () => {
        const id = btn2.dataset.id;
        window.location.href = `detail.html?id=${id}`;
      });
  
      cardBody.appendChild(title);
      cardBody.appendChild(brand);
      cardBody.appendChild(text);
      cardBody.appendChild(btn1);
      cardBody.appendChild(btn2);
  
      innerCard.appendChild(img);
      innerCard.appendChild(cardBody);
  
      card.appendChild(innerCard);
  
      container.appendChild(card);
  
    });
  
  }
  generateCards(prodotti);
