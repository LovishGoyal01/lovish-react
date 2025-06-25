import React from "react"; 
import ReactDOM from "react-dom/client"; 
 console.log("React script is running");
 
 const heading= React.createElement("h1",{ id:"heading" },"This is my first react");

 const root=ReactDOM.createRoot(document.getElementById("root"));

 root.render(heading);