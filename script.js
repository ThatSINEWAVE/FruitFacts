$(document).ready(function() {
    // Load fruit list from JSON file
    $.getJSON('fruit_list.json', function(data) {
        const fruits = data.fruits;
        const select = $('#fruit-select');
        fruits.forEach(function(fruit) {
            select.append(new Option(fruit, fruit.toLowerCase()));
        });
    });

    // Handle "Get Facts" button click
    $('#get-facts-btn').click(function() {
        const selectedFruit = $('#fruit-select').val();
        if (selectedFruit) {
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const apiUrl = encodeURIComponent(`https://www.fruityvice.com/api/fruit/${selectedFruit}`);

            $.ajax({
                url: proxyUrl + apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    const data = JSON.parse(response.contents);
                    $('#fruit-name').text(data.name);
                    $('#fruit-facts').empty();
                    $('#fruit-facts').append(`<li>Family: ${data.family}</li>`);
                    $('#fruit-facts').append(`<li>Order: ${data.order}</li>`);
                    $('#fruit-facts').append(`<li>Genus: ${data.genus}</li>`);
                    $('#fruit-facts').append(`<li>Calories: ${data.nutritions.calories}</li>`);
                    $('#fruit-facts').append(`<li>Fat: ${data.nutritions.fat}g</li>`);
                    $('#fruit-facts').append(`<li>Sugar: ${data.nutritions.sugar}g</li>`);
                    $('#fruit-facts').append(`<li>Carbohydrates: ${data.nutritions.carbohydrates}g</li>`);
                    $('#fruit-facts').append(`<li>Protein: ${data.nutritions.protein}g</li>`);

                    $('#main-content').fadeOut(function() {
                        $('#facts-content').fadeIn();
                    });
                },
                error: function() {
                    alert('Error fetching data. Please try again.');
                }
            });
        } else {
            alert('Please select a fruit.');
        }
    });

    // Handle "Look up another fruit" button click
    $('#back-btn').click(function() {
        $('#facts-content').fadeOut(function() {
            $('#main-content').fadeIn();
        });
    });
});
