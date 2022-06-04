import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const LabelToggleBlock = styled.div`
  .toggle_wrap {
    height: 38px;
    margin-top: 10px;
    margin-right: 15px;
    line-height: 38px;
    vertical-align: middle;
  }
  .toggle {
    height: 100%;
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  .toggle input {
    display: none;
  }
  .toggle label {
    display: block;
    width: 140px;
    height: 100%;
    font-size: 1rem;
    user-select: none;
  }
  .toggle label.hide_mean {
    width: 105px;
  }
  .toggle label::before,
  .toggle label::after {
    top: 14px;
    right: 0;
    content: '';
    display: block;
    position: absolute;
    cursor: pointer;
  }
  .toggle label::before {
    width: 48px;
    height: 21px;
    background-color: ${palette.gray[4]};
    border-radius: 1rem;
    transition: background-color 0.5s ease;
  }
  .toggle label::after {
    right: 21px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.45);
    transition: right 0.3s ease;
  }
  .toggle input:checked + label::before {
    background-color: skyblue;
  }
  .toggle input:checked + label::after {
    right: 0px;
  }
`;

const LabelToggle = ({ labelStr, checkedValue, onChange }) => {
  return (
    <LabelToggleBlock>
      <div className="toggle_wrap">
        <div className="toggle">
          <input
            type="checkbox"
            id="hideVocab"
            checked={checkedValue == undefined ? false : checkedValue}
            onClick={(e) => onChange(e)}
            readOnly
          ></input>
          <label htmlFor="hideVocab">{labelStr}</label>
        </div>
      </div>
    </LabelToggleBlock>
  );
};

export default LabelToggle;
