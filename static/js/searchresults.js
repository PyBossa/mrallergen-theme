$("input").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
});


$("#dropdown-wheat").off('click').on('click', function(){
    var html = $("#dropdown-wheat").text() + ' <span class="caret"></span>';
    $("#default-option").html(html);
    $(".div-product").hide();
    $(".div-product.wheat").show();
    $("#n_results").text($(".div-product.wheat").length);
}); 

$("#dropdown-gluten-free").off('click').on('click', function(){
    var html = $("#dropdown-gluten-free").text() + ' <span class="caret"></span>';
    $("#default-option").html(html);
    $(".div-product").hide();
    $(".div-product.gluten-free").show();
    $("#n_results").text($(".div-product.gluten-free").length);
}); 

$("#dropdown-all").off('click').on('click', function(){
    var html = $("#dropdown-all").text() + ' <span class="caret"></span>';
    $("#default-option").html(html);
    $(".div-product").show();
    $("#n_results").text($(".div-product").length);
}); 

function confidenceTxt(n_people) {
    if (n_people < 33) {
        txt_confidence = '¡Cuidado! Sólo han revisado este producto ' + n_people + ' personas.';
    }
    if (n_people > 33 && n_people < 66) {
        txt_confidence = '¡No está nada mal! Al menos ' + n_people + ' personas han revisado el producto.';
    }
    if (n_people > 66) {
        txt_confidence = '¡GENIAL! Más de' + n_people + ' personas han revisado el producto.';
    }
    return txt_confidence;
}


