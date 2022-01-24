import React from 'react';

import { render } from '@testing-library/react';
import tasks from '../fixtures/tasks';
import { useSelector } from 'react-redux';
import { useDispatch } from '../__mocks__/react-redux';

import App from './App';


jest.mock('react-redux');

describe('App', ()=> {
    const dispatch = jest.fn();

    // 가짜 dispatch 구현
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
        tasks
    }));
    it('renders tasks', () => { 
        const {container} = render(( // test 라이브러리의 render function으로 App을 그림
            <App />
        ));

        // 우리가 기대하는 건 컨테이너 안에 다음 텍스트 보이기
        expect(container).toHaveTextContent('아무 일도 하기 싫다');
    })
})
