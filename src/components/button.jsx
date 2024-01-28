import React from 'react';
import JokeGetter from 'App';

function Button() {
    const handleClick = async () => {
      try {
        const jokeData = await JokeGetter();
        console.log('Joke Data:', jokeData);
  
        // Do something with the jokeData, such as updating state or displaying it
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
  
  export default Button;