import React from 'react';

import { render, fireEvent } from '@testing-library/react';

// TODO 앱을 TDD로 구현해보자!

import ListContainer from './ListContainer';
import { useSelector, useDispatch } from 'react-redux';
import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('ListContainer', ()=> {
    
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
        tasks
    }));

    it('renders tasks', () => { 
        const {container, getAllByText} = render(( 
            <ListContainer />
        ));

        expect(container).toHaveTextContent('아무 일도 하기 싫다');
        expect(container).toHaveTextContent('건물 매입');

        const buttons = getAllByText('완료');

        fireEvent.click(buttons[0]); 


        expect(dispatch).toBeCalledWith({
            type: 'deleteTask',
            payload: { id: 1 },
        }); 
    })
})
