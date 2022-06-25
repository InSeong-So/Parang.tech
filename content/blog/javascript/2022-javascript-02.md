---
title: "Component for Vanilla JavaScript 1편"
date: 2022-06-11 17:18:34
category: javascript
thumbnail: './images/base/javascript.png'
draft: false
---

프론트엔드 영역에서 종종 바닐라 자바스크립트(Vanilla JavaScript, 이하 바닐라)가 들려옵니다. 처음 이 단어를 접했을 때, React나 Vue 같은 프레임워크…인가? 새로운 언어인가? 했던 기억이 있네요. 하지만 다니던 SI 회사를 퇴사한 뒤 서비스 회사의 프론트엔드 개발자가 되겠다고 다짐한 후로 제일 많이 공부한 것이 바닐라였습니다.

프로덕트를 바닐라로만 구현한 IT 기업(대표적으로 Github가 있겠네요), 오픈 소스에 의존하지 않고 라이브러리를 바닐라로 직접 만들어 사용하는 팀도 여럿 있죠. 그러나 여러분 중 몇몇은 "솔직히, 왜 바닐라가 중요해? React, Vue, Svelt 같은 멋진 프레임워크/라이브러리가 있는데!"라고 생각할 수 있습니다.

이 시리즈는 바닐라 자바스크립트로 컴포넌트를 만드는 여러가지 방법에 대해 고민하고 적용했던 저의 사례들을 소개합니다. 여러분들께 도움이 될 수도, 혹은 참고가 되지 못할 글일 수도 있어요. 그러나 이러한 시도를 통해 깨닫고 성장한 부분이 있습니다.

> 순수한 자바스크립트는 무엇인가? 자바스크립트는 어떻게 구성되어 있나? 무엇을 할 수 있고, 어떤 원리로 어떤 철학을 가진 채 어떤 문제를 해결하려고 프레임워크들이 탄생했는가?

자, 우리는 간단한 `비동기 카운터 앱`을 만들겁니다. 바닐라만으로 몇 개의 컴포넌트 개발 방식을 활용하면서요. 여러분들도 바닐라의 세계에 빠졌으면 하는 바람으로, 시작해보겠습니다.

