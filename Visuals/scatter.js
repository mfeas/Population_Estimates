// scatter.js

let data; // Variable to hold the loaded data

// Function to fetch and parse CSV file
async function loadCSV() {
    const response = await fetch('Race_Info.csv');
    const text = await response.text();
    const rows = text.split('\n');
    const headers = rows[0].split(',');
    data = rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
    console.log(data); // Add this line to check if data is loaded
}

function filterData(race) {
    const race18 = `${race}18`;
    const race19 = `${race}19`;
    var x_array = [];
    var y_array = [];
    var text_array = [];
        data.map(row=> (
        x_array.push(row[race18]),
        y_array.push(row[race19]),
        text_array.push(row.STATE)
       ));
       
       filtered = {
       x : x_array,
       y : y_array,
       text: text_array,
       mode: 'markers',
       type: 'scatter'
       };

    console.log(filtered); // Add this line to check if filtered data is correct
    return filtered;
}



async function updatePlot() {
    if (!data) {
        await loadCSV();
    }
    race = document.getElementById("filter").value;
    filteredData = filterData(race);
    
    const layout = {
        title: `Scatter Plot of ${race} in 2018 vs 2019`,
        xaxis: {
            title: `${race} 2018`,
            range: [0, 10000000]  // Set the range for x-axis
        },
        yaxis: {
            title: `${race} 2019`,
            range: [0, 10000000]  // Set the range for y-axis
        }
    };
    

    console.log(filteredData); // Add this line to check if filtered data is correct
    var filteredArray = [filteredData];
    Plotly.newPlot('scatter-plot', filteredArray, layout);
    console.log('Plotly.newPlot called'); // Add this line
}



// Populate the filter dropdown with race options
const raceOptions = ['WHITEPOP', 'BLACKPOP', 'AIANPOP', 'ASPOP', 'HOPPOP'];
const filterDropdown = document.getElementById("filter");

raceOptions.forEach(race => {
    const option = document.createElement("option");
    option.value = race;
    option.text = `${race} Population`;
    filterDropdown.appendChild(option);
});

// Attach event listener to the filter dropdown
filterDropdown.addEventListener("change", updatePlot);

// Initial plot
updatePlot();
