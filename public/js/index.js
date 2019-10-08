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
    $(".login").hide();
    $(".container-admin").hide();
    $(".admin-tables").show();
    sessionStorage.setItem("username", userName);
    sessionStorage.setItem("password", password);
  } else {
    // M.toast({
    //   html: "Invalid Username or Password. Try again!",
    //   displayLength: "5000"
    // }); /*displays error message*/
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
// =============== Admin Page ===============
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
// Remove Order
$(".order-remove").on("click", function(event) {
  event.preventDefault();
  var removedOrder = this.value;
  console.log(removedOrder);
  $.ajax("api/orders/" + removedOrder, {
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
      strainId: $("#new_id")
        .val()
        .trim()
    };

    $.ajax("/api/products", {
      type: "POST",
      data: newStrain
    }).then(function() {
      console.log("added new strain");
      location.reload(true);
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
    $.ajax("/api/products/update/" + updateId, {
      type: "PUT",
      data: updateStrain
    }).then(function() {
      console.log("Updated Stain");
    });
  }
});
// =============== Checkout Page ===============
$(".checkout-btn").on("click", function() {
  if ($("#emailAddress").val().length === 0) {
    alert("Please enter your email address!");
  } else {
    var email = $("#emailAddress")
      .val()
      .trim();
    var custName;
    var phone;
    $(".checkout").hide();
    alert("Thank You Come Again");
    $(".thanks").show();
    $.ajax("/api/checkout", {
      type: "GET"
    }).then(function(result) {
      for (i = 0; i < result.length; i++) {
        delete result[i].id;
        delete result[i].createdAt;
        delete result[i].updatedAt;
        result[i].custName = custName;
        result[i].phone = phone;
        result[i].email = email;

        var newOrder = {
          custName: result[i].custName,
          prodName: result[i].name,
          price: result[i].price,
          amount: result[i].amount,
          phone: result[i].phone,
          email: result[i].email
        };

        $.ajax("/api/orders", {
          method: "POST",
          data: newOrder
        }).then(function() {
          console.log("Added " + newOrder.prodName + " to orders.");
        });
      }
      $.ajax("/api/checkout/all", {
        method: "DELETE"
      }).then(function() {
        console.log("Removed All");
      });
    });
    $(location).attr("href", "/");
  }
});

// =============== Product Page ===============
// Add Item to cart
$(".add-product-btn").on("click", function() {
  var id = this.value;
  var amount = $(`#${this.name}`).val();

  $.ajax("/api/products/id/" + id, {
    type: "GET"
  }).then(function(result) {
    var newItem = {
      name: result.name,
      price: result.price,
      amount: amount,
      total: Number(amount) * Number(result.price)
    };
    console.log(newItem);
    $.ajax("/api/checkout", {
      method: "POST",
      data: newItem
    }).then(function() {
      location.reload(true);
    });
  });
});
// Pull Description From API
$(".descript-btn").on("click", function() {
  var identifier = this.value;
  const apikey = "I8SKiAB";
  var strainId = this.name;
  $.get(
    "https://strainapi.evanbusse.com/" +
      apikey +
      "/strains/data/desc/" +
      strainId,
    function(response) {
      $(`#${identifier}`).text(response.desc);
    }
  );
});
// Search by Product Name
$(".search-btn").on("click", function() {
  var searchName = $("#search-input").val().trim();
  location.replace("/product/name/" + searchName);
})
