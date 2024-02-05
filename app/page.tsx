"use client"
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

export default function Home() {
  const [htmlCode, setHtmlCode] = useState(`
    <h1 id="heading" class="text-4xl font-bold text-white">Front end Playground</h1>
    <button onclick="changeColor(document.getElementById('heading'))" class="bg-red-500 text-white p-2 rounded">Click me</button>
  `);

  const [cssCode, setCssCode] = useState(`
  h1{
    color:black;
    border-radius: 25px;
    padding:10px;
  }

  button{
    background:red;
  }
  `);

  const [jsCode, setJsCode] = useState(`
  function changeColor(x){
    if(x.style.background === 'red'){
      x.style.background = 'blue';
    }
    else{
      x.style.background = 'red';
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

  useEffect(() => {
    handleOutput();
  }, []);

  return (
    <div className="container flex flex-row bg-gray-700 h-[100vh] w-screen">
      <div className="left p-10 w-1/2">
        <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1">HTML</label>
        <textarea
          name="html-code"
          id="html-code"
          className="w-full px-[10px] py-[10px] bg-gray-400 mt-2 rounded-md h-1/4 mb-4 text-xs"
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          onKeyUp={() => handleOutput()}
        ></textarea>
        <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1">CSS</label>
        <textarea
          name="css-code"
          id="css-code"
          className="w-full px-[10px] py-[10px] bg-gray-400 mt-2 rounded-md h-1/4 mb-4 text-xs"
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
          onKeyUp={() => handleOutput()}
        ></textarea>
        <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1">JavaScript</label>
        <textarea
          name="js-code"
          id="js-code"
          className="w-full px-[10px] py-[10px] bg-gray-400 mt-2 rounded-md h-1/4 text-xs"
          value={jsCode}
          onChange={(e) => setJsCode(e.target.value)}
          onKeyUp={() => handleOutput()}
        ></textarea>
      </div>
      <div className="right p-10 w-1/2">
        <label className="text-white text-md shadow-lg rounded-lg bg-gray-800 px-4 py-1">Output</label>
        <iframe id="output" className="w-[100%] h-[90%] bg-gray-400 mt-2" src="" frameBorder="0"></iframe>
      </div>
    </div>
  );
}
