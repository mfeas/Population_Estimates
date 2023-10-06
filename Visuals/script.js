// Load the CSV data
d3.csv('Population_Changes.csv').then(data => {
    createChart(data);
});

function createChart(data) {
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', 1500)
        .attr('height', 800);

    const margin = { top: 80, right: 20, bottom: 30, left: 80 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const y = d3.scaleBand()
        .rangeRound([0, height])
        .padding(0.1);

    const x = d3.scaleLinear()
        .rangeRound([0, width]);

    const filteredData = data.filter(d => d.CHANGE > 0);

    y.domain(filteredData.map(d => d.STATE));
    x.domain([0, d3.max(filteredData, d => Math.abs(d.CHANGE))]);

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y));

    const xAxis = d3.axisBottom(x).ticks(10, 's');
    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('x', width)
        .attr('y', 12)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Change in Population');

    g.append('text')
        .attr('x', (width / 2))
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '24px')
        .text('Changes in Population');

    g.selectAll('.bar')
        .data(filteredData)
        .enter().append('rect')
        .attr('class', 'bar positive')
        .attr('y', d => y(d.STATE))
        .attr('x', 0)
        .attr('height', y.bandwidth())
        .attr('width', d => x(Math.abs(d.CHANGE)))
        .attr('fill', 'darkblue');

    // Add event listener to dropdown for updates
    document.getElementById('filter').addEventListener('change', function() {
        const selectedValue = this.value;
        g.selectAll('*').remove(); // Clear existing chart
        const filteredData = data.filter(d => selectedValue === 'positive' ? d.CHANGE > 0 : d.CHANGE < 0);
        y.domain(filteredData.map(d => d.STATE));
        x.domain([0, d3.max(filteredData, d => Math.abs(d.CHANGE))]);

        g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y));

        const updatedXAxis = selectedValue === 'positive'
            ? d3.axisBottom(x).ticks(10, 's')
            : d3.axisBottom(x).ticks(10, '-s');

        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(updatedXAxis)
            .append('text')
            .attr('x', width)
            .attr('y', 12)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Change in Population');

        g.append('text')
            .attr('x', (width / 2))
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .text('Changes in Population');

        g.selectAll('.bar')
            .data(filteredData)
            .enter().append('rect')
            .attr('class', d => d.CHANGE > 0 ? 'bar positive' : 'bar negative')
            .attr('y', d => y(d.STATE))
            .attr('x', 0)
            .attr('height', y.bandwidth())
            .attr('width', d => x(Math.abs(d.CHANGE)))
            .attr('fill', d => d.CHANGE > 0 ? 'darkblue' : 'lightblue');
    });
}