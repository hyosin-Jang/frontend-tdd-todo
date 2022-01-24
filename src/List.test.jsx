import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

// with tasks
// renders tasks

// without tasks
// renders no task message

describe('List', ()=> {

    const handleClick = jest.fn();

    function renderList(tasks){
        return render(( 
            <List 
            tasks={tasks}
            onClick={handleClick}/>
        ));
    }


    context('with tasks', () => {

        const tasks = [
            { id: 1, title: '아무 일도 하기 싫다' },
            { id: 2, title: '건물 매입' },
          ];


        it('renders tasks', () => {
            const {container} = renderList(tasks);
    
            expect(container).toHaveTextContent('아무 일도 하기 싫다');
            expect(container).toHaveTextContent('건물 매입');
        });

        it('renders "완료" butons to delete a task', () => { 
            const { getAllByText} =  renderList(tasks);

           const buttons = getAllByText('완료');

           fireEvent.click(buttons[0]); // 첫 번째 버튼 클릭
           expect(handleClick).toBeCalledWith(1); // 리스트 안의 핸들러에서 호출이 일어나야 함
        });
    });


    context('without tasks', () => {
        const tasks = [];
        it('renders no task message', () => {
            const {container} =  renderList(tasks);

            expect(container).toHaveTextContent('할 일이 없어요!');
        });

    })

});
