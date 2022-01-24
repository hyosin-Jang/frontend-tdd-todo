import reducer from './reducer';
import {
    setTasks,
    deleteTask
  } from './actions';

import tasks from '../fixtures/tasks';

describe('reducer', () => {
    describe('setTasks', () => {
        it('changes tasks array', () => { // store에 있는 task array 상태 변경
            const state = reducer({
               tasks: [], 
            }, setTasks(tasks));

            // 배열의 길이가 0이 아니게 설정
            expect(state.tasks).not.toHaveLength(0);
        });
    });

    describe('deleteTasks', () => {
        it('removes the task from tasks', () => {
            const state = reducer({
               tasks: [
                   { id: 1, title: '아무 일도 하기 싫다'},
               ], 
            }, deleteTask(1));

            // 길이를 0으로 줌
            expect(state.tasks).toHaveLength(0);
        });
    });
});

