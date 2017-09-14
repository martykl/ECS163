var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 175
      };
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
          .range([0, width]);

    var y = d3.scaleBand()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x)

    var yAxis = d3.axisLeft(y);

    d3.csv("70.csv", type, function(error, data) {
      if (error) throw error;

      x.domain([0, d3.max(data, function(d) { return d.total; })]);

      y.domain(data.map(function(d) { return d.title; }))
        .paddingInner(0.1)
        .paddingOuter(0.5);


      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "translate(" + width + ",0)")
          .attr("y", -5)
          .style("text-anchor", "end")
          .text("total");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", 0)
          .attr("height", y.bandwidth())
          .attr("y", function(d) { return y(d.title); })
          .attr("width", function(d) { return x(d.total); });

    });

    function type(d) {
      d.total = +d.total;
      return d;
    }