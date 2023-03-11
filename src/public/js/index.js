const socket = io();
const btnForm = document.getElementById("btn-form");
const form = document.getElementById("add-prod");
// const btnDel = document.get("btn-del");

const newProd = (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const prod = {
        title: data.get("title"),
        description: data.get("description"),
        category: data.get("category"),
        price: data.get("price"),
        code: data.get("code"),
        stock: data.get("stock"),
    };
    socket.emit("addProd", prod);
    form.reset();
};

const borrar = (productId) => {
    socket.emit("delProd", productId);
};

socket.on("delete-product"),
    (id) => {
    const product = document.getElementById("id");
    product.remove();
};

socket.on("init-products", (products) => {
    const rowProducts = document.getElementById("rowProducts");
    rowProducts.innerHTML = " ";
    products.forEach((product) => {
    rowProducts.innerHTML += `<div class="card col-3 m-2 border border-4 id="${product.id} style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${product.title}</h5>
                <p class="card-text text-center mb-0 ">${product.description}</p><br>
                <p class="card-text text-center">cod: ${product.code}</p>
                <h2 class="card-text text-center ">$ ${product.price}</h2>
                <p class="card-text text-center ">Stock: ${product.stock}</p>
                <div class="d-flex justify-content-center">
                    <button type="button" onclick="borrar('${product.id}')" class="btn btn-primary">Delete</button>
                </div>
            </div>
        </div>`;
    });
});

btnForm.addEventListener("click", newProd);

