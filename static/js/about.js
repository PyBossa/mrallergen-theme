$("#aboutshowmore").on('click', function(){
    //$(".longdescription").css("height", "100%");
    $(".longdescription").toggleClass("full");
    if ($(".longdescription.full").length) {
        $(this).text("Cerrar");
    }
    else {
        $(this).text("Sí, porfi");
    }
});

