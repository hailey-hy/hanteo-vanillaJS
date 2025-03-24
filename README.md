## Component Architecture

이 프로젝트는 Vanilla JavaScript 기반 컴포넌트 시스템을 구현하여,
상태 기반 UI 렌더링을 실행하고 있습니다.

### 1. Component 클래스

모든 컴포넌트는 Component를 상속받아 작성되며, 다음과 같은 생명주기 메서드를 가집니다.

| 메서드                               | 설명                                              |
| ------------------------------------ | ------------------------------------------------- |
| `constructor($root, props)`          | 최상위 요소와 props 초기화                        |
| `setup()`                            | 컴포넌트의 초기 상태 정의                         |
| `template()`                         | 현재 상태와 props를 기반으로 HTML 문자열 반환     |
| `setEvent()`                         | 이벤트 바인딩 정의                                |
| `addEvent(type, selector, callback)` | 이벤트 위임 등록 도우미                           |
| `setState(newState)`                 | 상태 갱신 및 리렌더링 트리거                      |
| `render()`                           | template 결과를 DOM에 렌더링하고 `mounted()` 호출 |
| `mounted()`                          | DOM이 실제 삽입된 이후 실행되는 훅                |

### 2. 컴포넌트 렌더링 플로우

1. 컴포넌트 생성

   ```jsx
   constructor($root, props){
   		this.$root = $root;
   	  this.props = props;

   		this.setup();      // 1️⃣ 초기 상태 정의
   	  this.render();     // 2️⃣ DOM 렌더링
   	  this.setEvent();   // 3️⃣ 이벤트 바인딩
   }
   ```

2. 초기 렌더링

   ```jsx
   render() {
     this.$root.innerHTML = this.template(); // 1️⃣ HTML 문자열 렌더링
     this.mounted();                         // 2️⃣ DOM 삽입 이후 자식 컴포넌트 마운트)
   }
   ```

3. 상태 변경과 리렌더링

```jsx
setState(newState) {
  this.state = { ...this.state, ...newState }; // 1️⃣ 상태 갱신
  this.render();                               // 2️⃣ 리렌더링 트리거
}
```

### 3. 컴포넌트 구조

```jsx
index.html
└── <div id="app"></div>

main.js
└── new App(document.querySelector("#app"))

App.js
├── header
│   └── Category 컴포넌트 (탭형 UI, 상태 변경 후 상위에 콜백 전달)
├── section
│   └── Banner 컴포넌트 (무한루프, dot nav, 자동 전환)
├── main
│   └── List 컴포넌트 (리스트 렌더링)
│       └── ListItem 컴포넌트 (스켈레톤 or 데이터 UI)
└── footer
```

## 구현 기능

### 1. 카테고리에 따른 리스트 fetch 및 렌더링

- 최상위 컴포넌트 App.js 에서 currentCategory 상태 관리
  - Category.js 및 List.js에는 props로 상태 및 상태 갱신 함수 전달
- List.js에서는 props로 받은 상태에 따라 데이터 fetch
- api대신 setTimeout Promise 객체를 통해 비동기 데이터 fetch 구현

### 2. 배너 무한루프

- 배너 array 양 끝에 클론 배너 삽입하여 루프 구현
- translateX 및 transition으로 애니메이션 구현

### 3. 드래그 및 터치 슬라이드를 통한 카테고리 전환

- 카테고리 객체를 상수로 관리하여 재사용
- 리스트 영역에서 드래그, 터치 슬라이드 이벤트 발생시 카테고리 전환
