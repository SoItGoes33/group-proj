Parse.initialize("T6qWM2dHLB1C8z8GaEo9iUzwVoI9KmDIkmZ8jz94", "P3zlR5DQkDFEK5ynygwRgrlgncRp3rKgz0eSvpuL");
var color = [];
function formSubmit() {
    var companyName = $("#company").val();
    var teamName = $("#team").val();
    var totalEng = $("#a").val();
    var femEng = $("#b").val();
    var perEng = $("#c").val();
    var place = $("#location").val();
    var year = $("#year").val();

    var Datas = Parse.Object.extend("OurData");
    //var Datas = Parse.Object.extend("test");
    var datash = new Datas ();
    event.preventDefault();
    datash.save ({company:           companyName,
                 team:               teamName,
                 num_eng:            parseInt(totalEng),
                 num_female_eng:     parseInt(femEng),
                 percent_female_eng: parseFloat(perEng),
                 location:           place,
                 year:               parseInt(year)
               },{
              success: function() {
                alert("Successful.  Saved new information.");
                return color;
                window.location.hash="http://soitgoes33.github.io/group-proj/index.html#slide-3";
              },
              error: function(data,error){
                alert("Error ");
              }}
    );
}
var ourData = Parse.Object.extend("OurData");
//var ourData = Parse.Object.extend("test");
var query = new Parse.Query(ourData);
var female = [];
var percent = [];
var company = [];
var year = [];
var total = [];
query.select("num_female_eng");
query.select("percent_female_eng");
query.select("company");
query.select("year");
query.select("num_eng");
query.limit(1000);
query.find({
  success: function(results){
    for (var i = 0; i < results.length; i++) {
      female.push(results[i].get("num_female_eng"));
      percent.push(results[i].get("percent_female_eng"));
      company.push(results[i].get("company"));
      year.push(results[i].get("year"));
      total.push(results[i].get("num_eng"));
    }
    createChart();
  },
  error: function(data,error){
    console.log("Error " + error);
  }
});

function myData() { 
  
  var data = [];

  data.push({values: []});
  for (j = 0; j < company.length; j++) {
    var tooltip = '<p>'+ company[j] + '<br/>Female Eng: ' + percent[j]+'%' + '<br/>No. Female Eng: ' + female[j] + '<br/>Year Founded: ' + year[j] + '</p>';
    var color = [];
      data[0].values.push({
        x: female[j],
        y: percent[j],
        tooltip: tooltip,
        size: total[j],
        shape: 'circle', 
        color: d3.select('datash').append('circle').attr("fill", "red"),          
      });
  } 
  
  return data;
}

function createChart(){
  var chart;
  nv.addGraph(function() {
    chart = nv.models.scatterChart()
              .showDistX(true)
              .showDistY(true)
              .useVoronoi(true)
              //.color(d3.scale.category10().range())
              .duration(300)
              .yDomain([0,100])
              .xDomain([0,400])
              .showLegend(false)
              .interactive(true)
              .pointRange([60,400]);

    chart.tooltip.contentGenerator(function (obj) { 
      return obj.point.tooltip;
    });

    chart.dispatch.on('renderEnd', function(){
      console.log('render complete');
    });

    chart.xAxis.tickFormat(d3.format('1.0f'))
          .axisLabel('# Female Engineers');
    chart.yAxis.tickFormat(d3.format('.02f'))
          .axisLabel('% Female Engineers');

    var svg = d3.select('#test1 svg'); 
    var input = myData();
    svg.datum(input) 
      .call(chart);

    //function addZoom(options) {
      // scaleExtent
     /* var scaleExtent = 10;
      
      // parameters
      var yAxis       = options.yAxis;
      var xAxis       = options.xAxis;
      var xDomain     = options.xDomain || xAxis.scale().domain;
      var yDomain     = options.yDomain || yAxis.scale().domain;
      var redraw      = options.redraw;
      var svg         = options.svg;
      var discrete    = options.discrete;
      
      // scales
      var xScale = xAxis.scale();
      var yScale = yAxis.scale();
      
      // min/max boundaries
      var x_boundary = xScale.domain().slice();
      var y_boundary = yScale.domain().slice();
      
      // create d3 zoom handler
      var d3zoom = d3.behavior.zoom();
      
      // ensure nice axis
      xScale.nice();
      yScale.nice();
          
        // fix domain
        function fixDomain(domain, boundary) {
        if (discrete) {
            domain[0] = parseInt(domain[0]);
            domain[1] = parseInt(domain[1]);
        }
        domain[0] = Math.min(Math.max(domain[0], boundary[0]), boundary[1] - boundary[1]/scaleExtent);
        domain[1] = Math.max(boundary[0] + boundary[1]/scaleExtent, Math.min(domain[1], boundary[1]));
        return domain;
      }
          
          // zoom event handler
      function zoomed() {
        yDomain(fixDomain(yScale.domain(), y_boundary));
        xDomain(fixDomain(xScale.domain(), x_boundary));
        redraw();
      }

          // zoom event handler
      function unzoomed() {
        xDomain(x_boundary);
        yDomain(y_boundary);
        redraw();
        d3zoom.scale(1);
        d3zoom.translate([0,0]);
      }
          
          // initialize wrapper
      d3zoom.x(xScale)
            .y(yScale)
            .scaleExtent([1, scaleExtent])
            .on('zoom', zoomed);
            
      // add handler
      d3.select('#test1 svg').call(d3zoom).on('dblclick.zoom', unzoomed);
   
   }           
    // add zoom
    addZoom({
        xAxis  : chart.xAxis,
        yAxis  : chart.yAxis,
        yDomain: chart.yDomain,
        xDomain: chart.xDomain,
        redraw : function() { chart.update() },
        svg    : svg
    });*/

    nv.utils.windowResize(chart.update);

    chart.dispatch.on('stateChange', function(e) {('New State:', JSON.stringify(e)); });
    return chart;
  });
}

    

 
  