import React, {useReducer} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';

function App() {
    const questions = [
        {
            id: 1,
            question: '인포스틸러 악성코드에 대해 알맞지 않은 내용을 고르세요',
            answer_a:
                '인포스틸러는 Information stealear의 줄임말로 말 그대로 정보 유출형 악성코드를 말합니다.',
            answer_b: 
                '인포스틸러는 견적 서류, 내부 메일 또는 파일 사칭과 같은 스팸메일이나 불법 다운로드 창 등을 통해 유포됩니다.',
            answer_c:
                '정품 소프트웨어 사용, 불분명한 이메일 주의, 최신 버전 백신 사용, 자동 로그인 자제 등을 통해 감염을 예방합니다.',
            answer_d: 
                '재택근무 시 사용하는 개인 PC는 감염되어도 회사에 피해가 없으므로 예방수칙 준수를 소홀히 합니다.',
            correct_answer: 'd',
        },
        {
            id: 2,
            question: '다음 중 사무환경 점검 항목에 대해 올바르게 설명하지 않은 것은 무엇일까요?', 
            answer_a: 
		'중요문서 노출 : 중요문서(고객사 정보, 대외비, 비밀번호 등 포함된 문서)는 시건장치가 있는 안전한 곳에 보관해야 합니다.',
            answer_b: 
		'PC 잠금 : 부재 시 PC 화면잠금(화면보호기)을 설정하고 PC 비밀번호 설정합니다.',
            answer_c: 
		'공용장소 내 문서방치 : 회의실 안은 안전한 장소이므로 중요문서를 두고와도 됩니다.',
            answer_d: 
		'정보자산 방치 : 회사에서 지급한 정보자산은 관리 담당자를 지정하고 안전한 곳(시건장치가 있는 곳)에 보관해야 합니다.',
            correct_answer: 'c',
        },
        {
            id: 3,
            question: '다음 중 애플리케이션을 안전하게 이용하지 않는 사용자는 누구일까요?',
            answer_a: 
		'메리: 애플리케이션에서 신규 보안패치가 이루어졌다고? 최신 버전으로 업데이트 해야겠다!',
            answer_b: 
		'가영 : 안전하게 애플리케이션을 이용하려면 이중 인증 설정해야겠다!',
            answer_c:
		'존: 이중 인증은 귀찮아! 이중 인증 설정안하고 애플리케이션 이용할래!',
            answer_d: 
		'원빈 : 다크웹에서 애플리케이션 內 개인정보를 판다고? 불법이니 이용하지 말아야겠다!',
            correct_answer: 'c',
        },
    ];

    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: '',
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const {currentQuestion, currentAnswer, answers, showResults, error} = state;

    const question = questions[currentQuestion];

    const renderError = () => {
        if (!error) {
            return;
        }

        return <div className="error">{error}</div>;
    };

    const renderResultMark = (question, answer) => {
        if (question.correct_answer === answer.answer) {
            return <span className="correct">Correct</span>;
        }

        return <span className="failed">Failed</span>;
    };

    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );

            return (
                <div key={question.id}>
                    {question.question} - {renderResultMark(question, answer)}
                </div>
            );
        });
    };

    const restart = () => {
        dispatch({type: RESET_QUIZ});
    };

    // eslint-disable-next-line
    const next = () => {
        const answer = {questionId: question.id, answer: currentAnswer};

        if (!currentAnswer) {
            dispatch({type: SET_ERROR, error: 'Please select an option'});
            return;
        }

        answers.push(answer);
        dispatch({type: SET_ANSWERS, answers});
        dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

        if (currentQuestion + 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion + 1,
            });
            return;
        }

        dispatch({type: SET_SHOW_RESULTS, showResults: true});
    };

    if (showResults) {
        return (
            <div className="container results">
                <h2>Results</h2>
                <ul>{renderResultsData()}</ul>
                <button className="btn btn-primary" onClick={restart}>
                    Restart
                </button>
            </div>
        );
    } else {
        return (
            <QuizContext.Provider value={{state, dispatch}}>
                <div className="container">
                    <Progress
                        total={questions.length}
                        current={currentQuestion + 1}
                    />
                    <Question />
                    {renderError()}
                    <Answers />

		    {/* Original code:
                    <button className="btn btn-primary" onClick={next}>
		    */}

		    {/* Test code: */}
                    <button className="btn btn-primary" onClick={() => { alert('>>>>> 버그 발생 <<<<<'); }}>
                        Confirm and Continue
                    </button>
                </div>
            </QuizContext.Provider>
        );
    }
}

export default App;
