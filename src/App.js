import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';

function App() {
  const [text, setText] = useState('');
  const [speechUrl, setSpeechUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    setSpeechUrl('');
    setError('');
  };

  const handleSpeech = async () => {
    setLoading(true);
    setError('');

    try {
      const options = {
        method: 'GET',
        url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/',
        params: {
          src: text,
          hl: 'en-us',
          r: '0',
          c: 'mp3',
          f: '8khz_8bit_mono'
        },
        headers: {
          'x-rapidapi-key': 'bf3b0dd750msh61133b961fc5319p1637b0jsn4e6b0815f3c2',
          'x-rapidapi-host': 'cloudlabs-text-to-speech.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      setSpeechUrl(response.data); // Adjust this based on actual response format
    } catch (error) {
      console.error('Error converting text to speech:', error);
      setError('Failed to convert text to speech. Please try again.');
    } finally {
      setLoading(false);
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
        disabled={!text.trim() || loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Convert to Speech'}
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
