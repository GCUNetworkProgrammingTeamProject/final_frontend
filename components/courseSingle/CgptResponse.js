import axios from 'axios';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';

const GptResponse = ({ steps, videoSeq }) => {
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [gptAnswer, setGptAnswer] = useState('');

  const triggetNext = () => {
    setTrigger(true);
    props.triggerNextStep();
  };

  useEffect(() => {
    const search = steps.search.value;
    const accessToken = localStorage.getItem('accessToken');

    axios
      .post(
        `api/users/${videoSeq}/chatbot`,
        {
          messages: search,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setGptAnswer(response.data);
      })
      .catch((error) => {
        console.error('메시지 전송 중 에러:', error);
      })
      .finally(() => {
        setLoading(false);
        triggetNext();
      });
  }, []); // componentDidMount 역할을 하는 useEffect

  return (
    <div className="dbpedia">
      {loading ? <Loading /> : gptAnswer}
      {!loading && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          {!trigger && (
            <button onClick={() => triggetNext()}>다시 검색</button>
          )}
        </div>
      )}
    </div>
  );
};

export default GptResponse;
