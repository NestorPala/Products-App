const apiURL = window.location.origin + "/products";

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
            if (propertyName == "_id" || propertyName == "__v" || propertyName == "createdAt") {
                continue;
            }
            const property = document.createElement("li");
            property.id = product.id + "_" + propertyName;
            property.innerHTML = propertyName + ": " + products[i][propertyName];
            productPropertyList.appendChild(property);
        }

        const removeProductButton = document.createElement("button");
        removeProductButton.id = products[i]["_id"];
        removeProductButton.className = "remove-product-button";
        removeProductButton.innerHTML = "X";

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
        addStockButton.className = "add-stock-button";
        addStockButton.innerHTML = "ADD STOCK";

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
        removeStockButton.className = "remove-stock-button";
        removeStockButton.innerHTML = "REMOVE STOCK";

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

        // Remove later (put it in CSS)
        [removeProductButton, addStockButton, removeStockButton]
        .forEach(element => {
            element.setAttribute("style", "width: fit-content; height: 30px; margin: 10px; cursor: pointer; font-family: 'Raleway', sans-serif; font-weight: bold");
        });
    }
    document.body.appendChild(productList);
});


function addProduct() {
    let newProduct = {
        name: document.getElementById("product-name").value,
        price: document.getElementById("product-price").value,
    };

    let data = {
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
}
