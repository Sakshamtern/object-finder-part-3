objectDetector = "";
input = "";
objects = [];

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.position(525, 280);

    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";

    input = document.getElementById("input").value; 
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 380); 

    if(status != "")
    {
        objectDetector.detect(video, gotResults); 
        for(i = 0; i<objects.length; i++)
        {
            fill("red"); 
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        

        if(objects[i].label == input)
        {
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("object_found").innerHTML = "object mentioned found";
            
            var synth = window.speechSynthesis;
            speak_data = "object mentioned found";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("object_found").innerHTML = "object not found";
        }
      }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}