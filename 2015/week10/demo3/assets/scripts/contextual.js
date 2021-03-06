  /* json loading */

  //get the Flickr public feed JSON for images
  function getImages(data) {
    var img_tags = data;
      //returns a promise object derived from a Deferred object
      var $deferredNotesRequest = $.getJSON (
        "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        { tags: img_tags,
          tagmode: "any",
          format: "json"
        });
        return $deferredNotesRequest;
      }

    //process image production, loading, and pass to rendering
    function processImages() {
      //check img visibility for contextual-output - clear existing images
      if (checkVisible($(".contextual-output")) === false) {
        //empty existing images
        $(".contextual-output").empty();
      }
      //get data from image search input field
      var $img_data = getImageInput();
      //use image data to get images, and pass for rendering
      $.when(getImages($img_data)).done(function(response) {
        //check for empty items array in response object
        if (response.items.length === 0) {
          var img = "";
          createImage(img);
        } else {
        //use jQuery's generic iterative function for the response...
        $.each( response.items, function( i, item ) {
          var img = item.media.m;
          createImage(img);
          //limit test images to 4
          if ( i === 5 ) {
            return false;
          }
        });
      }
      });
    }

  /* image handlers, builders... */

  //get input value for image search
  function getImageInput() {
    //define img value
    var img_val = "";
    //define input field
    var $img_tags = $(".contextual-choice input");
    if ($img_tags.val() !== "") {
      img_val = $img_tags.val();
      return img_val;
    } else {
      return img_val;
    }
  }

  //manage new image output
  function createImage(data) {
    //image output
    var img_output;
    //clear image search value
    $(".contextual-choice input").val("");
    if (data !== "") {
      //create each image element
      var $img = $('<img class="flex-img">').attr("src", data);
      //add image
      img_output = $img;
    } else {
      var $img_error = $('<p class="flex-item error">').html("No images available. Please try a different search.");
      //add error
      img_output = $img_error;
    }
    //check for visible contextual-output - if not visible
    if (checkVisible($(".contextual-output")) === true) {
      $(".note-output").removeClass("col-12");
      $(".note-output").addClass("col-4");
    }
    //append output to DOM
    $(".contextual-output").append(img_output);
    //fade in contextual-output with appended results
    $(".contextual-output").fadeIn("slow");
  }

  //handle user event for image search button click
  $(".contextual-choice button").on("click", function(e) {
    //process images
    processImages();
  });

  //handle user event for keyboard press
  $(".contextual-choice input").on("keypress", function(e) {
    //check code for keyboard press
    if (e.keyCode === 13) {
      //process images
      processImages();
    }
  });
