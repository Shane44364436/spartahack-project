import React from 'react';
// import Header from './components/header';
// import Button1 from './components/button';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Contents } from 'react';



firebase.initializeApp({
  apiKey: "AIzaSyC0PDKMjn07fkduigvWW-sZlSBhCACnP44",
  authDomain: "spartahack-4e813.firebaseapp.com",
  projectId: "spartahack-4e813",
  storageBucket: "spartahack-4e813.appspot.com",
  messagingSenderId: "1027498289170",
  appId: "1:1027498289170:web:fd465f73a4ecdb1359d0cb",
  measurementId: "G-YQC5DQ69YK"
});

const firestore = firebase.firestore();


async function JokeGetter() {
  try {
      const newJoke = await RandomGetter();
      const lead_up = newJoke.lead_up;
      const punchline = newJoke.punchline;
      const array_of_votes = newJoke.votes;

      const one_star_votes = array_of_votes[0];
      const two_star_votes = array_of_votes[1];
      const three_star_votes = array_of_votes[2];

      let average_vote = (one_star_votes + 2*two_star_votes + 3*three_star_votes) / (one_star_votes + two_star_votes + three_star_votes);

      return {
        lead_up,
        punchline,
        average_vote: average_vote.toFixed(1),
        one_star_votes,
        two_star_votes,
        three_star_votes,
      };
      
    } catch (error) {
      console.error('Error in JokeGetter:', error);
    }
};

async function RandomGetter() {
  try {
    const jokesRef = firestore.collection('jokes');
    const snapshot = await jokesRef.get();

    if (!snapshot.empty) {
      const jokes = snapshot.docs.map(doc => doc.data());
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return randomJoke;
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
  }
};



const Button = (props) => {

  const handleClick = async () => {
    try {
      const jokeData = await JokeGetter();
      console.log('Joke Data:', jokeData);

      // Pass data back to parent 
      props.setJokeData(jokeData);

    } catch (error) {
      console.error('Error in Button handleClick:', error);
    }
  };

  return (
    <div className="button-container">
      <a className="custom-button" onClick={handleClick}>
        Click Me
      </a>
    </div>
  );
};



// function Button1() {
//   const [buttonText, setButtonText] = React.Contents("Click Me");

//   const handleClick = () => 
//     {
//     setButtonText("You pressed the button!");
//   };

//   return (
//     <div className="button-container">
//       <button className="custom-button" onClick={handleClick}>{buttonText}</button>
//     </div>
//   );
// };

function Header () {
  return (
    <header className="header-container">
      <div className="logo-container">
        <h1><a href="index.html">SpartaLaugh</a></h1>
        <ul className="page-nav"></ul>
      </div>
    </header>
  );
};


function App() {
  const [jokeData, setJokeData] = React.useState(null);
  return (
    <div className="App">
      <Header />
      <main>
      <Button setJokeData={setJokeData} />
        {/* Display the joke information */}
        {jokeData && (
          <div>
            <p>{`Lead Up: ${jokeData.lead_up}`}</p>
            <p>{`Punchline: ${jokeData.punchline}`}</p>
            <p>{`Average Vote: ${jokeData.average_vote}`}</p>
            <p>{`${jokeData.three_star_votes} other users found this funny!`}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
