var receivedData = [];

function process_response(data) {
    console.log("data is " + JSON.stringify(data));
    receivedData = data;
    // We make the data look nice by using stringify with extra parameters
    data = JSON.parse(JSON.stringify(data));
    // <pre> MUST be used for the tabs to show correctly in browser
    $("#result").html("<pre>" + JSON.stringify(data, null, 4) + "</pre>");
}

function findUnicornByName() {
    let name = $("#unicornName").val();
    $.ajax({
        url: "https://boiling-island-26852.herokuapp.com/findByName",
        type: "POST",
        data: {
            unicornName: name
        },
        success: process_response
    });
}

function findUnicornByFood() {
    let appleIsChecked = $("#apple").is(":checked");
    let carrotIsChecked = $("#carrot").is(":checked");
    $.ajax({
        url: "https://boiling-island-26852.herokuapp.com/findByFood",
        type: "POST",
        data: {
            appleIsChecked: appleIsChecked,
            carrotIsChecked: carrotIsChecked,
        },
        success: process_response
    });
}

function findUnicornByWeight() {
    let lowerLimit = $("#lowerWeight").val();
    let upperLimit = $("#higherWeight").val();
    $.ajax({
        url: "https://boiling-island-26852.herokuapp.com/findByWeight",
        type: "POST",
        data: {
            lowerLimit: lowerLimit,
            upperLimit: upperLimit,
        },
        success: process_response
    });
}

function filter() {
    let filterByName = $('#unicornNameFilter').is(":checked");
    let filterByWeight = $('#unicornWeightFilter').is(":checked")
    let dataHolder;

    if (filterByName || filterByWeight) { // Filters only if a filter has been chosen
        dataHolder = receivedData.map(
            (unicorn) => {
                result = []
                if (filterByName) result.push(unicorn["name"])
                if (filterByWeight) result.push(unicorn["weight"])
                return result
            }
        )
    } else { // If no filter was chosen, then display the original data which is in the global variable
        dataHolder = JSON.stringify(JSON.parse(JSON.stringify(receivedData)), null, 4);
    }
    // <pre> allows proper formatting of the resulting list
    $("#result").html(`<pre>${dataHolder}</pre>`);
}

function setup() {
    $("#findUnicornByName").click(findUnicornByName);
    $("#findUnicornByFood").click(findUnicornByFood);
    $("#findUnicornByWeight").click(findUnicornByWeight);
    $("#filter").click(filter);
}

$(document).ready(setup);