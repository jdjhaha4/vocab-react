import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import produce from 'immer';
import LoadingSpinner from '../common/LoadingSpinner';
import QuestionResultModal from '../common/QuestionResultModal';
import SubjectiveAnswerConfirmModal from '../common/SubjectiveAnswerConfirmModal';
import { withRouter } from 'react-router-dom';
import { cloneObject } from '../../util/arrayUtil';
import { useSpeechSynthesis } from 'react-speech-kit';

const CorrectBlock = styled.div`
  color: green;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
const WrongBlock = styled.div`
  color: red;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
const VocabStudyDictationBlock = styled.div`
  .previous {
    display: inline-block;
    padding: 5px;
    background: ${palette.gray[8]};
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    vertical-align: middle;
    &:hover {
      background: ${palette.gray[6]};
      cursor: pointer;
      border-radius: 10px;
    }
  }

  .group_name {
    font-size: 1.2rem;
    color: #003399;
    font-weight: 600;
  }
  .vocab_count {
    font-size: 1rem;
    color: ${palette.gray[8]};
    font-weight: 600;
  }
  .type_select {
    margin-top: 10px;
    background: ${palette.gray[3]};
    font-size: 1.2rem;
    font-weight: 600;
    vertical-align: middle;
    height: 60px;
    line-height: 60px;
  }
  .study_time {
    text-align: center;
  }
  .score {
    text-align: right;
  }
  .vocab_box {
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(50, 50, 50, 0.3);
  }
  .vocab_title {
    color: ${palette.gray[6]};
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }
  .multiple_title {
    color: ${palette.gray[6]};
    font-size: 0.9rem;
    font-weight: 600;
  }
  .vocab {
    color: #003399;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 0px;
    text-align: center;
  }
  .multiple_box {
    margin-top: 50px;
  }
  .multiple_mean {
    margin: 10px 0;
    padding: 10px;
    border: 2px solid ${palette.gray[3]};
    border-radius: 5px;
    &:hover {
      border: 2px solid skyblue;
      background-color: ${palette.gray[2]};
      cursor: pointer;
    }
  }
  .multiple_mean.correct {
    border: 2px solid green;
    background-color: rgba(183, 240, 177, 0.3);
  }
  .multiple_mean.wrong {
    border: 2px solid red;
    background-color: rgba(255, 167, 167, 0.3);
  }
  .round_char {
    margin-right: 8px;
    font-size: 0.8em;
    width: 1.7em;
    border-radius: 1.5em;
    padding: 0.1em 0.1em;
    line-height: 1.25em;
    border: 1px solid ${palette.gray[6]};
    display: inline-block;
    text-align: center;
    font-weight: 500;
  }
  .flex_con {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .flex_con .flex_item {
    flex-basis: 100%;
  }
  .flex_con2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
  }
  .flex_con2 span {
    flex-grow: 1;
  }

  @media (max-width: 500px) {
    .flex_con2 span:nth-child(1) {
      display: none;
    }
  }
`;

