import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [speechUrl, setSpeechUrl] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
    setSpeechUrl('');
    setError('');
  };

  const handleSpeech = async () => {
    try {
      const postOptions = {
        method: 'POST',
        url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': 'bf3b0dd750msh61133b961fc5319p1637b0jsn4e6b0815f3c2',
          'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          src: text,
          hl: 'en-us',
          r: '0',
          c: 'mp3',
          f: '8khz_8bit_mono'
        }
      };

      const postResponse = await axios.request(postOptions);
      setSpeechUrl(postResponse.data); // Adjust this based on actual response format
    } catch (error) {
      console.error('Error converting text to speech (POST):', error);
      setError('Failed to convert text to speech using POST. Please try again.');
      setSpeechUrl('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Text-to-Speech React App
      </Typography>
      <TextField
        label="Enter text"
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextChange}
        multiline
        rows={4}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSpeech}
        disabled={!text.trim()}
      >
        Convert to Speech
      </Button>
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      {speechUrl && (
        <audio controls>
          <source src={speechUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </Container>
  );
}

export default App;
