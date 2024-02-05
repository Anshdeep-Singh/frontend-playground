"use client"
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

interface CodeEditorWithLineNumbersProps {
  language: string;
  code: string;
  onChange: (value: string) => void;
  onKeyUp: () => void;
  fontSize: number;
  textColor: string;

}

const CodeEditorWithLineNumbers: React.FC<CodeEditorWithLineNumbersProps> = ({
  language,
  code,
  onChange,
  onKeyUp,
  fontSize,
  textColor,
}) => {
  const lines = code.split("\n");

  return (
    <div className="relative w-full flex">
      <div className="w-6 bg-gray-800 text-white p-2 text-right select-none mt-2 pt-4 min-h-[300px]"
      >
        {lines.map((_, index) => (
          <p key={index} className="text-xs"
            style={{ fontSize: `${fontSize}px`, color: textColor }}
          >
            {index + 1}
          </p>
        ))}
      </div>
      <textarea
        name={`${language}-code`}
        id={`${language}-code`}
        className="w-full min-h-[300px] px-[5px] py-[15px] bg-gray-900 text-white mt-2 rounded-md text-xs border border-gray-700 focus:outline-none focus:border-blue-500"
        style={{ overflow: 'hidden', fontSize: `${fontSize}px`, resize: 'none', height: 'auto', color: textColor }}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={onKeyUp}
      ></textarea>
    </div>
  );
};


export default function Home() {
  const [htmlCode, setHtmlCode] = useState(`<h1 id="heading" 
  class="text-4xl text-center font-bold mb-2 shadow-lg">
  Front end Playground with 
  <span class="text-blue-500">Tailwind CSS</span>
</h1>

<button 
  onclick="changeColor(document.getElementById('heading'))" 
  class="bg-red-500 text-white p-2 rounded">
  Click me
</button>





`);

  const [cssCode, setCssCode] = useState(`h1{
  color:black;
  border-radius: 3px;
  padding:10px;
}

button{
  background:red;
}







`);

  const [jsCode, setJsCode] = useState(`function changeColor(x){
  if(x.style.background === 'rgb(176, 139, 130)'){
    x.style.background = 'rgb(241, 250, 238)';
  }
  else{
    x.style.background = 'rgb(176, 139, 130)';
  }
}








`);

  const handleOutput = () => {
    const outputCode = document.getElementById("output") as HTMLIFrameElement | null;

    if (outputCode?.contentDocument && outputCode.contentDocument.body) {
      const tailwindCSSLink = document.createElement("link");
      tailwindCSSLink.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
      tailwindCSSLink.rel = "stylesheet";
      outputCode.contentDocument.head.appendChild(tailwindCSSLink);

      outputCode.contentDocument.body.innerHTML = ReactDOMServer.renderToStaticMarkup(
        <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
      );
      const styleElement = outputCode.contentDocument.createElement("style");
      styleElement.innerHTML = cssCode;
      outputCode.contentDocument.head.appendChild(styleElement);
      (outputCode.contentWindow as any).eval(jsCode);
    }
  };

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


  useEffect(() => {
    handleOutput();
  }, []);

  return (
    <div className="flex flex-col bg-gray-700 py-4 w-full">
      <div className="left px-10 pt-4 w-full flex flex-row lg:flex-col sm:px-2 sm:pr-[1.5rem]">
        <div className="w-full mx-2">
          <div className="flex flex-row">
            <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 w-1/2">HTML</label>
            <button onClick={handleExport}
              className="w-full rounded-lg bg-gray-800 text-white px-4 py-1 text-xs shadow-lg ml-2 text-center" 
            >
              Export&nbsp;as&nbsp;HTML&nbsp;&darr;
            </button>
          </div>
          <CodeEditorWithLineNumbers
            language="html"
            code={htmlCode}
            onChange={(value) => setHtmlCode(value)}
            onKeyUp={handleOutput}
            fontSize={fontSize}
            textColor={textColor}
          />
        </div>
        <div className="w-full mx-2">
          <div className="flex flex-row">
            <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 w-1/2 lg:mt-2">CSS</label>
            <input
              type="color"
              className="w-full rounded-lg bg-gray-800 text-white px-[4.5rem] py-1 text-xs shadow-lg ml-2 lg:mt-2"
              value={textColor}
              onChange={(e) => handleTextColorChange(e.target.value)}
            />
          </div>
          <CodeEditorWithLineNumbers
            language="css"
            code={cssCode}
            onChange={(value) => setCssCode(value)}
            onKeyUp={handleOutput}
            fontSize={fontSize}
            textColor={textColor}
          />
        </div>
        <div className="w-full mx-2">
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
          <CodeEditorWithLineNumbers
            language="js"
            code={jsCode}
            onChange={(value) => setJsCode(value)}
            onKeyUp={() => handleOutput()}
            fontSize={fontSize}
            textColor={textColor}
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
        <iframe id="output" className="w-[100%] bg-white p-4 min-h-[750px] md:min-h-[450px] ">
        </iframe>
      </div>
    </div>
  );
}
