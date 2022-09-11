const apiURL = window.location.origin + '/products';


fetch(apiURL)
.then(response => response.json())
.then(products => {
    let productList = document.getElementById("product-list");
    
    for (let i=0; i<products.length; i++) {
        const product = document.createElement("li");
        product.className = "product";
        product.id = "product_" + i;

        const productPropertyList = document.createElement("ul");
        
        for (let propertyName in products[i]) {
            if (propertyName == "_id" || propertyName == "__v") {
                continue;
            }
            const property = document.createElement("li");
            property.id = product.id + "_" + propertyName;
            property.innerHTML = propertyName + ": " + products[i][propertyName];
            productPropertyList.appendChild(property);
        }

        const removeProductButton = document.createElement("button");
        removeProductButton.id = products[i]["_id"];
        removeProductButton.innerHTML = "X";
        removeProductButton.setAttribute("style", "width: 30px; height: 30px; margin: 10px; cursor: pointer;");

        removeProductButton.addEventListener("click", function(e) {
            fetch(apiURL + `/${removeProductButton.id}`, {method: "DELETE"})
                .then(res => res.json())
                .then(json => {
                    alert(json.message);
                    location.reload();
                });
        });

        const addStockButton = document.createElement("button");
        addStockButton.id = products[i]["_id"];
        addStockButton.innerHTML = "ADD STOCK";
        addStockButton.setAttribute("style", "width: fit-content; height: 30px; margin: 10px; cursor: pointer;");

        addStockButton.addEventListener("click", function(e) {
            let stockToAdd = prompt("Enter amount of items for adding to stock:");

            fetch(apiURL + `/${addStockButton.id}/addstock`, {
                method: "PATCH",
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    incomingStock: stockToAdd,
                }),
            })
            .then(res => res.json())
            .then(json => {
                alert(json.message);
                location.reload();
            });
        });

        const removeStockButton = document.createElement("button");
        removeStockButton.id = products[i]["_id"];
        removeStockButton.innerHTML = "REMOVE STOCK";
        removeStockButton.setAttribute("style", "width: fit-content; height: 30px; margin: 10px; cursor: pointer;");

        removeStockButton.addEventListener("click", function(e) {
            let stockToRemove = prompt("Enter amount of items for removing from stock:");

            fetch(apiURL + `/${removeStockButton.id}/removestock`, {
                method: "PATCH",
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    outgoingStock: stockToRemove,
                }),
            })
            .then(res => res.json())
            .then(json => {
                alert(json.message);
                location.reload();
            });
        });

        product.appendChild(productPropertyList);
        product.appendChild(removeProductButton);
        product.appendChild(addStockButton);
        product.appendChild(removeStockButton);
        productList.appendChild(product);
    }
    document.body.appendChild(productList);
});


let formAddProduct = document.getElementById("add-product");


formAddProduct
.getElementsByTagName("button")[0]
.setAttribute("style", "margin-top: 20px;");


formAddProduct.addEventListener("submit", function(e) {
    let newProduct = {
        name: formAddProduct["product-name"].value,
        price: formAddProduct["product-price"].value,
    };

    e.preventDefault();

    data = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(newProduct),
    }

    let response = fetch(apiURL, data);

    response
        .then(res => res.json())
        .then(json => {
            alert(json.message);
            location.reload();
        });
});
