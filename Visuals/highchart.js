document.addEventListener('DOMContentLoaded', function() {
    // Assuming you have loaded Highcharts library
    Highcharts.chart('highchart-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Race Changes'
        },
        xAxis: {
            categories: [], // This will be populated with race names
            title: {
                text: 'Race'
            }
        },
        yAxis: {
            title: {
                text: 'Percentage Change'
            }
        },
        series: [{
            name: 'Percentage Change 2018-2019',
            data: [] // This will be populated with percentage change data
        }]
    });

    // Fetch CSV data and process it
    fetch('Race_Changes.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const categories = [];
            const percentageChanges = [];

            rows.forEach(row => {
                const columns = row.split(',');
                const race = columns[0];
                const percentageChange = parseFloat(columns[5]);

                categories.push(race);
                percentageChanges.push(percentageChange);
            });

            // Update Highchart series data and categories
            const chart = Highcharts.charts[0];
            chart.xAxis[0].setCategories(categories);
            chart.series[0].setData(percentageChanges);
        });
});
