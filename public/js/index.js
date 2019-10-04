// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};
//admin login submit button

$(".admin-tables").hide();
$(".login").show();

function check(form) {
  if (form.userid.value == "admin" && form.pswrd.value == "admin") {
    alert("Login Successful!");
    $(".login").hide();
    $(".container-admin").hide();
    $(".admin-tables").show();
  } else {
    alert("Error Password or Username"); /*displays error message*/
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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$(".remove").on("click", function(event) {
  event.preventDefault();
  var removedItem = this.value;
  $.ajax("/api/products/remove/" + removedItem, {
    type: "DELETE"
  }).then(function() {
    location.reload(true);
  })
})

$(".submit").on("click", function(event) {
  event.preventDefault();
  if($("#new_name").val().length === 0) {
    alert("Please enter all of the information before submitting.")
  }else {
    var newStrain = {
      name: $("#new_name").val().trim(),
      race: $("#new_race").val().trim(),
      mood: $("#new_mood").val().trim(),
      stock: $("#new_stock").val().trim(),
      price: $("#new_price").val().trim(),
    };

    $.ajax("/api/products", {
      type: "POST",
      data: newStrain
    }).then(function() {
      console.log("added new strain");
      // location.reload(true);
    })
  }
  
})