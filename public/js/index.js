//admin login submit button

$(".admin-tables").hide();
$(".login").show();

if (
  sessionStorage.getItem("userName") === null &&
  sessionStorage.getItem("password") === null
) {
  $(".admin-tables").hide();
  $(".login").show();
} else {
  $(".login").hide();
  $(".container-admin").hide();
  $(".admin-tables").show();
}

function check(form) {
  var userName = form.userid.value;
  var password = form.pswrd.value;
  if (userName == "admin" && password == "admin") {
    M.toast({ html: "Success!", displayLength: "1000" });
    $(".login").hide();
    $(".container-admin").hide();
    $(".admin-tables").show();
    sessionStorage.setItem("username", userName);
    sessionStorage.setItem("password", password);
  } else {
    M.toast({
      html: "Invalid Username or Password. Try again!",
      displayLength: "5000"
    }); /*displays error message*/
  }
}
$(".submit-admin").on("click", function() {
  check();
});

jQuery(document).ready(function($) {
  $(".content").hide();
  $(".box-right").show();
  if (sessionStorage.getItem("advertOnce") !== "true") {
    $(".content").hide();
  } else {
    $(".box-right").show();
  }

  $("#refresh-page").on("click", function() {
    $(".container-index").hide();
    $(".box-right").hide();
    $(".content").show();
    sessionStorage.setItem("advertOnce", "true");
  });

  $("#reset-session").on("click", function() {
    $(".box-right").show();
    sessionStorage.setItem("advertOnce", "");
    alert("You are underage and not able to access this website.");
    location.replace("https://www.disney.com");
  });
});
// Remove Product
$(".remove").on("click", function(event) {
  event.preventDefault();
  var removedItem = this.value;
  $.ajax("/api/products/remove/" + removedItem, {
    method: "DELETE"
  }).then(function() {
    location.reload(true);
  });
});
// Add new product
$(".new-submit").on("click", function(event) {
  event.preventDefault();
  if ($("#new_name").val().length === 0) {
    alert("Please enter all of the information before submitting.");
  } else {
    var newStrain = {
      name: $("#new_name")
        .val()
        .trim(),
      type: $("#new_race")
        .val()
        .trim(),
      mood: $("#new_mood")
        .val()
        .trim(),
      stock: $("#new_stock")
        .val()
        .trim(),
      price: $("#new_price")
        .val()
        .trim(),

      name: $("#new_name")
        .val()
        .trim(),
      race: $("#new_race")
        .val()
        .trim(),
      mood: $("#new_mood")
        .val()
        .trim(),
      stock: $("#new_stock")
        .val()
        .trim(),
      price: $("#new_price")
        .val()
        .trim()
    };

    $.ajax("/api/products", {
      type: "POST",
      data: newStrain
    }).then(function() {
      console.log("added new strain");
      // location.reload(true);
    });
  }
});
// Update Product
$(".update-submit").on("click", function(event) {
  event.preventDefault();
  if ($("#product_id").val().length === 0) {
    alert("Please enter all update information before submitting");
  } else {
    var updateId = $("#product_id")
      .val()
      .trim();
    var updateStrain = {
      stock: $("#amount")
        .val()
        .trim()
    };
    console.log(updateId);
    console.log(updateStrain);
    $.ajax("/api/products/update/" + updateId, {
      type: "PUT",
      data: updateStrain
    }).then(function() {
      console.log("Updated Stain");
    });
  }
});

$(".checkout-btn").on("click", function() {
  $(".checkout").hide();
});
