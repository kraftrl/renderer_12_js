//@ts-check

// access the button on the html file
const runButton = document.getElementById("run");
const codeBox = document.getElementById("input");

// add the runCode function to the button's event listener
runButton?.addEventListener("click", runCode);

setCanvas();
addImportCode();
addDisplayCode();
addAnimationCode();

function runCode()
{
    //@ts-ignore
    const code = codeBox?.value;
    
    // make a script tag, 
    // set the script code to be the written code
    // and add the script to the document and remove any previous script tag additions
    const script = document.createElement("script");
    script.text = code;
    script.type = "module";
    document.head.appendChild(script).parentNode?.removeChild(script);
}

// get and set the canvas to be black to start with
function setCanvas()
{
    const resizer = document.getElementById("resizer");
    const w = resizer?.offsetWidth;
    const h = resizer?.offsetHeight;

    //@ts-ignore
    const ctx = document.getElementById("pixels").getContext("2d");
    // @ts-ignore
    if (ctx == null)
    {
       console.log("cn.getContext(2d) is null");
    }

    ctx.canvas.width = w;
    ctx.canvas.height = h;

    //@ts-ignore
    const black = new Uint8ClampedArray(w * h * 4);
    for(let x = 3; x < black.length; x += 4)
        black[x] = 255;

    //@ts-ignore
    ctx.putImageData(new ImageData(black, w, h), 0, 0);
}

// add the import code to the text box
function addImportCode()
{
    codeBox.value += "//ts-check\n\n";
    codeBox.value += "//import what is necessary from the appropriate imports\n"
    codeBox.value += "import {} from \"./renderer/scene/sceneExport.js\";\n";
    codeBox.value += "import {} from \"./renderer/pipeline/pipelineExport.js\";\n";
    codeBox.value += "import {} from \"./renderer/framebuffer/FramebufferExport.js\";\n";
}

// add the writing to a canvas code to the text box
function addDisplayCode()
{
    codeBox.value += "\n\n";
    codeBox.value += "//Code to display the scene created\n";
    codeBox.value += "const resizer = new ResizeObserver(display);\n";
    codeBox.value += "resizer.observe(document.getElementById(\"resizer\"));\n";
    codeBox.value += "function display()\n";
    codeBox.value += "{\n";
    codeBox.value += "\tconst w = resizer?.offsetWidth;\n";
    codeBox.value += "\tconst h = resizer?.offsetHeight;\n";
    codeBox.value += "\n";
    codeBox.value += "\tconst ctx = document.getElementById(\"pixels\").getContext(\"2d\");\n";
    codeBox.value += "\tif(ctx == null)\n";
    codeBox.value += "\t{\n\t\tconsole.log(\"cn.getContext(2d) is null\");\n\t\treturn;\n\t}\n\n";
    codeBox.value += "\tctx.canvas.width = w;\n";
    codeBox.value += "\tctx.canvas.height = h;\n\n";
    codeBox.value += "\tconst fb = new FrameBuffer(w, h);\n\n";
    codeBox.value += "\trenderFB(scene, fb);\n\n";
    codeBox.value += "\tctx.putImageData(new ImageData(fb.pixelBuffer, fb.width, fb.height), fb.vp.vp_ul_x, fb.vp.vp_ul_y);\n";
    codeBox.value += "}\n";
}

// add the animation code to the text box
function addAnimationCode()
{
    codeBox.value += "\n\n";
    codeBox.value += "//Code to animate the program\n";
    codeBox.value += "let timer = null;\n";
    codeBox.value += "displayNextFrame();\n";
    codeBox.value += "function displayNextFrame()\n";
    codeBox.value += "{\n";
    codeBox.value += "\ttimer = setInterval(function() \n";
    codeBox.value += "\t{\n";
    codeBox.value += "\t\t'move models function'\n";
    codeBox.value += "\t\tdisplay();\n";
    codeBox.value += "\t}, 1000/50); // 50 frames per second\n";
    codeBox.value += "}\n";
}
