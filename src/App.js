import './App.css';
import React, {useState, useEffect } from 'react';

function App() {

  const [docContent, setDocContent] = useState('');
  
  useEffect(() => {
    const fetchDocContent = async () => {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyW4SpA8MK00rG2PJ4yvGqbyG6F3ovG-BgPE7sLUWs065mS_mwqKpwqo-tSxfrCwZsWEA/exec', {
        mode: "no-cors"
      });
      const text = await response.text();
      setDocContent(text);
      console.log(text);
    }
    fetchDocContent();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}
//https://script.google.com/macros/s/AKfycbyW4SpA8MK00rG2PJ4yvGqbyG6F3ovG-BgPE7sLUWs065mS_mwqKpwqo-tSxfrCwZsWEA/exec
//https://script.google.com/u/0/home/projects/1Q3nC3DRzQgig4ZZYAPlAfILgLlgeRX9deRCWs1I0mch3uOBL24_j8RQ8/edit
export default App;
