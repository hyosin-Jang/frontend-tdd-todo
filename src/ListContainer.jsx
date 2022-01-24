import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from './List';

import {
    deleteTask,
} from './actions';

export default function ListContainer() {
    const dispatch = useDispatch();

    const { tasks } = useSelector((state) => ({ // 객체를 가지고 오니까 tasks destructing 하기
        tasks: state.tasks,
    }));

    function handleClick(id){
        dispatch(deleteTask(id)); // task를 id로 지우고, handleClick에서 id를 가져옴
    }

  return (
        <List tasks={tasks}
        onClick={handleClick}/>
  );
}