function search(queryData, showBig, back) {
    var regex_non_words = XRegExp("[^\\p{L}\\s\\d]", "g");
    queryData = XRegExp.replace(queryData, regex_non_words, " ");
    var regex_spaces = XRegExp("\\p{Z}+", "g");
    queryData = XRegExp.replace(queryData, regex_spaces, " ");
    queryData = queryData.replace(/^ /gi, "");
    queryData = queryData.replace(/ $/gi, "");
    if ((queryData.match(/ /g) || []).length >= 1) {
        var query = queryData.replace(/ /g, '%26');
    }
    else {
        var query = queryData.replace(/ /g, '');
    }
    $.ajax({
        url: "/api/result?info=name::" + query + "&fulltextsearch=1",
    })
    .done(function( data ) {
        var n_products_added = 0;
        if ( console && console.log ) {
            $(".row.products").html("");
            $(".row.selected").remove();
            $("#search_term").text($("input").val());
            $("#search_term").text(queryData);

            if (data.length > 0) {
                $(".numbers").remove();
                $(".last-product").remove();
                for (i=0; i<data.length;i++) {
                    var col = $("<div/>");
                    col.addClass("col-xs-12 col-sm-6 col-md-4 col-lg-3 div-product");
                    var product = $("<div/>");
                    product.attr("id", "product-" + i);
                    product.addClass("product");
                    var brand = $("</p>");
                    brand.addClass("brand");
                    var name = $("</p>");
                    name.addClass("name");
                    var labels = $("</p>");
                    var oneLabel = false;
                    if (data[i]['info']['labelGlutenFree'] === 'yes') {
                        oneLabel = true;
                        var iconGlutenFree = $("<img>");
                        iconGlutenFree.attr("src", "/static/img/green-gluten.svg");
                        labels.text(" Sin gluten");
                        labels.prepend(iconGlutenFree);
                        labels.addClass("gluten-free");
                        col.addClass("gluten-free ");
                        labels.addClass("classification-label");
                    }

                    if (data[i]['info']['ingredientsWheat'] === 'yes') {
                        oneLabel = true;
                        var iconWheat = $("<img>");
                        iconWheat.attr("src", "/static/img/red-gluten.svg");
                        labels.text(" Trigo o trazas");
                        labels.prepend(iconWheat);
                        labels.addClass("wheat");
                        col.addClass("wheat");
                        labels.addClass("classification-label");
                    }

                    if (!oneLabel) {
                        labels.html("<br/>");
                    }


                    product.append(brand);
                    product.append(name);
                    product.append(labels);

                    var divImg = $("<div/>");
                    divImg.addClass("img-vertical-centered");
                    var productImg = $("<img/>");
                    productImg.attr("src", data[i]['info']['productImg']);
                    productImg.addClass("img img-responsive");
                    divImg.append(productImg);

                    name.text(data[i]['info']['name']);
                    product.append(divImg);
                    col.append(product);
                    if (oneLabel) {
                        n_products_added += 1;
                        $(".row.products").append(col);
                        $("#n_results").text(n_products_added);
                    }

                    // SELECTED PRODUCT CREATION
                    var row = $("<div/>");
                    row.addClass("row selected");
                    row.attr("id", "product-" + i + "-big");
                    var colImg = $("<div/>");
                    colImg.addClass("col-xs-12 col-sm-5 col-md-4 col-md-offset-2");
                    var colData = $("<div/>");
                    colData.addClass("col-xs-12 col-sm-7 col-md-5");

                    var square = $("<div/>");
                    square.addClass("square");
                    var productImgBig = $("<img/>");
                    productImgBig.attr("src", data[i]['info']['productImg']);
                    productImgBig.addClass("img-responsive img");

                    square.append(productImgBig);
                    colImg.append(square);

                    var aBrand = $("<a/>");
                    aBrand.text(data[i]['info']['brand']);
                    aBrand.addClass("brand");
                    aBrand.attr("href", "/results?name=" + data[i]['info']['brand']);
                    colData.append(aBrand);

                    var nameBig = $("</p>");
                    nameBig.addClass("name");
                    nameBig.text(data[i]['info']['name']);

                    colData.append(nameBig);

                    var classification = $("<div/>");
                    var topDiv = $("<div/>");
                    var bottomDiv = $("<div/>");
                    bottomDiv.addClass("bottom");
                    classification.addClass("classification");
                    var labelsBig = $("</p>");
                    if (data[i]['info']['labelGlutenFree'] === 'yes') {
                        var iconGlutenFree = $("<img>");
                        iconGlutenFree.attr("src", "/static/img/green-gluten.svg");
                        var txtClassification = " Sin gluten"
                        labelsBig.text(txtClassification);
                        labelsBig.prepend(iconGlutenFree);
                        labelsBig.addClass("gluten-free");
                        classification.addClass("gluten-free");
                        col.addClass("gluten-free");
                        labelsBig.addClass("classification-label");
                    }

                    if (data[i]['info']['ingredientsWheat'] === 'yes') {
                        var iconWheat = $("<img>");
                        iconWheat.attr("src", "/static/img/red-gluten.svg");
                        var txtClassification = " Trigo o trazas"
                        labelsBig.text(txtClassification);
                        labelsBig.prepend(iconWheat);
                        labelsBig.addClass("wheat");
                        classification.addClass("wheat");
                        col.addClass("wheat");
                        labelsBig.addClass("classification-label");
                    }

                    topDiv.append(labelsBig);
                    var leftDiv = $("<div/>");
                    leftDiv.addClass("onefold")
                    var rightDiv = $("<div/>");
                    rightDiv.addClass("twofolds")
                    bottomDiv.append(leftDiv);
                    bottomDiv.append(rightDiv);

                    classification.append(topDiv);
                    classification.append(bottomDiv);

                    var explanation = $("<p/>");
                    var confidence = $("<p/>");
                    var explanation_large = $("<p/>");
                    var txt_summary;
                    var txt_confidence;
                    if (data[i]['info']['labelGlutenFree'] === 'yes') {
                        var n_people = data[i]['info']['labelGlutenFreeSummary']['count'];
                        var n_people_agree = data[i]['info']['labelGlutenFreeSummary']['freq'];
                        var pct = ((n_people_agree * 100)/n_people);
                        //txt_summary =  n_people_agree + " de " + n_people + " personas (el " + pct + "%) han identificado el sello sin gluten en el producto.";
                        txt_summary =  "(" + n_people_agree + " de " + n_people + " usuarios)"; 
                        txt_confidence = confidenceTxt(n_people);
                    }
                    if (data[i]['info']['ingredientsWheat'] === 'yes') {
                        var n_people = data[i]['info']['ingredientsWheatSummary']['count'];
                        var n_people_agree = data[i]['info']['ingredientsWheatSummary']['freq'];
                        var pct = ((n_people_agree * 100)/n_people);
                        txt_summary =  "(" + n_people_agree + " de " + n_people + " usuarios)"; 

                        txt_confidence = confidenceTxt(n_people);
                    }
                    var txt = "El producto ha sido clasificado así:";
                    //explanation.text(txt);
                    //confidence.text(txt_confidence);
                    //explanation_large.text(txt_summary);

                    var text = "Clasificado por"

                    leftDiv.html("<p>Clasificado por</p><p class='big'>" + n_people + "</p><p>usuarios</p>");
                    rightDiv.html("<p>Producto clasificado</p><p class='pct'>" + txtClassification + "</p><p>por el</p><p class='pctNumber'>" + pct + "%</p><p class='summary'>" + txt_summary + "</p></div>");

                    var legend =$("<div/>");
                    legend.html("<div><p>Nivel de confianza</p></div>");
                    var colors =$("<div/>");
                    var low =$("<div/>");
                    var mid =$("<div/>");
                    var high=$("<div/>");
                    low.addClass("column");
                    mid.addClass("column");
                    high.addClass("column");
                    colors.append(low);
                    colors.append(mid);
                    colors.append(high);
                    colors.addClass("colors");
                    legend.addClass("legend");
                    legend.append(colors);


                    low.html('<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><rect class="low" x="0" y="0" width="30" height="30"/></svg><p class="small"><30</p>');
  

                    mid.html('<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><rect class="mid" x="0" y="0" width="30" height="30"/></svg><p class="small"><31 - 70></p>');

                    high.html('<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><rect class="high" x="0" y="0" width="30" height="30"/></svg><p class="small">71</p>');

                    rightDiv.append(legend);

                    // classification.append(explanation);
                    // classification.append(confidence);
                    // classification.append(explanation_large);

                    colData.append(classification);

                    var link = $("<a/>");
                    link.addClass("btn btn-primary");
                    link.attr("href", data[i]['info']['url']);
                    link.text("Ver en Soysuper");
                    var backCol = $("<div/>");
                    backCol.addClass("col-xs-12 col-md-10 col-md-offset-2");
                    var backRow = $("<div/>");
                    backRow.addClass("row row-back");
                    var back2 = $("<a/>");
                    back2.addClass("back hidden-md hidden-lg");
                    back2.html('<i class="fa  fa-lg fa-chevron-left"></i> Atrás');
                    backCol.append(back2);
                    backRow.append(backCol);
                    colData.append(link);
                    colData.append(backRow);
                    row.append(colImg);
                    row.append(colData);
                    $(".selected-product > .container").append(row);

                    $(".back").off('click').on('click', function(){
                        if (back === '') {
                            $(".last-product").remove();
                            $(".row.products").show();
                            $(".found").show();
                            $(".selected-product").hide();
                            var id = $(this).data("close");
                            $("#" + id + "-big").hide();
                            $(".results").show();
                        }
                        else {
                            window.location.href = back;
                        }
                    });

                    $(".product").off('click').on('click', function(event){
                        var id = $(this).attr("id");
                        $(".numbers").hide();
                        $(".results").hide();
                        $(".row.products").hide();
                        $(".found").hide();
                        $(".selected-product").show();
                        $("#" + id + "-big").show();
                        $(".back").data("close", id);
                        window.scrollTo(0,0);
                    });

                }

                if (!showBig) {
                    console.log("NoShoBig");
                    $(".found").show();
                }
                else {
                    console.log("ShowBig");
                    $(".found").hide();
                }

            }
            else {
                var p = $("</p>");
                p.text("No results");
                $("#searchresults").append(p);
            }

        }

        if (showBig) {
            $("#product-0").click();
        }

    $(".last-product").remove();
    });

}

$("#search").off('click').on('click', function(){
    var data = $("input").val();
    search(data, false, '');
});



var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});
if ('name' in params) {
    console.log(params['name']);
    var data = decodeURIComponent(params['name']);
    if ('showBig' in params) {
        if ('back' in params) {
            search(data, true, decodeURIComponent(params['back']));
        }
        else {
            search(data, true, '');
        }
    }
    else {
        search(data, false, '');
    }
}

