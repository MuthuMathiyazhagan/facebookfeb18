import React, { useState } from "react";
import "./index.css";
import axios from "axios";
var data ;

// Reading the file using default
// fs npm package
// import fs from 'fs'

function csvToArray(str, delimiter = ";") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  console.log("String Below",str);
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

export default function Home() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    var input = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      console.log("Reader E", e);
      const text = e.target.result;
      console.log("Text: ",text);
      data = csvToArray(text);
      console.log(data);
      // document.write(JSON.stringify(data));
    };

    reader.readAsText(input);

    console.log("E", e);

    console.log(e.target.files[0]);

    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {

    console.log(data);


    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    console.log(formData);

    try {
      const res = axios.post("http://127.0.0.1:3010/greeting/hello", data);

      // const res = await axios.post(
      //   "http://127.0.0.1:3010/greeting/hello",
      //   formData
      // );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="App">
      <input type="file" accept=".csv" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
