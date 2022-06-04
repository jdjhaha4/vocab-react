import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { withRouter } from 'react-router-dom';

const ShareOthersBlock = styled.div`
  background-color: ${palette.gray[0]};
  .group_container {
    margin-top: 8px;
    padding: 16px;
    display: flex;
    gap: 16px;
    overflow-x: auto;
  }
  .group_item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 8px;
    width: 23%;
    min-width: 23%;
    min-height: 100px;
    height: auto;
    background-color: white;
    border: 1px solid #d1d3e2;
    border-radius: 0.75rem;
    transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    .item_header {
      font-weight: 600;
    }
    .item_weak {
      color: ${palette.gray[6]};
      font-size: 0.9rem;
      font-weight: 600;
    }
    .item_footer {
      font-weight: 600;
      font-size: 0.8rem;
    }
  }
  .group_item:hover {
    cursor: pointer;
    border-color: #bac8f3;
    box-shadow: 0 0 0 0.2rem rgb(78 115 223 / 25%);
  }
  @media (max-width: 1024px) {
    .group_item {
      width: 31%;
      min-width: 31%;
    }
  }
  @media (max-width: 768px) {
    .group_item {
      width: 45%;
      min-width: 45%;
    }
  }
`;

const ShareOthers = ({history, othersShareGroupList }) => {
  const onClickOthersGroup = useCallback(({ group_code }) => {
    const vocabGroupItem = othersShareGroupList.find(
      (item) => item.group_code === group_code,
    );
    history.push(`/share/others/type/${group_code}`);
  }, [othersShareGroupList]);

  return (
    <ShareOthersBlock>
      <h2>다른사람의 공유</h2>
      <div className="group_container">
        {othersShareGroupList == null
          ? null
          : othersShareGroupList.map((othersShareItem) => {
              return (
                <div
                  key={othersShareItem.group_code}
                  className="group_item"
                  onClick={() =>
                    onClickOthersGroup({
                      group_code: othersShareItem.group_code
                    })
                  }
                >
                  <div className="item_header">
                    <span>{othersShareItem.group_name}</span>
                    <div>
                      <span className="item_weak">
                        {othersShareItem.vocab_count} 단어
                      </span>
                    </div>
                  </div>
                  <div className="item_footer">
                    <span>{othersShareItem.nickname}</span>
                  </div>
                </div>
              );
            })}
      </div>
    </ShareOthersBlock>
  );
};

export default withRouter(ShareOthers);
