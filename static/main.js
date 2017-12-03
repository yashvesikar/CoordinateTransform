$("#form3").submit(function( event ){
  event.preventDefault();
  // Coordinate arrays to plot
  var x = [0];
  var y = [0];
  var z = [0];
  // User coordinate values
  let old_x = parseInt($("#coordinates-x").val())
  let old_y = parseInt($("#coordinates-y").val())
  let old_z = parseInt($("#coordinates-z").val())
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

  console.log("old_system", old_system);

  if( new_system === 1){
    new_system = "cartesian";
    plotCartesian(x,y,z,'graph2');
  }
  else if ( new_system === 2){
    new_system = "spherical";
    plotSpherical(x,y,z,'graph2');
  }
  else {
    new_system = "cylindrical";
    plotCylindrical(x,y,z,'graph2');
  }

  console.log("new_system", new_system);

  $.getJSON('/transform', {
    x: old_x,
    y: old_y,
    z: old_z,
    from_system: old_system,
    to_system: new_system
  }, function(data) {

    let x = data.x;
    if(data.system === "cartesian"){
      $("#new-coordinates").html("X: "+data.x.toFixed(5)+", Y: "+data.y.toFixed(5)+", Z: "+data.z.toFixed(5));
    } else if(data.system === "spherical") {
      $("#new-coordinates").html("R: "+data.x.toFixed(5)+", &theta;: "+data.y.toFixed(5)+", &phi;: "+data.z.toFixed(5));
    } else {
      $("#new-coordinates").html("R: "+data.x.toFixed(5)+", &theta;: "+data.y.toFixed(5)+", Z: "+data.z.toFixed(5));
    }

    console.log(typeof(parseFloat(data.x)));
  });
  return false;

});

function plotCartesian(x,y,z, target){
  var data = [{
    type: 'scatter3d',
    mode: 'lines',
    x: x,
    y: y,
    z: z,
    opacity: 1,
    line: {
      width: 6,
      color: "rgb(0,0,0)",
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

function plotCylindrical(r,theta,z, target){
  var data = [{
    type: 'scatter3d',
    mode: 'lines',
    x: r,
    y: theta,
    z: z,
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

function plotSpherical(r, theta, phi, target){
  var data = [{
    type: 'scatter3d',
    mode: 'lines',
    x: r,
    y: theta,
    z: phi,
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
