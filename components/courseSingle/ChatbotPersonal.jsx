import axios from "axios";
import ChatBot, { Loading } from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";

// GptResponse 클래스 정의
const GptResponse = (props) => {
  const [loading, setLoading] = useState(true);
  const [gptAnswer, setGptAnswer] = useState("");

  useEffect(() => {
    const search = props.steps.search.value;
    const accessToken = localStorage.getItem("accessToken");
    const url = props.url;
    console.log("videourl", url);

    axios
      .post(
        `api/users/per/chatbot`,
        {
          messages: search,
          videoUrl: url,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setGptAnswer(response.data);
        console.log("res",response.data);
      })
      .catch((error) => {
        console.error("메시지 전송 중 에러:", error);
      })
      .finally(() => {
        setLoading(false);
        props.triggerNextStep(); // API 응답을 받은 후 자동으로 다음 스텝으로 진행
      });
  }, []);

  return <div className="dbpedia">{loading ? <Loading /> : gptAnswer}</div>;
};

// Chatbot 함수형 컴포넌트 정의
const Chatbot = (props) => {
  // console.log("받아온 videoSeq", props);
  // 채팅 스텝 정의
  const chatSteps = [
    {
      id: "greet",
      message: "안녕하세요! 무엇을 도와드릴까요?",
      trigger: "search",
    },
    {
      id: "search",
      user: true,
      trigger: "backendResponse",
    },
    {
      id: "backendResponse",
      component: <GptResponse url={props.url} />,
      waitAction: true,
      trigger: "search",
    },
  ];

  // 테마 정의
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#F29F05",
    botFontColor: "#FFF",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  // ChatBot 컴포넌트 렌더링
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={chatSteps}
        hideHeader={false}
        placeholder={"질문을 입력하세요."}
        floating={true}
        style={{ fontSize: '14px' }}
      />
    </ThemeProvider>
  );
};

//Chatbot 컴포넌트 내보내기
export default Chatbot;

// import axios from 'axios';
// import ChatBot, { Loading } from 'react-simple-chatbot';
// import { ThemeProvider } from 'styled-components';
// import React, { useState, useEffect } from 'react';

// // GptResponse 클래스 정의
// class GptResponse extends React.Component {
//     constructor(props) {
//       super(props);
//       console.log("뭘까?", props);

//       this.state = {
//         loading: true,
//         trigger: false,
//         gptAnswer: '',
//       };

//       this.triggetNext = this.triggetNext.bind(this);

//     }

//   componentDidMount() {
//     const { steps } = this.props;
//     const search = steps.search.value;
//     const accessToken = localStorage.getItem('accessToken');
//     const videoSeq = steps.videoSeq.value;
//     console.log("시퀀스", videoSeq);

//     axios
//       .post(
//         `api/users/${videoSeq}/chatbot`,
//         {
//           messages: search,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         // 클래스의 state에 gptAnswer 업데이트
//         this.setState({ gptAnswer: response.data });
//       })
//       .catch((error) => {
//         console.error('메시지 전송 중 에러:', error);
//       })
//       .finally(() => {
//         this.setState({ loading: false });
//         this.triggetNext();
//       });
//   }

//   triggetNext() {
//     this.setState({ trigger: true }, () => {
//       this.props.triggerNextStep();
//     });
//   }

//   render() {
//     const { trigger, loading, gptAnswer } = this.state; // gptAnswer를 state에서 가져옴

//     return (
//       <div className="dbpedia">
//         {loading ? <Loading /> : gptAnswer}
//         {!loading && (
//           <div
//             style={{
//               textAlign: 'center',
//               marginTop: 20,
//             }}
//           >
//             {!trigger && (
//               <button onClick={() => this.triggetNext()}>다시 검색</button>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// // Chatbot 함수형 컴포넌트 정의
// const Chatbot = ({ video }) => {
//     // console.log("받아온 videoSeq", videoSeq);
//   // 채팅 스텝 정의
//   const chatSteps = [
//     {
//       id: 'start',
//       message: '현재 시청하시는 강의의 id를 입력해주세요',
//       trigger: 'videoSeq',
//     },
//     {
//       id: 'videoSeq',
//       user: true,
//       trigger: 'check',
//     },
//     {
//       id: 'check',
//       message: '현재 강의의 id가 {previousValue}인가요?',
//       trigger: 'option',
//     },
//     {
//       id: 'option',
//       options: [
//         { value: 1, label: '예', trigger: 'greet' },
//         { value: 2, label: '아니오', trigger: 'start' },
//       ],
//     },
//     {
//       id: 'greet',
//       message: '안녕하세요! 무엇을 도와드릴까요?',
//       trigger: 'search',
//     },
//     {
//       id: 'search',
//       user: true,
//       trigger: 'backendResponse',
//     },
//     {
//       id: 'backendResponse',
//       component: <GptResponse/>,
//       waitAction: true,
//       trigger: 'search',
//     },
//   ];

//   // 테마 정의
//   const theme = {
//     background: '#f5f8fb',
//     fontFamily: 'Helvetica Neue',
//     headerBgColor: '#EF6C00',
//     headerFontColor: '#fff',
//     headerFontSize: '15px',
//     botBubbleColor: '#F29F05',
//     botFontColor: '#FFF',
//     userBubbleColor: '#fff',
//     userFontColor: '#4a4a4a',
//   };

//   // ChatBot 컴포넌트 렌더링
//   return (
//     <ThemeProvider theme={theme}>
//       <ChatBot
//         steps={chatSteps}
//         hideHeader={false}
//         placeholder={'질문을 입력하세요.'}
//         floating={true}
//       />
//     </ThemeProvider>
//   );
// };

// // Chatbot 컴포넌트 내보내기
// export default Chatbot;
