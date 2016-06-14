$.ajax({url:'/api/result?project_id=3292'}).done(function(data){
    for(i=0;i<data.length;i++) {
        if (data[i]['info']) {
            var slide = $("<div/>");
            var col = $("<div/>");
            col.addClass("div-product");
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
            console.log(oneLabel);
            if (oneLabel) {
                $(".swiper-wrapper").append(slide);
            }

        }
    }

    // Create slides
    var swiper = new Swiper('.swiper-container', { 
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
});

