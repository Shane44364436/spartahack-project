import React from 'react';

function JokeGetter() {

}

async function RandomGetter() {
    try {
        const jokesRef = firebase.database().ref('jokes');
        const snapshot = await jokesRef.once('value');
        const jokes = snapshot.val();
    
        if (jokes) {
          const jokeKeys = Object.keys(jokes);
          const randomKey = jokeKeys[Math.floor(Math.random() * jokeKeys.length)];
          const randomJoke = jokes[randomKey];
          

          return randomJoke;
        }
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
};