import axios from 'axios';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import GptResponse from './CgptResponse';


// Chatbot 함수형 컴포넌트 정의
const Chatbot = ({ videoSeq }) => {
    console.log("받아온 videoSeq", videoSeq);
  // 채팅 스텝 정의
  const chatSteps = [
    {
      id: '1',
      message: '안녕하세요! 무엇을 도와드릴까요?',
      trigger: 'search',
    },
    {
      id: 'search',
      user: true,
      trigger: 'backendResponse',
    },
    {
      id: 'backendResponse',
      component: <GptResponse videoSeq={videoSeq}/>,
      waitAction: true,
      trigger: 'search',
    },
  ];

  // 테마 정의
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#F29F05',
    botFontColor: '#FFF',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  // ChatBot 컴포넌트 렌더링
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={chatSteps}
        hideHeader={true}
        placeholder={'질문을 입력하세요.'}
      />
    </ThemeProvider>
  );
};

// Chatbot 컴포넌트 내보내기
export default Chatbot;