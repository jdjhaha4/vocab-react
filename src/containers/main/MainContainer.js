import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../components/main/Main';
import { getMainData } from '../../modules/main';

const MainContainer = () => {
  const dispatch = useDispatch();
  const { othersGroupList } = useSelector(({ main }) => ({
    othersGroupList: main.othersGroupList,
  }));
  useEffect(() => {
    dispatch(getMainData());
  }, []);
  return <Main othersGroupList={othersGroupList} />;
};

export default MainContainer;
