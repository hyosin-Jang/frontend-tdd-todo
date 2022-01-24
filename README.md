# frontend-tdd-feconf2020

## ☑ 2020 FEConf의 TDD 세션 - TDD로 개발하기 예제


### TDD란?

- Test Driven Development
- 테스트 주도 개발
- Kent Beck의 저서인
- Test Driven Development에서 나온 개념

### 테스트코드, 왜 안하게 되는가?

- 너무 힘들고, 나중으로 미루다가 나중은 결코 오지 않게 됨


### TDD의 궁극적 목표

- Clean code that works
- 작동하는 깔끔한 코드

> 💡 TDD를 다르게 얘기하면 Test First Programming이라고 한다.
> 

### TDD Cycle

1. 코드를 빠르게 작성하고,

2. 실패하고 통과시키고

3. 중복을 제거하면서 개선하는 사이클

![https://blog.kakaocdn.net/dn/bHaAIL/btrrpEdLE4K/aqXY6O2g71QZjZXCFkSqKk/img.png](https://blog.kakaocdn.net/dn/bHaAIL/btrrpEdLE4K/aqXY6O2g71QZjZXCFkSqKk/img.png)

### 왜 어려운가?

- 코드 자체가 testable 하지 않아서
- 해결법은 간단함 👉 testable한 코드를 작성하면 됨

### 어떻게?

관심사의 분리(`Separation of Concerns`)를 통해 testable한 코드를 작성한다.

이걸 지키지 않으면 거대한 진흙 덩어리로 발전한다.

**관심사의 분리**란?

> 💡 개별 요소가 자신이 관심 갖고 있는 요소에만 집중하도록 하는 SW 엔지니어링 원칙
> 


</br></br>

# To do app 라이브코딩 실습

먼저, [다음 링크](https://github.com/CodeSoom/frontend-tdd-feconf2020)에서 베이스 코드를 다운 받는다.

### 1. 앱 컴포넌트를 대상으로 테스트케이스 작성

- expect("검증 대상") 뒤에 toHaveTextContent라는 Test Matcher를 사용했다.
- toHaveTextContent는 인자로 전달 된 특정 텍스트가 있는지 검사한다.
- describe-it 패턴
    - it은 test의 alias고,
    - describe는 test들을 describe로 묶음으로서 스코프를 공유하고 가독성을 높이는 역할을 한다.

**App.test.tsx**

```
import React from 'react';

import { render } from '@testing-library/react';

// TODO 앱을 TDD로 구현해보자!import App from './App';

describe('App', ()=> {
    it('renders tasks', () => {// 할 일 목록 렌더링const {container} = render((// test 라이브러리의 render function으로 App을 그린다.<App />
        ));

        // 우리가 기대하는 건 컨테이너 안에 다음 텍스트 보이기
        expect(container).toHaveTextContent('아무 일도 하기 싫다.');
    })
})
```

App.jsx를 다음과 같이 하드코딩하면 테스트는 통과할 수 있지만

우리가 원하는 건 **관심사의 분리에 따라 작성**하는 것이다.

따라서, 리스트를 렌더링하는 리스트 컴포넌트를 분리하고 리스트 컴포넌트의 테스트 코드를 작성한다.

```
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>To-do</h1>
      <ul>
        <li>
          아무 일도 하기 싫다
        </li>
      </ul>
    </div>
  );
}
```

**List.jsx**

List.jsx에 tasks를 map으로 렌더링해준다.

```
import React from 'react';

export default function List({tasks}) {
  return (
    <ul>
        {tasks.map((task)=>(
            <li key={task.id}>
                {task.title}
            </li>
        ))}
    </ul>
  );
}
```

![https://blog.kakaocdn.net/dn/bATLZ2/btrrDwY1dNK/ZwimWxKTm2IitwQrgNezFk/img.png](https://blog.kakaocdn.net/dn/bATLZ2/btrrDwY1dNK/ZwimWxKTm2IitwQrgNezFk/img.png)

실행 결과

테스크가 통과가 된 걸 보니까 list는 복수의 task를 잘 렌더링하는 걸 알 수 있다.

다음은, List 컴포넌트를 렌더링하기 위해 앱 컴포넌트에 넣어줄 것이다.

그러나, 앱 컴포넌트 안에 list 컴포넌트를 넣으면 테스트 결과 failed가 뜨게 된다.

```
import React from 'react';

import List from './List';

export default function App() {
  return (
    <div>
      <h1>To-do</h1>
        <List/>
    </div>
  );
}
```

![https://blog.kakaocdn.net/dn/nF7Vg/btrrunbylsb/IkPktXEIzLZA91AxkrXS5K/img.png](https://blog.kakaocdn.net/dn/nF7Vg/btrrunbylsb/IkPktXEIzLZA91AxkrXS5K/img.png)

왜냐하면 각 테스트는 독립적인데 list 컴포넌트가 상태를 안받고 있었기 때문이다.

tasks를 임의로 복붙해서 List.test.jsx에 넣어준다.

**List.test.jsx**

```
        const tasks = [
            { id: 1, title: '아무 일도 하기 싫다' },
            { id: 2, title: '건물 매입' },
          ];

        it('renders tasks', () => {
            const {container} = renderList(tasks);

            expect(container).toHaveTextContent('아무 일도 하기 싫다');
            expect(container).toHaveTextContent('건물 매입');
        });
```

실행하면 다음과 같이 To-do 리스트의 목록이 잘 렌더링되는 것을 확인할 수 있다.

참고로, TDD를 사용하면 브라우저를 통해 제대로 렌더링되는지 확인하는 일은 거의 없다고 한다.

![https://blog.kakaocdn.net/dn/CXAbm/btrrwgb8HGE/Z8GKV3NsE0J6v5kKNHj7z0/img.png](https://blog.kakaocdn.net/dn/CXAbm/btrrwgb8HGE/Z8GKV3NsE0J6v5kKNHj7z0/img.png)

## Redux

다음은 todo 리스트 목록의 데이터 상태 관리를 하기에 앞서 리덕스에 대해 간단하게 설명해주셨다.

### 먼저, Redux 왜 사용할까?

보통 많이들 상태 관리를 하기 위해서라고 답변한다.

React의 관심사는 **state reflection, 즉 상태 반영**이다.

- 리엑트는 어떤 상태가 컴포넌트에 전달이 된다면,
- 컴포넌트에 전달된 상태를 바탕으로 ui를 그려야 한다.

그래서 리엑트의 관심사는 오로지 상태를 반영하는 것이므로 **상태 관리에는 관심이 없다**.

또한, 앱을 작게 유지하기 위해서 관심사의 분리를 잘해야 하는데

이는 곧, 상태에 대한 관심을 분산시켜야 한다는 것을 의미한다.

만약 그렇지 못하게 되면 앱이 금방 비대해지고, 테스트하기 어려운 코드가 되기 때문이다.

### 단일 체계 원칙 (SRP원칙)

singel Responsibility Principle

- container와 presentational component 패턴에서 컨테이너 컴포넌트만 리덕스의 존재를 알고 프레젠테이셔널 컴포넌트는 리덕스의 존재를 몰라야 한다.
- 따라서, 컴포넌트 입장에서는 계속 "그거 내 관심사 아니야!" 이런 말이 나와야 하고
- 계속 **이 컴포넌트의 관심사가 맞는지 되물어야 한다.**
- 👉 이게 TDD를 원활하게 진행하는데 핵심이다.
    - 그래야 의존성이 생기지 않아서 테스트를 쉽게 작성할 수 있고 TDD를 쉽게 진행할 수 있음

---

### 다시 실습으로 돌아와서..

리스트 상태를 관리할 리스트 컨테이너를 만들어보자

- ListContainer에 가짜로 모킹할 useSelector 연결해준다.

```
import React from 'react';

import { render } from '@testing-library/react';
import ListContainer from './ListContainer';
import { useSelector } from 'react-redux';

// mocking할 파일 선택
jest.mock('react-redux');

describe('ListContainer', ()=> {
// useSelector 가짜구현 - selector에서 tasks의 상태를 가져옴
    useSelector.mockImplementation((selector) => selector({
        tasks : [
            {id: 1, title: '아무 일도 하기 싫다'},
            {id: 2, title:'건물 매입'},
        ],
    }));

    it('renders tasks', () => {
        const tasks = [
            {id: 1, title: '아무 일도 하기 싫다'},
            {id: 2, title:'건물 매입'},
        ];
        const {container} = render((
            <ListContainer
            tasks={tasks}/>
        ));
        expect(container).toHaveTextContent('아무 일도 하기 싫다');
        expect(container).toHaveTextContent('건물 매입');
    })
})
```

**react-redux.js**

- jest.fn()으로 mock function을 만든다.
- no implementation이므로 실행되면 undefined를 리턴한다.

```
export const useDispatch = jest.fn();

export const useSelector = jest.fn();
```

또한, fixtures > tasks.js 에 자주 사용하는 고정 데이터를 몰아 넣는다.

```
const tasks = [
  { id: 1, title: '아무 일도 하기 싫다' },
  { id: 2, title: '건물 매입' },
];

export default tasks;
```

실제로 스토어에서 상태를 잘 가져오는지를 useEffecf를 통해 확인한다.

> 💡 이때, 테스트코드에서 인터페이스를 확정하는게 아니라, 테스트코드를 사용하는 쪽에서 인터페이스를 먼저 확정하는게 좋다.
> 

**App.jsx**

```
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ListContainer from './ListContainer';
import tasks from '../fixtures/tasks';

export default function App() {

  useEffect(()=>{
    dispatch(setTasks(tasks));
  }, []);

  return (
    <div>
      <h1>To-do</h1>
        <ListContainer />
    </div>
  );
}
```

**action.js**

- setTasks 액션을 정의한다.

```
export function setTasks(tasks){
    return {
        type: 'setTasks',
        payload: {
            tasks,
        },
    };
}

export default {};
```

**App.test.jsx**

- 가짜 dispatch를 구현한다.

```
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
        const {container} = render((
            <App />
        ));

        expect(container).toHaveTextContent('아무 일도 하기 싫다');
    })
})
```

실행시키면 App에서 useEffect로 초기 로딩한 데이터가 정상적으로 뿌려지는 걸 확인할 수 있음

![https://blog.kakaocdn.net/dn/4B7fM/btrrDOMdSe0/pRT4le1KV59PdK5uz4Pn71/img.png](https://blog.kakaocdn.net/dn/4B7fM/btrrDOMdSe0/pRT4le1KV59PdK5uz4Pn71/img.png)

![https://blog.kakaocdn.net/dn/mdu9e/btrrxYoRV4v/mp7BV1CLe8WSW1cOvekPUk/img.png](https://blog.kakaocdn.net/dn/mdu9e/btrrxYoRV4v/mp7BV1CLe8WSW1cOvekPUk/img.png)

# BDD

Behavior driven development

- 테스트를 짤 때 행위 주도로 생각을 해보자
- 상황에 따라 다르게 행동하는 경우가 있음
- RPG 게임이라고 하면, 검을 들고 있을 때는 공격할 수 있고 검이 없을 때는 공격이 안된다는 예시를 들 수 있음
- 이렇게 상황에 따라 다르게 짜야된다면 상황에 따라 분기가 나눠지게 된다.
- 👉 이런 경우에 **describe context it**을 사용함

jest에서 context를 사용하려면 jest-plugin-context를 설치해야 함

```
npm i jest-plugin-context
```

### fire event

- 리엑트 컴포넌트를 테스트하는 테스팅 라이브러리에서 이벤트를 발생시키는 테스트
- 완료 누르면 테스트가 지워지는 기능 만들어보고자 함

버튼 만들고

- list 컴포넌트에 실제로 완료 버튼 만들어서 테스트 빠르게 통과시켜봄

```
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

// with tasks// renders tasks// without tasks// renders no task message

describe('List', ()=> {
    context('with tasks', () => {

        const tasks = [
            { id: 1, title: '아무 일도 하기 싫다' },
            { id: 2, title: '건물 매입' },
          ];

        it('renders tasks', () => {// 할 일 목록 렌더링const {container} = render((// test 라이브러리의 render function으로 App을 그린다.
                <List
                tasks={tasks}/>
            ));

            // 우리가 기대하는 건 컨테이너 안에 다음 텍스트 보이기
            expect(container).toHaveTextContent('아무 일도 하기 싫다');
            expect(container).toHaveTextContent('건물 매입');
        });

        it('renders "완료" butons to delete a task', () => { // 할 일 목록 렌더링
            const { getAllByText} = render(( // test 라이브러리의 render function으로 App을 그린다.
                <List
                tasks={tasks}/>
            ));

            // 셀렉터? 사용함 이건 문서에 잘 나와있음
           const buttons = getAllByText('완료');

           fireEvent.click(buttons[0]); // 버튼 중에 첫번째 클릭한다.
        });
    });

    context('without tasks', () => {
        const tasks = [];
        it('renders no task message', () => {
            const {container} = render(( // test 라이브러리의 render function으로 App을 그린다.
                <List
                tasks={tasks}/>
            ));

            // 우리가 기대하는 건 컨테이너 안에 다음 텍스트 보이기
            expect(container).toHaveTextContent('할 일이 없어요!');
        });

    })

});
```

### render 코드 중복 제거 > renderList로 만듦

```
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

// with tasks// renders tasks// without tasks// renders no task message

describe('List', ()=> {

    const handleClick = jest.fn();

    function renderList(tasks){
        return render((// test 라이브러리의 render function으로 App을 그린다.<List
            tasks={tasks}/>
        ));
    }

    context('with tasks', () => {

        const tasks = [
            { id: 1, title: '아무 일도 하기 싫다' },
            { id: 2, title: '건물 매입' },
          ];

        it('renders tasks', () => { // 할 일 목록 렌더링
            const {container} = renderList(tasks);

            // 우리가 기대하는 건 컨테이너 안에 다음 텍스트 보이기
            expect(container).toHaveTextContent('아무 일도 하기 싫다');
            expect(container).toHaveTextContent('건물 매입');
        });

        it('renders "완료" butons to delete a task', () => { // 할 일 목록 렌더링
            const { getAllByText} =  renderList(tasks);

            // 셀렉터? 사용함 이건 문서에 잘 나와있음
           const buttons = getAllByText('완료');

           fireEvent.click(buttons[0]); // 버튼 중에 첫번째 클릭한다.
           expect(handleClick).toBeCalled(); // 리스트 안의 핸들러에서 호출이 일어나야 함
        });
    });

    context('without tasks', () => {
        const tasks = [];
        it('renders no task message', () => {
            const {container} =  renderList(tasks);

            // 우리가 기대하는 건 컨테이너 안에 다음 텍스트 보이기
            expect(container).toHaveTextContent('할 일이 없어요!');
        });

    })

});
```

리듀서랑 리듀서 테스트에서 실제로 삭제하는 부분 만듦

```
const initialState = {
    tasks: [],
};

export default function reducer(state = initialState, action) {
    if(action.type === 'setTasks'){
        const { tasks } = action.payload;
        return {
            ...state,
            tasks,
        };
    }
    if(action.type === 'deleteTask'){
        return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.payload.id)
        };
    }
    return state;
}
```

실행 결과

![https://blog.kakaocdn.net/dn/dwAN7L/btrrDybC5X5/4XCJiGwPOZpB8IhKccFvnk/img.png](https://blog.kakaocdn.net/dn/dwAN7L/btrrDybC5X5/4XCJiGwPOZpB8IhKccFvnk/img.png)

처음 화면

![https://blog.kakaocdn.net/dn/UWLAa/btrrDdllRxk/ncConjMnzTn5IMdlsIgul0/img.png](https://blog.kakaocdn.net/dn/UWLAa/btrrDdllRxk/ncConjMnzTn5IMdlsIgul0/img.png)

하나 클릭하면 리스트 없어짐

![https://blog.kakaocdn.net/dn/cAQs3O/btrrAc8jfHp/Pf2IRQp1gKJuvux2CJwy50/img.png](https://blog.kakaocdn.net/dn/cAQs3O/btrrAc8jfHp/Pf2IRQp1gKJuvux2CJwy50/img.png)

다 클릭하면

![https://blog.kakaocdn.net/dn/bXcJ4S/btrrxYCrvgB/wWZ6EKoFLdK29krkHn4g00/img.png](https://blog.kakaocdn.net/dn/bXcJ4S/btrrxYCrvgB/wWZ6EKoFLdK29krkHn4g00/img.png)

### 참고 자료

- [데모 코드](https://github.com/CodeSoom/frontend-tdd-feconf2020)
- [[A5] 프론트엔드에서 TDD가 가능하다는 것을 보여드립니다. - YouTube](https://www.youtube.com/watch?v=L1dtkLeIz-M)
