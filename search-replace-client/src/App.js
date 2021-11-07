import React from "react";
import './App.css';
import FileSearchReplace from './components/FileSearchReplace';

function App() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-xl mb-2">File Search and Replace Tool</h2>
      <div className="w-1/3 p-5 border border-solid border-gray-300 rounded-md">
        <FileSearchReplace/>
      </div>
    </div>
  );
}

export default App;
