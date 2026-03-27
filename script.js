const products = [
 {id:1,name:"Wireless Headphones",price:1999},
 {id:2,name:"Smart Watch",price:2499},
 {id:3,name:"Bluetooth Speaker",price:1499},
 {id:4,name:"Gaming Mouse",price:999},
 {id:5,name:"Laptop Backpack",price:1299},
 {id:6,name:"Keyboard",price:899},
 {id:7,name:"USB Cable",price:299},
 {id:8,name:"Power Bank",price:1599},
 {id:9,name:"Earbuds",price:1199},
 {id:10,name:"Monitor",price:7999}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(id){
    let product = products.find(p=>p.id===id);
    let item = cart.find(i=>i.id===id);

    if(item){
        item.quantity++;
    }else{
        cart.push({...product,quantity:1});
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
    showToast(product.name+" added!");
}

/* UPDATE COUNT */
function updateCartCount(){
    let count=0;
    cart.forEach(i=>count+=i.quantity);
    let el=document.getElementById("cart-count");
    if(el) el.innerText=count;
}

/* SHOW CART */
function displayCart(){
    let container=document.getElementById("cart-items");
    let total=0;
    container.innerHTML="";

    cart.forEach(item=>{
        total+=item.price*item.quantity;

        container.innerHTML+=`
        <div class="card">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>

            <button onclick="decreaseQty(${item.id})">-</button>
            ${item.quantity}
            <button onclick="increaseQty(${item.id})">+</button>

            <br><br>
            <button onclick="removeItem(${item.id})">Remove</button>
        </div>`;
    });

    document.getElementById("total").innerText=total;
}

/* INCREASE */
function increaseQty(id){
    let item=cart.find(i=>i.id===id);
    item.quantity++;
    saveAndReload();
}

/* DECREASE */
function decreaseQty(id){
    let item=cart.find(i=>i.id===id);
    if(item.quantity>1){
        item.quantity--;
    }
    saveAndReload();
}

/* REMOVE */
function removeItem(id){
    cart=cart.filter(i=>i.id!==id);
    saveAndReload();
}

/* SAVE */
function saveAndReload(){
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

/* CHECKOUT SUMMARY */
function displaySummary(){
    let container=document.getElementById("summary");
    let total=0;
    container.innerHTML="";

    cart.forEach(item=>{
        total+=item.price*item.quantity;

        container.innerHTML+=`
        <div class="card">
            <h3>${item.name}</h3>
            <p>${item.quantity} x ₹${item.price}</p>
        </div>`;
    });

    document.getElementById("checkout-total").innerText=total;
}

/* PLACE ORDER */
function placeOrder(){
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href="index.html";
}

/* TOAST */
function showToast(msg){
    let toast=document.getElementById("toast");
    if(!toast) return;
    toast.innerText=msg;
    toast.style.opacity=1;
    setTimeout(()=>toast.style.opacity=0,2000);
}

/* DARK MODE */
function toggleDarkMode(){
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark")?"dark":"light");
}

if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
}

/* AUTO LOAD */
updateCartCount();

if(document.getElementById("cart-items")){
    displayCart();
}

if(document.getElementById("summary")){
    displaySummary();
}