var width = 700;  
var height = 700;  

var svg = d3.select("body")     
    .append("svg")          
    .attr("width", width)       
    .attr("height", height);   
  
d3.csv("pie.csv",function(csvdata) {  
var dataset = [];
 for (var i = 0; i < csvdata.length; i++) {
    dataset.push(csvdata[i].total)
}   
var pie = d3.pie();
var piedata = pie(dataset);

var outerRadius = 200; 
var innerRadius = 0; 
var arc = d3.arc()  
    .innerRadius(innerRadius)  
    .outerRadius(outerRadius);  
var color = d3.schemeCategory10
var arcs = svg.selectAll("g")
    .data(piedata)
    .enter()
    .append("g")
    .attr("transform","translate("+ (width/2) +","+ (width/2) +")");

arcs.append("path")
    .attr("fill",function(d,i){
        return color[i];
    })
    .attr("d",function(d){
        return arc(d);   
    });
arcs.append("text")
    .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor","middle")
    .text(function(d){
        return d.data;
    });
var legend = svg.selectAll(".legend")
      .data(piedata)
    	.enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {       return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { 				return color[i]; 
      });

  legend.append("text")
      .attr("x", width-24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d,i) { if(i <  csvdata.length) return csvdata[i].year; });
  
});