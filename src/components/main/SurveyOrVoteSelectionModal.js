import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { ReactComponent as CloseIcon } from '../../resources/svg/close.svg';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertModalBlock = styled.div`
  position:relative;
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.125);
  h2 {
      margin-top: 0;
      margin-bottom: 1rem;
  }
  p {
      margin-bottom: 3rem;
  }
  .buttons {
      display: flex;
      justify-content: space-evenly;
  }
  .closeBtn {
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  vertical-align: middle;
  & + & {
      margin-left: 0.75rem;
  }
`;

const SurveyOrVoteSelectionModal = ({
    visible,
    title,
    message,
    onClickSurvey,
    onClickVote,
    onCancel,
}) => {
    if(!visible) return null;
    return (
        <Fullscreen>
            <AlertModalBlock>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="buttons">
                    <StyledButton fullWidth cyan onClick={onClickSurvey}>
                        조사
                    </StyledButton>
                    <StyledButton fullWidth cyan onClick={onClickVote}>
                        투표
                    </StyledButton>
                </div>
                <div className="closeBtn">
                    <CloseIcon onClick={onCancel}/>
                </div>
            </AlertModalBlock>
        </Fullscreen>
    )
}

export default SurveyOrVoteSelectionModal;