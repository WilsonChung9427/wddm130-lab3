let orderCount = 0;
let totalQuantity = 0;
let totalRevenue = 0;

function validate(pattern, input) {
    return pattern.test(input);
}

function getPrice(productType) {
    if (productType === "Laptop") {
        return 1000;
    }
    else if (productType === "Tablet") {
        return 600;
    }
    else if (productType === "Phone") {
        return 400;
    }
    return 0;
}

function calculateDiscount(subTotal, quantity, promoCode) {
    let discount = 0;
    if (quantity >= 3) {
        discount = subTotal * 0.10;
    }
    if (promoCode === "SAVE20") {
        discount += 20;
    }
    return discount;
}

function calculateFinalTotal(subTotal, discount) {
    let afterDiscount = subTotal - discount;
    let tax = afterDiscount * 0.13;
    let finalTotal = afterDiscount + tax;
    return finalTotal;
}

function addOrder() {
    let name = document.getElementById("custName").value.trim();
    let product = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;
    let promo = document.getElementById("promo").value.trim();
    let postal = document.getElementById("postal").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message");

    message.innerHTML = "";

    let validName = false;
    if (name.length >= 2) {
        for (let i = 0; i < name.length; i++) {
            if (name[i] !== " ") {
                validName = true;
            }
        }
    }

    let qty = Number(quantity);
    if (Number.isInteger(qty) === false || qty < 1) {
        message.innerHTML = "Quantity must be a whole number greater than 0.";
        return false;
    }

    let postalPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (validate(postalPattern, postal) === false) {
        message.innerHTML = "Invalid Canadian postal code.";
        return false;
    }

    let phonePattern = /^\(?\d{3}\)?[- ]\d{3}[- ]\d{4}$/;
    if (validate(phonePattern, phone) === false) {
        message.innerHTML = "Invalid phone number format.";
        return false;
    }

    if (validName === false) {
        message.innerHTML = "Customer name must contain at least 2 non-space characters.";
        return false;
    }

    let price = getPrice(product);
    let subTotal = price * qty;
    let discount = calculateDiscount(subTotal, qty, promo);
    let finalTotal = calculateFinalTotal(subTotal, discount);

    orderCount = orderCount + 1;
    let tableBody = document.getElementById("ordersTable").getElementsByTagName("tbody")[0];
    let row = tableBody.insertRow();

    row.insertCell(0).innerHTML = orderCount;
    row.insertCell(1).innerHTML = name;
    row.insertCell(2).innerHTML = product;
    row.insertCell(3).innerHTML = qty;
    row.insertCell(4).innerHTML = "$" + subTotal.toFixed(2);
    row.insertCell(5).innerHTML = "$" + discount.toFixed(2);
    row.insertCell(6).innerHTML = "$" + finalTotal.toFixed(2);

    totalQuantity = totalQuantity + qty;
    totalRevenue = totalRevenue + finalTotal;

    updateSummary();

    message.innerHTML = "Order added successfully!";

    return false;
}

function updateSummary() {
    let summary = document.getElementById("summary");

    summary.innerHTML =
        "<p>Total Orders: " + orderCount + "</p>" +
        "<p>Total Quantity: " + totalQuantity + "</p>" +
        "<p>Total Revenue: $" + totalRevenue.toFixed(2) + "</p>";
}