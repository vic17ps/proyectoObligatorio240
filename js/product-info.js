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
};

function showImages(array) {
  let imagesToAppend = "";
  for (let i = 0; i < array.images.length; i++) {
    let images = array.images[i];

    imagesToAppend += `<div class="column">
    <img src="`+ images +`" style="width:100%"></div>`;

    document.getElementById("imagesContainer").innerHTML = imagesToAppend;
  }
};

prodComments = [];

function showComments(prodComments) {
  let commentsToAppend = "";

  for (let i = 0; i < prodComments.length; i++) {
    let comments = prodComments[i];

    commentsToAppend +=
      `<ul class="list-group mb-3">
    <li class="list-group-item list-group-item-action">` +
      `<b>`+ comments.user +`</b>` + " " + comments.dateTime + " " + showScore(comments.score) +
      `</li>
    <small class="list-group-item d-flex justify-content-between lh-condensed">` +
      comments.description +
      `</small>`;

    document.getElementById("comments-container").innerHTML = commentsToAppend;
  }
}

function showScore(points) {
    var stars="";
    for (let i = 1; i<=5; i++) {
        if (i<=points){
            stars += `<i class="fas fa-star checked"></i>`;
        } else {
            stars += `<i class="far fa-star checked"></i>`;
        }
    }
    return stars;
};

//var newComments = JSON.parse(prodComments);
//newComments['prodComments'].push({"teamId":"4","status":"pending"});
//Str_txt = JSON.stringify(parse_obj);

//let newComments = []

function showNewComments(prodComments) {
  let commentList = "";
  for (let comment of prodComments){
    commentList += `<ul class="list-group mb-3">
    <li class="list-group-item list-group-item-action">` +
      `<b> ${comment.user} </b>` + " " + `<span> ${showScore(comment.stars)} </span>` + " " +
      `</li>
    <small class="list-group-item d-flex justify-content-between lh-condensed"> ${comment.description} </small>`;
  }
  document.getElementById('comments-container').innerHTML = commentList;
};

function writeComment() {
  let users={}
  users.user = localStorage.getItem("correo");
  users.description = document.getElementById("prodUserComment").value;
  prodComments.push(users);
  showNewComments(prodComments);
};

document.addEventListener("DOMContentLoaded", function () {
  let prodID = localStorage.getItem("prodID");
  getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prodInfo = resultObj.data;
      showProdInfo(prodInfo);
      showImages(prodInfo);
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
  document.getElementById("sendCom").addEventListener('click',()=>{
    writeComment();
    showNewComments(prodComments);
  });
  document.getElementById('userProdScore').addEventListener('change',function(){
  showScore(document.getElementById('userProdScore').value);
});
});
