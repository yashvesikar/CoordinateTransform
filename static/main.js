$("#form3").submit(function( event ){
  event.preventDefault();

  // Coordinate arrays to plot
  var x = [0];
  var y = [0];
  var z = [0];

  // User coordinate values
  let old_x = parseFloat($("#coordinates-x").val())
  let old_y = parseFloat($("#coordinates-y").val())
  let old_z = parseFloat($("#coordinates-z").val())

  // Adding user values to array
  x.push(old_x);
  y.push(old_y);
  z.push(old_z);

  // User coordinate selections
  let old_system = parseInt($("input:radio[name='group1']:checked").val());
  let new_system = parseInt($("input:radio[name='group2']:checked").val());

  // Sets old system and plots inital coordinate graph
  if( old_system === 1 ){
    old_system = "cartesian";
    plotCartesian(x,y,z,'graph1')
  } else if ( old_system === 2 ){
    old_system = "spherical";
    plotSpherical(x,y,z,'graph1');
  } else {
    old_system = "cylindrical";
    plotCylindrical(x,y,z,'graph1');
  }

  // Saves variable as coordinate system name
  if( new_system === 1){
    new_system = "cartesian";
  }
  else if ( new_system === 2){
    new_system = "spherical";
  }
  else {
    new_system = "cylindrical";
  }

  // GET request to flask, returns point and plots data
  $.getJSON('/transform', {
    x: old_x,
    y: old_y,
    z: old_z,
    from_system: old_system,
    to_system: new_system
  }, function(data) {

    let x = [0, data.x.toPrecision(5)];
    let y = [0, data.y.toPrecision(5)];
    let z = [0, data.z.toPrecision(5)];

    // Provides coordinate output and plots graph2
    if(data.system === "cartesian"){
      $("#new-coordinates").html("X: "+x[1]+", Y: "+y[1]+", Z: "+z[1]);
      plotCartesian(x,y,z,'graph2');
    } else if(data.system === "spherical") {
      $("#new-coordinates").html("R: "+x[1]+", &theta;: "+y[1]+", &phi;: "+z[1]);
      plotSpherical(x,y,z,'graph2');
    } else {
      $("#new-coordinates").html("R: "+x[1]+", &theta;: "+y[1]+", Z: "+z[1]);
      plotCylindrical(x,y,z,'graph2')
    }

  });

});
/*
 * Function plots cartesian coordiate system
 */
function plotCartesian(x,y,z, target){

  let hoverlabel = ["X: "+x[0]+", Y: "+y[0]+", Z: "+z[0],"X: "+x[1]+", Y: "+y[1]+", Z: "+z[1]];
  var data = [{
    type: 'scatter3d',
    mode: 'lines',
    x: x,
    y: y,
    z: z,
    hoverinfo: 'text',
    hovertext: hoverlabel,
    opacity: 1,
    line: {
      width: 6,
      color: "rgb(0,0,0)"
    }
  }]

  var layout = {
  	scene: {
  		xaxis:{title: 'X AXIS'},
  		yaxis:{title: 'Y AXIS'},
  		zaxis:{title: 'Z AXIS'},
  		}
  }

  Plotly.plot(target, data, layout);
}

/*
 * Function plots Cylindrical coordiate system
 */
function plotCylindrical(r,theta,z, target){
  console.log(r,theta,z,target);

  let hoverlabel = ["R: "+r[0]+", Θ: "+theta[0]+", Z: "+z[0],"R: "+r[1]+", Θ: "+theta[1]+", Z: "+z[1]];
  var data = [{
    type: 'scatter3d',
    mode: 'lines',
    x: r,
    y: theta,
    z: z,
    hoverinfo: 'text',
    hovertext: hoverlabel,
    opacity: 1,
    line: {
      width: 6,
      color: "rgb(0,0,0)",
      reversescale: false
    }
  }]

  var layout = {
  	scene: {
  		xaxis:{title: 'R'},
  		yaxis:{title: 'THETA'},
  		zaxis:{title: 'Z'},
  		}
  }

  Plotly.plot(target, data, layout);
}

/*
 * Function plots Spherical coordiate system
 */
function plotSpherical(r, theta, phi, target){

  let hoverlabel = ["R: "+r[0]+", Θ: "+theta[0]+", Φ: "+phi[0],"R: "+r[1]+", Θ: "+theta[1]+", Φ: "+phi[1]];
  var data = [{
    type: 'scatter3d',
    mode: 'lines',
    x: r,
    y: theta,
    z: phi,
    hoverinfo: 'text',
    hovertext: hoverlabel,
    opacity: 1,
    line: {
      width: 6,
      color: "rgb(0,0,0)",
      reversescale: false
    }
  }]

  var layout = {
    scene: {
      xaxis:{title: 'R'},
      yaxis:{title: 'THETA'},
      zaxis:{title: 'PHI'},
    },
    showticklabels: false
  }

  Plotly.plot(target, data, layout);
}

// Keeps a watch on which coordinate system is selected and changes input labels
$("#initial1").click(function() {
  $("label[for='coordinates-x']").html("X")
  $("label[for='coordinates-y']").html("Y")
  $("label[for='coordinates-z']").html("Z")
});
$("#initial2").click(function() {
  $("label[for='coordinates-x']").html("R")
  $("label[for='coordinates-y']").html("&theta;")
  $("label[for='coordinates-z']").html("&Phi;")
});
$("#initial3").click(function() {
  $("label[for='coordinates-x']").html("R")
  $("label[for='coordinates-y']").html("&theta;")
  $("label[for='coordinates-z']").html("Z")
});
