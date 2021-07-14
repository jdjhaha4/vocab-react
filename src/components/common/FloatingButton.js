import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { ReactComponent as PlusIcon } from '../../resources/svg/plus.svg';

const FloatingButtonBlock = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  cursor: pointer;
  background: ${palette.gray[4]};
  &:hover {
    background: ${palette.gray[6]};
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FloatingButton = ({onClickPlusIcon}) => {
  return (
    <FloatingButtonBlock onClick={onClickPlusIcon}>
      <StyledPlusIcon />
    </FloatingButtonBlock>
  );
};

export default FloatingButton;