# 들어가기에 앞서: 실습 준비
> [저장소 위치](https://github.com/InSeong-So/Vanilla-Component)

## 아래 절차를 따라 해주세요!

```sh
# 1. 프로젝트 클론
git clone https://github.com/InSeong-So/Vanilla-Component.git

# 2. 클론한 프로젝트로 이동
cd Vanilla-Component

# 3. 의존성 설치
npm install

# 4. 실행
npm run dev
```

## 짜잔!
<!-- TODO: 이미지 들어가야함 -->

## 앱 구조
심플하게 [pico.css](https://picocss.com/)를 사용하여 TODO-Counter App을 만들었습니다.

```html
<body>
  <main class="container">
    <section id="todo-area">
      <section id="todo-input-section">
        <div class="grid">
          <form>
            <label for="todo-input">Todo Input</label>
            <input type="text" id="todo-input" name="todo-input" required maxlength="50"
              placeholder="please input to your todo">
          </form>
        </div>
      </section>
      <section id="todo-display">
        <article id="todo-content">
          <div class="row" key="todo-0">
            <div class="todo-title">
              <span>테스트</span>
            </div>
            <div class="todo-action">
              <span class="complete">
                <svg />
              </span>
              <span class="remove">
                <svg />
              </span>
            </div>
          </div>
        </article>
      </section>
    </section>
    <hr />
    <section>
      <section id="counter-display">
        <article>
          <h1 id="counter">0</h1>
        </article>
      </section>
      <section id="buttons">
        <div class="grid">
          <button id="sub">-1</button>
          <button id="reset" class="contrast">RESET</button>
          <button id="add" class="secondary">+1</button>
        </div>
      </section>
    </section>
  </main>
  <script type="module" src="./src/main.js"></script>
</body>
```

현재까진 아무 동작도 하지 않는 정적 html입니다. 프로젝트를 보셨겠지만 파일 구조도 심플합니다. 여기에 바닐라만을 사용하여 비동기 카운터 앱을 만들거에요.

# 들어가기에 앞서: 컴포넌트란?
우리가 늘상적으로 사용하는 단어입니다. 프론트-백엔드-데브옵스 막론하고 등장하죠. 우리는 이 컴포넌트에 대한 생각을 충분히 해 볼 가치가 있습니다.

컴포넌트(Component)는 독립된 재사용 가능한 모듈입니다. Storybook 등을 활용하면 컴포넌트를 레고처럼 조립해 화면을 구성할 수 있어요. 이를 컴포넌트 기반 프로그래밍(Component Based Development)이라 부릅니다.

프론트엔드에서는 개발을 진행할 때, 아주 자연스럽게 `UI를 분리`하여 생각합니다. "여기는 header 영역, 저기는 footer, 나머지는 main... header는 navigation 컴포넌트를 작성하면 되겠네?"라고 말이죠. 당연히 프레임워크를 사용할 때는 `컴포넌트` 단위든, `페이지 단위`든 파워풀하게 지원해주는 기능들이 많아 사용하기에 어려움이 없습니다. document도 잘 작성되어 있다면 튜토리얼-숙련까지 쉽게 갈 수 있죠.

자, 그럼 바닐라에서는 어떻게 해야 할까요?

어렵지 않습니다! 동일하게 UI를 분리하고 컴포넌트를 설계하세요. 바닐라가 어려운 것은 설계가 아니라 `구현을 직접`하는 부분입니다. 처음부터 망설이지 않아도 돼요!

# 첫 번째 이론 : 템플릿 메서드 패턴
바닐라 컴포넌트라고 하면, 흔히 본 패턴이 있을거에요.

```js
export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.setUp();
    this.render();
    this.setEvent();
  }

  setUp() {}

  setState(newState) {
    this.state = { ...newState };
    this.render();
  }

  setEvent() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {}

  template() {
    return '';
  }
}
```

그리고 이렇게 사용하죠.

```js
class Something extends Component {
  // ...
}
```

## 장점
이 컴포넌트 개발 방식의 장점은 무엇일까요? 잘 생각해봅시다. 객체의 상속은 "부모"의 기능을 그대로 물려받아 "확장이 가능"해집니다. 마치 부모의 유전자를 자식이 물려받는 것처럼 말이죠. 따라서 저희가 필요한 기능만 자식 컴포넌트에서 구현한다면 나머지 기능은 기존에 정의된 부모 컴포넌트의 기능 흐름을 그대로 이어 받아 동작하게 됩니다.

우리는 여기서 생명주기(Life Cycle)을 알 수 있습니다. 한 번 볼까요?
1. 생성자 함수(constructor)를 통해 컴포넌트가 생성됩니다.
2. 컴포넌트는 자신에게 선언된 html 태그들을 렌더링합니다.
3. 컴포넌트는 자신에게 할당된 이벤트(비즈니스 로직 등)를 바인딩합니다.
4. (옵션이에요)해당 컴포넌트의 렌더링이 완료되거나 생성된 후, 추가적인 로직(해당 컴포넌트만이 가지는 특수한 로직 등)을 실행합니다.

매번 이러한 사이클을 생각하면서 컴포넌트를 구성하기는 쉽지 않아요. 머리도 아플 뿐더러, 직접 코드를 짜게 되면 중복된 코드가 계속 눈에 밟힙니다. 위의 사이클을 코드로서 해소할 수 있는 가장 좋은 방법 중 하나는, `클래스의 상속`을 흉내내는 것이죠. 앞서 말했듯 부모 클래스에 정의된 기능은 자식이 그대로 쓸 수 있기 때문에, 주 컴포넌트에 라이프 사이클을 정의해두고 자식 컴포넌트에서 필요한 기능만 확장하여 메서드를 작성한다면(Override) 저희가 요망하는 컴포넌트를 구상할 수 있습니다.

## 단점
하지만 유감스럽게도, 자바스크립트는 `클래스형` 언어가 아닙니다. `프로토타입` 기반으로 태어난 언어이자, ES6에서 도입된 class 문법은 개발자들이 익숙하게 사용하는 것을 지원하는 `문법적 설탕`에 불과합니다. 따라서 상속이라는 단어에서 기존 개발자들이 생각하고 있던 기능은 구현되지 않을 가능성이 높아요. 혹은 에러를 내어야 하는 상황에도 아주 문제없이 진행되고 끝끝내 undefind를 출력하거나 런타임 에러가 발생해 앱이 종료되기도 하죠. 근간은 무엇일까요?

바로 언어적 특성으로 인해 `제어 장치`가 없다는 점입니다. 자신이 만든 컴포넌트를 상속하여 사용하다보면 컴포넌트 간의 라이프사이클이 충돌하거나, 특정 컴포넌트만 과하게 이벤트가 많이 바인딩되거나, 중복 렌더링이 발생하고 메모리 누수가 생겨나죠. 원인은 무엇일까요? 단순합니다. 자바스크립트가 가진 태생적 한계로 인해 추상 클래스(abstract class)처럼 사용하려던 부모 컴포넌트의 역할이 제어되지 않는 것이에요. 타입스크립트를 가용하는 경우 이런 문제는 해결되지만... 그런다고 자바스크립트 언어에 abstract 기능을 저희가 직접 추가할 순 없는 노릇이죠.

## 해결
그럼 템플릿 메서드 패턴을 사용하면 안 될까요? 그렇진 않습니다. 적절한 에러 핸들링과 유효성 검사, 도메인과 유틸을 분리한 설계, 클린 코드 기법을 적용하면 너무나 좋은 방법론 중 하나기 때문이죠. 하지만 어떤 한계가 있는지 명확하게 인지하고 컴포넌트를 개발할 때 참고해서 작업을 해야 합니다.

---
// 1편 초안을 여기서 정리