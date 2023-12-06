import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from 'react-simple-chatbot';

const GptResponse = (props) => {

    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(false);
    const [gptAnswer, setGptAnswer] = useState('');
    console.log(props.id);
    useEffect(() => {
        const search = props.steps.search.value;
        const accessToken = localStorage.getItem('accessToken');
        axios
            .post(
                `api/users/${props.id}/chatbot`,
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
    }, [props.steps.search.value]);

    const triggetNext = () => {
        setTrigger(true);
        props.triggerNextStep();
    };

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
