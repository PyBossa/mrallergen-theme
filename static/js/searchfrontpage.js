if ((window.location['pathname'] === '/') || ((window.location['pathname'] === '/results') && (window.location['search'] === ''))) {
    $.ajax({url:'/api/result'}).done(function(data){
                if (window.matchMedia("(min-width: 768px)").matches) {
                    resultsDesktop(data);
                } 
                
                else { 
                    resultsMobile(data);
                }
    });
    
    
    function resultsDesktop(data) {
        $(".swiper-container").remove();
        var container = $("<div/>");
        container.addClass("container");
        var row = $("<div/>");
        row.addClass("row products");
        container.append(row);
        $(".numbers").append(container);
        var total = 0;
        for (i=0; i<data.length;i++) {
            if (data[i]['info']) {
                var location = "/results?name=" + encodeURIComponent(data[i]['info']['name']) + "&showBig=true";
                var col = $("<div/>");
                col.addClass("col-xs-12 col-sm-6 col-md-4 col-lg-3 div-product last-product");
                var product = $("<div/>", {"data-location": location });
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
                divImg.addClass("img-vertical-centered img-vertical-home-centered");
                var productImg = $("<img/>");
                productImg.attr("src", data[i]['info']['productImg']);
                productImg.addClass("img img-home img-responsive");
                divImg.append(productImg);
    
                name.text(data[i]['info']['name']);
                product.append(divImg);
                product.on('click', function(){
                    window.location.href = $(this).data('location');
                });
                col.append(product);
                if (oneLabel) {
                    total += 1;
                    $(".row.products").append(col);
                }
                if (total === 4) {
                    break;
                }
            }
        }
    }
    
    
    function resultsMobile(data) {
        for(i=0;i<data.length;i++) {
            if (data[i]['info']) {
                var location = "/results?name=" + encodeURIComponent(data[i]['info']['name']) + "&showBig=true";
                var slide = $("<div/>", {"data-location": location });
                var a = $("<a/>");
                var col = $("<div/>");
                col.addClass("div-product last-product");
                var col2 = $("<div/>");
                col2.addClass("col-xs-6 col-sm-6 col-md-4 col-lg-3 div-product");
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
    
                name.text(data[i]['info']['name']);
                if (data[i]['info']['brand']) {
                    brand.text(data[i]['info']['brand']);
                }
                else {
                    brand.html("<br/>");
                }
    
    
                col2.append(brand);
                col2.append(name);
                col2.append(labels);
    
                var productImg = $("<img/>");
                productImg.attr("src", data[i]['info']['productImg']);
                productImg.addClass("img"); 
                col.append(productImg);
    
                slide.addClass("swiper-slide");
                slide.append(col);
                slide.append(col2);
                slide.attr("id", "product-" + data[i]['id']);
                slide.on('click', function(){
                    window.location.href = $(this).data('location');
                });
                if (oneLabel) {
                    $(".swiper-wrapper").append(slide);
                }
    
            }
        }
    
        // Create slides
        var swiper = new Swiper('.swiper-container', { 
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
    }
    
    $("#homesearch").keyup(function(event){
            if(event.keyCode == 13){
            var data = $("input").val();
            window.location.href = "/results?name=" + encodeURIComponent(data);
            }
            });
    
    $("#search").off('click').on('click', function(){
        var data = $("input").val();
        window.location.href = "/results?name=" + encodeURIComponent(data);
    });
}
