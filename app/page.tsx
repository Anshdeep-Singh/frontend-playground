"use client"
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

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
</button>`);

  const [cssCode, setCssCode] = useState(`h1{
  color:black;
  border-radius: 3px;
  padding:10px;
}

button{
  background:red;
}`);

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

  useEffect(() => {
    handleOutput();
  }, []);

  return (
    <div className="flex flex-col bg-gray-700 h-full py-4 w-full">
<div className="left px-10 pt-5 w-full flex flex-row">
  <div className="w-full mx-2">
    <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 block">HTML</label>
    <textarea
      name="html-code"
      id="html-code"
      className="w-full min-h-[250px] px-[10px] py-[10px] bg-gray-900 text-white mt-2 rounded-md text-xs border border-gray-700 focus:outline-none focus:border-blue-500"
      value={htmlCode}
      onChange={(e) => setHtmlCode(e.target.value)}
      onKeyUp={() => handleOutput()}
    ></textarea>
  </div>
  <div className="w-full mx-2">
    <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 block">CSS</label>
    <textarea
      name="css-code"
      id="css-code"
      className="w-full min-h-[250px] px-[10px] py-[10px] bg-gray-900 text-white mt-2 rounded-md text-xs border border-gray-700 focus:outline-none focus:border-blue-500"
      value={cssCode}
      onChange={(e) => setCssCode(e.target.value)}
      onKeyUp={() => handleOutput()}
    ></textarea>
  </div>
  <div className="w-full mx-2">
    <label className="text-white text-xs shadow-lg rounded-lg bg-gray-800 px-4 py-1 block">JavaScript</label>
    <textarea
      name="js-code"
      id="js-code"
      className="w-full min-h-[250px] px-[10px] py-[10px] bg-gray-900 text-white mt-2 rounded-md text-xs border border-gray-700 focus:outline-none focus:border-blue-500"
      value={jsCode}
      onChange={(e) => setJsCode(e.target.value)}
      onKeyUp={() => handleOutput()}
    ></textarea>
  </div>
</div>

      <div className="flex flex-col right px-10 w-full">
        <label className="text-white text-md shadow-lg rounded-sm bg-gray-800 px-4 py-1 text-center uppercase">Output</label>
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
        <iframe id="output" className="w-[100%] bg-white p-4 min-h-[250px]">
        </iframe>
      </div>
    </div>
  );
}
