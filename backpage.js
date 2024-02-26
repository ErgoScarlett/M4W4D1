const ApiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTU3ODljNDM3MDAwMTkzYzM2ZDAiLCJpYXQiOjE3MDg2MjU3OTEsImV4cCI6MTcwOTgzNTM5MX0.tRlxkMUL3o4I-PHlYX-JkWGMFIZ0be_6tssVtNrgMK8';

window.onload = getProduct();

async function getProduct() {
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
  //Funzione per popolare la tabella
  async function generateTable() {
    const products = await getProduct();
    const table = document.querySelector('#results-area');

    products.forEach(product => {
    const tableRow = document.createElement("tr")
    const rowName = document.createElement("th");
    rowName.innerText = product.name;
    const rowDesc = document.createElement("td");
    rowDesc.innerText = product.description;
    const rowBrand = document.createElement("td");
    rowBrand.innerText = product.brand;
    const rowImg = document.createElement("td");
    const link = document.createElement("a"); 
    link.href = product.imageUrl;
    link.textContent = "Image";    
    const rowPrice = document.createElement("td");
    rowPrice.innerText = product.price;
    const rowId = document.createElement("td");
    rowId.innerText = product._id;
    const rowOps = document.createElement("td");


    // Tasto di modifica:
    const editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    //editBtn.href = `detail.html?pid=${_id}`;
    editBtn.target = "_blank";
    const editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil");
    const editText = document.createElement("span");
    editText.classList.add("ms-1");
    editText.innerText = "Edit";

    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);

    // Tasto di cancellazione:
    const delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-3");
    delBtn.addEventListener("click", () => {
        deleteProduct(product);
    });
    const delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash");
    const delText = document.createElement("span");
    delText.classList.add("ms-1");
    delText.innerText = "Delete";

    delBtn.appendChild(delImg);
    delBtn.appendChild(delText);

    rowOps.appendChild(editBtn);
    rowOps.appendChild(delBtn);

    tableRow.appendChild(rowName);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowBrand);
    rowImg.appendChild(link);
    tableRow.appendChild(rowImg);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowId);
    tableRow.appendChild(rowOps);

    table.appendChild(tableRow);
    
});   
}

generateTable();

// Funzione per eliminare un prodotto + allert
async function deleteProduct(product){
    const deleteMsg = document.getElementById("delete-msg");
    const productId = product._id;
  try {
    let res = await fetch('https://striveschool-api.herokuapp.com/api/product/'+productId, {
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": token
      },
      method: "DELETE"    
    });
    if(res.ok) {
      const tableContainer = document.getElementById("results-area");
      tableContainer.innerHTML = "";
      generateTable(); 
      deleteMsg.classList.remove("d-none");
    }
  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    deleteMsg.classList.add("d-none");
  }, 5000);

}


//Funzione per modificare
const alertError = document.getElementById("alert-msg");
const nameInput = document.getElementsById("product-name");
const newName = nameInput.value;
const descrInput = document.getElementsById("product-description");
const newDescr = descrInput.value;
const brandInput = document.getElementsById("product-brand");
const brandName = brandInput.value;
const imgInput = document.getElementsById("product-image");
const newImg = imgInput.value;
const priceInput = document.getElementsById("product-price");
const priceName = priceInput.value;

async function editProduct(product){

  if (nameInput.value && descrInput.value && brandInput.value && imgInput.value && priceInput.value) {
      try {
          let res = await fetch('https://striveschool-api.herokuapp.com/api/product/'+product._id,
              {
                  headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": token },
                  body: JSON.stringify(product),
                  method: "PUT"
              });
  
          if (res.status == 200) {
              alertActionEdit.classList.toggle('d-none');
              showProducts();
  
              setTimeout(() => {
                  alertActionEdit.classList.toggle('d-none');
              }, 5000);
          }
              } catch (error) {
          console.log(error);
          alertError.classList.toggle('d-none');

          setTimeout(()=>{
          alertErrorEdit.classList.toggle('d-none');
      },5000);
      }
} }
