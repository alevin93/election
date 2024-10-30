import './App.css';
import IMAGE from './image.jpg';
import React, { useState, useEffect } from 'react';

function App() {
  const DOWNLOAD_LINK = "https://docs.google.com/spreadsheets/d/1GGmVEGCxgqsrmhiW2iRh6UcfpVg7cLkU8DewOh0Lpr8/gviz/tq?tqx=out:txt";
  const [harrisVotes, setHarrisVotes] = useState(0);
  const [trumpVotes, setTrumpVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(DOWNLOAD_LINK);
      const text = await response.text();

      // Extract the JSON data from the response
      const jsonMatch = text.match(/google.visualization.Query.setResponse\((.+)\);/);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1]);
        const rows = jsonData.table.rows;

        let harris = 0;
        let trump = 0;

        rows.forEach(row => {
          const president = row.c[1].v;
          if (president === "Harris") {
            harris++;
          } else if (president === "Trump") {
            trump++;
          }
        });

        setHarrisVotes(harris);
        setTrumpVotes(trump);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 3-10 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, (Math.floor(Math.random() * 8) + 3) * 1000); // 3-10 seconds

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const totalVotes = harrisVotes + trumpVotes;
  const harrisPercentage = totalVotes === 0 ? 50 : (harrisVotes / totalVotes) * 100;
  const trumpPercentage = totalVotes === 0 ? 50 : (trumpVotes / totalVotes) * 100;

  return (
    <div className="App">
      <header className="App-header">
        <div className="content-wrapper">
          <h1>Chatsworth Charter High Election Results</h1>
          <div className="container">
          <div className='image-container'>
            <img src={IMAGE} alt="Vote Counts" className="background-image" />
            <div className='kamala-name'>Kamala Harris</div>
            <div className='trump-name' >Donald J. Trump</div>
            
            <div className='kamala-votes'>{harrisVotes}</div>
            <div className='trump-votes'>{trumpVotes}</div>
          </div>
          <div className='vote-container'>
          <div className='trump-vote-container'>hello</div>
          <div className='kamala-vote-container'>hello</div>
          </div>
          </div>
        </div>
        <div className="chart-container"> {/* Chart container at the bottom */}
              <div className="harris-bar" style={{ width: `${harrisPercentage}%`}}></div>
              <div className="trump-bar" style={{ width: `${trumpPercentage}%` }}></div>
            </div>
            <div className="pc-container"> {/*Show percentages */}
              <div className="harris-pc" style={{ width: `${harrisPercentage}%` }}>{Math.round(harrisPercentage)}%</div>
              <div className="trump-pc" style={{ width: `${trumpPercentage}%` }}>{Math.round(trumpPercentage)}%</div>
            </div>
      </header>
    </div>
  );
}

export default App;