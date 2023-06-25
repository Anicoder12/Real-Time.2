function preload() {

}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  c = ml5.imageClassifier("MobileNet", modelloaded);
}

function draw() {
  image(video, 0, 0, 300, 300);
  c.classify(video, gotresults);
}

function modelloaded() {
  console.log("Model has been loaded!");
}
var previous = "";
function gotresults(error, results) {
if(error) {
  console.log(error);
}
else {
 
  if(results[0].confidence>0.5 && previous != results[0].label) {
 
  console.log(results);
  document.getElementById("obj_name").innerHTML = "object name: " + results[0].label;
  document.getElementById("obj_accuracy").innerHTML = "object accuracy: " + results[0].confidence.toFixed(2);
previous = results[0].label;

var synth = window.speechSynthesis;
var utterthis = new SpeechSynthesisUtterance('The object detected is: '+results[0].label);
synth.speak(utterthis);
}
}
}



