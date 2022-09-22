prodInfo = [];

function showProdInfo(array) {
  let name = array.name;
  let price = array.currency + " " + array.cost;
  let desc = array.description;
  let cat = array.category;
  let qSold = array.soldCount;

  document.getElementById("name").innerHTML = name;
  document.getElementById("price").innerHTML = price;
  document.getElementById("desc").innerHTML = desc;
  document.getElementById("cat").innerHTML = cat;
  document.getElementById("qSold").innerHTML = qSold;
}

function showImages(array) {
  let imagesToAppend = "";
  for (let i = 0; i < array.images.length; i++) {
    let images = array.images[i];

    imagesToAppend +=
      `<div class="column">
    <img src="${images}" style="width:100%"></div>`;

    document.getElementById("imagesContainer").innerHTML = imagesToAppend;
  }
}

prodComments = [];

function showComments(prodComments) {
  let commentsToAppend = "";

  for (let i = 0; i < prodComments.length; i++) {
    let comments = prodComments[i];

    commentsToAppend +=
      `<ul class="list-group mb-3">
    <li class="list-group-item list-group-item-action">` +
      `<b>${comments.user}</b> ${comments.dateTime} ${showScore(comments.score)}
      </li>
    <small class="list-group-item d-flex justify-content-between lh-condensed">${comments.description}</small>`;

    document.getElementById("comments-container").innerHTML = commentsToAppend;
  }
}

function showScore(points) {
  var stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= points) {
      stars += `<i class="fas fa-star checked"></i>`;
    } else {
      stars += `<i class="far fa-star checked"></i>`;
    }
  }
  return stars;
}

function currentDate() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let hour = today.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = today.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let cDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  return cDate;
}

function writeComment() {
  let users = {};
  users.user = localStorage.getItem("correo");
  users.description = document.getElementById("prodUserComment").value;
  users.score = document.getElementById("userProdScore").value;
  users.dateTime = currentDate();
  prodComments.push(users);
  showComments(prodComments);
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}

function showRelProducts(array) {
  let relatedProd = "";
  for (let i = 0; i < array.relatedProducts.length; i++) {
    let relProducts = array.relatedProducts[i];
    relatedProd +=
      `<div onclick="setProdID(${relProducts.id})" class="column">
                  <img src="${relProducts.image}" class="img-thumbnail" id="relImage">
                  <label for="relImage">${relProducts.name}</label>
              </div>`
              ;
  }
  document.getElementById("relatedID").innerHTML = relatedProd;
}

document.addEventListener("DOMContentLoaded", function () {
  let prodID = localStorage.getItem("prodID");
  getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prodInfo = resultObj.data;
      showProdInfo(prodInfo);
      showImages(prodInfo);
      showRelProducts(prodInfo);
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      prodComments = resultObj.data;
      showComments(prodComments);
    }
  });
  document.getElementById("sendCom").addEventListener("click", () => {
    writeComment();
    showComments(prodComments);
  });
  document
    .getElementById("userProdScore")
    .addEventListener("change", function () {
      showScore(document.getElementById("userProdScore").value);
    });
});