const StyledInput = styled.input`
  margin: 10px 0;
  margin-left: 5px;
  display: inline-block;
  width: 100%;
  ${(props) =>
    props.groupNm &&
    css`
      float: left;
      width: 100%;
    `};
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(78 115 223 / 25%);
  }
  & + & {
    margin-left: 10px;
  }
`;
const StyledButton = styled(Button)`
  float: right;
  height: 38px;
  margin-top: 10px;
  margin-right: 10px;
`;
const StyledButton2 = styled(Button)`
  height: 38px;
  margin-top: 10px;
  margin-right: 10px;
`;
const VocabStudyDictation = ({
  history,
  vocabGroupData,
  onClickBack,
  question,
  compareAnswer,
  postQuestionResultLoadingFlag,
  goToTheNextQuestionLoadingFlag,
  moveToThePage,
  studyTime,
  moveToTheResult,
}) => {
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

  const audioEl = useRef(null);
  const audioSourceEl = useRef(null);

  const answerInputEl = useRef(null);
  // title="영단어 보고 뜻 쓰기"
  //       visible={false}
  //       vocab="strongly"
  //       mean="강하게, 튼튼하게"
  //       answer="강하게"
  const [modal, setModal] = useState({
    title: '영단어 보고 뜻 쓰기',
    visible: false,
    id: -1,
    vocab: '',
    mean: '',
    answer: '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name == 'answer') {
      const nextState = produce(modal, (draft) => {
        draft['answer'] = value;
      });
      setModal(nextState);
    }
  };
  const speak2 = useCallback((text, opt_prop) => {
    if (
      typeof SpeechSynthesisUtterance === 'undefined' ||
      typeof window.speechSynthesis === 'undefined'
    ) {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || 'ko-KR';
    speechMsg.text = text;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
  });
  //question.vocab['vocab']
  useEffect(() => {
    speak2(question.vocab['vocab'], {
      rate: 1,
      pitch: 1,
      lang: 'en-US',
    });
    // speak({
    //   text: question.vocab['vocab'],
    //   rate: 1,
    //   pitch: 1,
    //   lang: 'en-US',
    //   default: true,
    // });
    const nextState = produce(modal, (draft) => {
      draft['id'] = question.vocab['id'];
      draft['vocab'] = question.vocab['vocab'];
      draft['mean'] = question.vocab['mean'];
      draft['answer'] = '';
    });
    setModal(nextState);
    answerInputEl.current.focus();
  }, [question.vocab['vocab']]);

  const onClickConfirm = useCallback(() => {
    if (modal['answer'] != null && modal['answer'].trim() != '') {
      if (modal['answer'].trim() == modal['vocab'].trim()) {
        onClickAnswerProcess();
      } else {
        onClickWrongAnswerProcess();
      }
    } else {
      alert('뜻을 입력후에 확인 버튼을 클릭하세요.');
    }
  }, [modal['answer']]);

  const onClickAnswerProcess = useCallback(() => {
    const nextState = produce(modal, (draft) => {
      draft['visible'] = false;
    });
    setModal(nextState);
    let answerItem = {};
    answerItem['id'] = question.vocab['id'];
    answerItem['vocab'] = modal['answer'];
    answerItem['mean'] = question.vocab['mean'];
    answerItem['result_flag'] = 'T';

    compareAnswer(answerItem);
  }, [question, modal]);

  const onClickWrongAnswerProcess = useCallback(() => {
    const nextState = produce(modal, (draft) => {
      draft['visible'] = false;
    });
    setModal(nextState);
    let answerItem = {};
    answerItem['id'] = -1;
    answerItem['vocab'] = modal['answer'];
    answerItem['mean'] = question.vocab['mean'];
    answerItem['result_flag'] = 'F';

    compareAnswer(answerItem);
  }, [question, modal]);

  const onClickDontKnowProcess = useCallback(() => {
    let answerItem = {};
    answerItem['id'] = -1;
    answerItem['vocab'] = '';
    answerItem['mean'] = question.vocab['mean'];
    answerItem['result_flag'] = 'N';

    compareAnswer(answerItem);
  }, [question, modal]);

  let keysPressed = {};
  const onKeyDown = (e) => {
    keysPressed[e.code] = true;
  };
  const onKeyUp = (e) => {
    if (keysPressed['ControlLeft'] && keysPressed['Enter']) {
      onClickDontKnowProcess();
    } else if (keysPressed['Enter']) {
      onClickConfirm();
    }
    keysPressed[e.code] = undefined;
  };
  let phonetic = '';
  let audioMp3 = '';
  if (question.vocab['dicArr'] != null && question.vocab['dicArr'].length > 0) {
    for (var i = 0, len = question.vocab['dicArr'].length; i < len; i++) {
      if (
        question.vocab['dicArr'][i]['phonetics'] != null &&
        question.vocab['dicArr'][i]['phonetics'].length > 0
      ) {
        for (
          var j = 0, jlen = question.vocab['dicArr'][i]['phonetics'].length;
          j < jlen;
          j++
        ) {
          phonetic = question.vocab['dicArr'][i]['phonetics'][j].text;
          audioMp3 = question.vocab['dicArr'][i]['phonetics'][j].audio;
          if (
            phonetic != null &&
            phonetic != '' &&
            audioMp3 != null &&
            audioMp3 != ''
          ) {
            break;
          }
        }
      }
    }
  }

  return (
    <VocabStudyDictationBlock>
      <div className="">
        <div className="flex_con">
          <div className="flex_item">
            <span
              className="previous"
              onClick={() => onClickBack()}
            >{`< 이전`}</span>
            <span className="group_name">{vocabGroupData.group_name}</span>
            <span className="vocab_count">
              ({vocabGroupData.vocab_count} 단어)
            </span>
          </div>
          <div className="type_select study_time flex_item flex_con2">
            <span>단어 받아쓰기</span>
            <span>
              학습 시간: {studyTime.hour}시간 {studyTime.minute}분{' '}
              {studyTime.second}초
            </span>
            <span>
              {question.index + 1} / {vocabGroupData.vocab_count}
            </span>
          </div>
        </div>
        <div className="row vocab_box">
          <div className="col-12 vocab_title">듣기</div>
          <div className="col-12 vocab">
            <div className="audio_area">
              <StyledButton2
                onClick={(e) => {
                  //speak({ text: question.vocab['vocab'], lang: 'en-US' });
                  speak2(question.vocab['vocab'], {
                    rate: 1,
                    pitch: 1,
                    lang: 'en-US',
                  });
                }}
              >
                다시 듣기
              </StyledButton2>
            </div>
          </div>
          {question.resultFlag == 'T' || question.resultFlag == 'F' ? (
            <div className="col-12">
              <CorrectBlock>
                <div>{question.vocab['vocab']}</div>
                <div>{question.vocab['mean']}</div>
              </CorrectBlock>
            </div>
          ) : null}
          <div className="col-12">
            {question.resultFlag == 'T' ? (
              <CorrectBlock>정답 입니다. 다음 문제로 이동 합니다</CorrectBlock>
            ) : null}
          </div>
          <div className="col-12">
            {question.resultFlag == 'F' ? (
              <WrongBlock>오답 입니다. 다음 문제로 이동 합니다</WrongBlock>
            ) : null}
          </div>
          <div className="col-12 multiple_box multiple_title">
            발음을 듣고 영단어를 입력하세요.
          </div>
          <div className="col-12">
            <StyledInput
              ref={answerInputEl}
              groupNm="true"
              name="answer"
              type="text"
              placeholder="영단어를 입력하세요."
              value={modal['answer']}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              autoComplete="off"
            />
          </div>
          <div className="col-12">
            <StyledButton onClick={() => onClickConfirm()}>확인</StyledButton>
            <StyledButton
              onClick={() => {
                onClickDontKnowProcess();
              }}
            >
              모름
            </StyledButton>
          </div>
        </div>
      </div>
      <LoadingSpinner visible={postQuestionResultLoadingFlag} />
      <LoadingSpinner visible={goToTheNextQuestionLoadingFlag} />
      <QuestionResultModal
        title={`${vocabGroupData.group_name}(${vocabGroupData.vocab_count}단어) 테스트 완료!`}
        description="수고하셨습니다!"
        visible={question['complete']}
        confirmText="학습하기로 이동"
        studyTime={studyTime}
        vocabCount={vocabGroupData.vocab_count}
        answerCount={question['answerCount']}
        wrongAnswerCount={question['wrongAnswerCount']}
        onConfirm={() => {
          moveToThePage();
        }}
        onClickMoveToTheResult={() => {
          moveToTheResult();
        }}
      />
      <SubjectiveAnswerConfirmModal
        title={modal['title']}
        visible={modal['visible']}
        vocab={modal['vocab']}
        mean={modal['mean']}
        answer={modal['answer']}
        onClickAnswerProcess={onClickAnswerProcess}
        onClickWrongAnswerProcess={onClickWrongAnswerProcess}
      />
      <audio ref={audioEl}>
        <source ref={audioSourceEl} src="" type="audio/mp3"></source>
      </audio>
    </VocabStudyDictationBlock>
  );
};

export default withRouter(VocabStudyDictation);