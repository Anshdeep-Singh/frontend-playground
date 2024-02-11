"use client"; 
import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";


const defaultHtmlCode = `<h1 id="heading" class="text-4xl text-center font-bold mb-2 shadow-lg">
  Front end Playground with 
  <span class="text-blue-500">Tailwind CSS</span>
</h1>

<button onclick="changeColor(document.getElementById('heading'))" class="bg-red-500 text-white p-2 rounded">
  Click me
</button>

<div class="flex justify-center items-center mb-4">
  <input type="text" class="border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none" 
    placeholder="Search...">
  <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded-r-lg">Search</button>
</div>
      
<div class="grid grid-cols-3 gap-4">
    <div class="bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-bold mb-2">Card 1</h2>
        <p>Some text here</p>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-bold mb-2">Card 2</h2>
        <p>Some text here</p>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-bold mb-2">Card 3</h2>
        <p>Some text here</p>
    </div>
</div>
`;

const defaultCssCode = `h1 {
  color: black;
  border-radius: 3px;
  padding: 10px;
}

button {
  background: red;
}
`;

const defaultJsCode = `function changeColor(x) {
  if (x.style.background === 'rgb(176, 139, 130)') {
    x.style.background = 'rgb(241, 250, 238)';
  } else {
    x.style.background = 'rgb(176, 139, 130)';
  }
}
`;

export default function Home() {

  const [htmlCode, setHtmlCode] = useState(
    typeof localStorage !== 'undefined' && localStorage.getItem("htmlCode") || defaultHtmlCode 
  );

  const [cssCode, setCssCode] = useState(
    typeof localStorage !== 'undefined' &&  localStorage.getItem("cssCode") || defaultCssCode
  );

  const [jsCode, setJsCode] = useState(
    typeof localStorage !== 'undefined' &&  localStorage.getItem("jsCode") || defaultJsCode
  );

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("htmlCode", htmlCode);
      localStorage.setItem("cssCode", cssCode);
      localStorage.setItem("jsCode", jsCode);
    }
  }, [htmlCode, cssCode, jsCode]);

  const handleReset = () => {
    setHtmlCode(defaultHtmlCode);
    setCssCode(defaultCssCode);
    setJsCode(defaultJsCode);
  };

const onChangeHTML = useCallback((value: string) => {
  setHtmlCode(value);
}, []);

const onChangeCSS = useCallback((value: string) => {
  setCssCode(value);
}
, []);

const onChangeJS = useCallback((value: string) => {
  setJsCode(value);
}, []);


  const [fontSize, setFontSize] = useState(10);
  const [textColor, setTextColor] = useState("#ffffff"); // Initial text color


  const handleFontSizeChange = (newSize: number) => {
    if (newSize >= 8 && newSize <= 12) {
      setFontSize(newSize);
    }
  };

  const handleTextColorChange = (newColor: string) => {
    setTextColor(newColor);
  };

  const handleExport = () => {
    // Combine HTML, CSS, and JS into a single HTML file
    const combinedCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    <style>
      ${cssCode}
    </style>
    <title>Output</title>
  </head>
  <body>
    ${htmlCode}
    <script>
      ${jsCode}
    </script>
  </body>
</html>`;

    // Create a Blob and download the HTML file
    const blob = new Blob([combinedCode], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.html";
    link.click();
  };

  const srcCode = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
      <style>
        ${cssCode}
      </style>
      <title>Output</title>
    </head>
    <body>
      ${htmlCode}
      <script>
        ${jsCode}
      </script>
    </body>
  </html>`


  return (
    <div className="flex flex-col bg-gray-700 py-4">
      <div className="left px-10 pr-8 pt-4 w-full flex flex-row lg:flex-col sm:px-2 sm:pr-[1.5rem]">
        <div className="w-1/3 mx-2 lg:w-full">
          <div className="flex flex-row">
            <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 w-1/2">HTML</label>
            <button onClick={handleExport}
              className="w-full rounded-lg bg-gray-800 text-white px-4 py-1 text-xs shadow-lg ml-2 text-center"
            >
              Export&nbsp;as&nbsp;HTML&nbsp;&darr;
            </button>
          </div>
          <CodeMirror
              className="w-full bg-gray-800 text-white px-4 py-1 text-xs shadow-lg mt-2 rounded-lg"
              value={htmlCode}
              height="342px"
              theme="dark"
              extensions={[html()]}
              onChange={onChangeHTML}
              placeholder={"<h1>Hello, world!</h1>"}
              style={{ fontSize: `${fontSize}px`, color: textColor }}
            />
        </div>
        <div className="w-1/3 mx-2 lg:w-full">
          <div className="flex flex-row">
            <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 w-1/2 lg:mt-2">CSS</label>
            <button onClick={handleReset}
              className="w-full rounded-lg bg-red-500 text-white px-4 py-1 text-xs shadow-lg ml-2 text-center lg:mt-2"
            >
              Reset
            </button>
          </div>
          <CodeMirror
              className="w-full bg-gray-800 text-white px-4 py-1 text-xs shadow-lg mt-2 rounded-lg"
              value={cssCode}
              height="342px"
              theme="dark"
              extensions={[css()]}
              placeholder={"h1 { color: red; }"}
              onChange={onChangeCSS}

              style={{ fontSize: `${fontSize}px`, color: textColor,backgroundColor: 'bg-gray-800' }}
            />
        </div>
        <div className="w-1/3 mx-2 lg:w-full">
          <div className="flex flex-row">
            <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 w-1/2 lg:mt-2">JavaScript</label>
            <input
              type="number"
              className="w-full rounded-lg bg-gray-800 text-white px-4 py-1 text-xs shadow-lg ml-2 lg:mt-2"
              value={fontSize}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value, 10))}
              min={8}
              max={12} />
          </div>
          <CodeMirror
              className="w-full bg-gray-800 text-white px-4 py-1 text-xs shadow-lg mt-2 rounded-lg"
              value={jsCode}
              height="342px"
              theme="dark"
              extensions={[javascript()]}
              onChange={onChangeJS}
              placeholder={"function myFunction() {\n  document.getElementById('demo').innerHTML = 'Hello, world!';\n}"}
              style={{ fontSize: `${fontSize}px`, color: textColor }}
            />
        </div>
      </div>

      <div className="flex flex-col right px-10 w-full mt-2 mx-2 sm:px-2 sm:pr-[1.5rem]">
        <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 block text-center">Output</label>
        <div id="topbar">
          <div id="icons">
            <div id="home-icon"></div>
            <div id="arrow-left"></div>
            <div id="arrow-right"></div>
          </div>
          <div id="search-field">
            <div id="search-icon"></div>
            <div id="url">localhost:<span className="text-gray-700">3000</span></div>
          </div>
          <div id="close"></div>
        </div>
        <iframe id="output" className="w-[100%] bg-white p-4 min-h-[750px] md:min-h-[450px]" 
        srcDoc={srcCode}>
        </iframe>
      </div>
    </div>
  );
}
