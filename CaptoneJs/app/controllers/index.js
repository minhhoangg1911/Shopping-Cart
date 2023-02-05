var productList = new ProductList();

var cart = [];

function getProductList() {
  productList.getList().then(function (response) {
    // console.log("response", response.data);
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    content += `
  <div class="card">
 
                  <div class="top-bar">

                      <i class="fab fa-apple"></i>
                      <em class="stocks">${data[i].frontCamera}</em>
                  </div>
                  <div class="img-container">
                      <img class="product-img"
                          src="${data[i].img}"
                          alt="">
                      <div class="out-of-stock-cover"><span>${data[i].backCamera}</span></div>
                  </div>
                  <div class="details">
                      <div class="name-fav">
                          <strong class="product-name">${data[i].name}</strong>
                          <button onclick="this.classList.toggle()" class="heart"><i
                                  class="fas fa-heart"></i></button>
                      </div>
                      <div class="wrapper">
                          <h5>${data[i].type}</h5>
                          <p>${data[i].desc}</p>
                      </div>
                      <div class="purchase">
                          <p class="product-price">${data[i].price}</p>
                          <span class="btn-add">
                              <div>
                                  <button onclick="addItem('${data[i].id}')" class="add-btn">Add <i
                                          class="fas fa-chevron-right"></i></button>
                                  
                              </div>
                          </span>
                      </div>
                  </div>
              </div>
              
          </div>  
      `;
  }

  document.getElementById("cart-content").innerHTML = content;
}

function sideNav(e) {
  let t = document.getElementsByClassName("side-nav")[0],
    n = document.getElementsByClassName("cover")[0];
  (t.style.right = e ? "0" : "-100%"),
    (n.style.display = e ? "block" : "none"),
    CartIsEmpty();
}
function CartIsEmpty() {
  // 0 == cartDetails.length &&
  //   (document.getElementsByClassName("cart-items")[0].innerHTML =
  //     "<span class='empty-cart'>Looks Like You Haven't Added Any Product In The Cart</span>");
}

function filterProduct() {
  var e = document.getElementById("select").value;

  productList.getList().then(function (response) {
    var t = response.data;
    let productDetail = [];
    for (let i = 0; i < t.length; i++) {
      if (t[i].type === e) {
        productDetail.push(t[i]);
      }
      if (e === "all") {
        productDetail = response.data;
      }
    }

    renderProductList(productDetail);
  });
}

function addItem(id) {
  //  console.log(id)

  productList.getList().then(function (response) {
    // console.log(t);
    const item = response.data.find((element) => element.id === id);

    var cartItem = {
      product: item,
      quantity: 1,
    };

    const idx = cart.findIndex((element) => element.product.id === id);

    // console.log(response.data);

    // console.log(item);
    // console.log(idx);
    if (idx === -1) {
      cart.push(cartItem);
   
      console.log(cart);
    } else {
      cart[idx].quantity += 1;
    }
   
    
    console.log(cart);
    renderCart(cart);
  });
}

renderCart = (cart) => {
  // console.log("cart", cart);
  var content = "";

  for (var i = 0; i < cart.length; i++) {
    content += `
      <tr>
      
       <td>${cart[i].product.name}</td>
       <button onClick="handleQuantity(${cart[i].product.id},true)"  style="color:blue;font-size:20px;" >+</button>
       <td>${cart[i].quantity}</td>/
       <td>${cart[i].product.price}</td>
       <button onClick="handleQuantity(${cart[i].product.id},false)" style="color:primary;font-size:20px;">-</button>
       <button onClick="handleDelete(${cart[i].product.id})" style="text-align: right;color:red">Delete</button>

       
       
       </tr>

       

    
       `;
      
      }

    var total = 0;
  for( var i = 0; i < cart.length; i++ ) {
      total += cart[i].product.price * cart[i].quantity; 
    
  }

  var quantityLength = 0;
  for(var i = 0; i < cart.length; i++) {
    quantityLength += cart[i].quantity
  }

  document.getElementById("total-qty").innerHTML = quantityLength;

  document.getElementById("cart-items").innerHTML = content;


  document.getElementById("total").innerHTML = total;

  

};

handleQuantity = (id, isIncrease) => {
  // console.log(id);

  productList.getList().then(function (response) {
    // console.log("data",response.data);

    const idx = cart.findIndex(
      (element) => element.product.id === id.toString()
    );

    // console.log(cart);
    // console.log(idx);

    if (isIncrease) {
      cart[idx].quantity += 1;
    } else {
      if (cart[idx].quantity > 1) {
        cart[idx].quantity -= 1;
      } else if (window.confirm("Bạn có muốn xóa không!")) {
        cart.splice(idx, 1);
      }
    }
    renderCart(cart);
  });
};

handleBuy = () => {
  cart = [];
  renderCart(cart);
}

// console.log(cart);

handleDelete = (id) => {
  productList.getList().then(function (response) {
    const idx = cart.findIndex(
      (element) => element.product.id === id.toString()
    );
    cart.splice(idx, 1);

    renderCart(cart);
  });
};



window.onload = function () {
  getProductList();
};
