---
title: "[번역] 반응형 프로그래밍(Reactive Programming)"
date: 2022-02-05 17:18:34
category: javascript
thumbnail: './images/base/javascript.png'
draft: false
---

[원문](https://mathiasbynens.be/notes/shapes-ics)

# 반응형 프로그래밍에 대해 알아야 할 5가지 사항

## ✒️ 반응형 프로그래밍은 비동기식 데이터 스트림을 사용하여 프로그래밍합니다.
반응형 프로그래밍을 사용할 경우 데이터 스트림이 애플리케이션의 중심이 됩니다. 이벤트(Events), 메시지(Message), 호출(Calls), 심지어 장애(Failures)도 데이터 스트림에 의해 전달 되는데, 반응형 프로그래밍을 사용하면 이러한 스트림을 관찰(Observe)하고 값이 방출(Emitted)될 때 반응(React)할 수 있습니다.

따라서 코드에서는 클릭 이벤트, HTTP 요청, 메시지 수집, 알림(Notifications)들, 변수 변경, 이벤트 캐시, 센서 측정 등 모두가 데이터 스트림을 생성합니다. 이는 애플리케이션의 흥미로운 부수 효과(Side-effect)이며, 본질적으로는 비동기적(Asynchronous)인 형태가 되어가고 있습니다.

<br>

<img alt="interpreter-optimizing-compiler-chakra" src="./images/2022-01/reactive-programming-01.png"/>

<br>

[Reactive eXtension](http://reactivex.io)(이하 RX)는 `관측 가능한(Observable) 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 구성`하기 위한 반응형 프로그래밍 원칙의 구현체입니다. RX를 사용하면 코드가 Observables라는 이름의 데이터 스트림을 생성하고 구독합니다. 반응형 프로그래밍이 개념에 관한 것이라면 RX는 놀라운 도구(Toolbox)를 제공합니다. 관찰자 및 반복자 패턴(Observer and Iterator Patterns)과 기능적 관용어를 결합함으로써 RX는 당신에게 초능력을 주는데, 데이터 스트림을 결합(combine), 병합(merge), 필터링(filter), 변환(transform) 및 생성(create) 할 수 있는 다양한 기능이 있습니다. 다음 그림은 Java의 RX 사용 예시를 보여줍니다(https://github.com/ReactiveX/RxJava 사용하기).

<br>

<img alt="interpreter-optimizing-compiler-chakra" src="./images/2022-01/reactive-programming-02.png"/>

<br>

RX가 반응형 프로그래밍 원리의 유일한 구현은 아니지만 오늘날 가장 많이 사용되는 언어입니다.

## ✒️ 관측할 수 있는 것은 차갑거나 뜨거울 수 있으며, 그것은 중요합니다.
이 시점에서 프로그램에서 처리할 다양한 스트림(또는 관찰 가능한 객체(Observables))이 무엇인지 확인하려고 합니다. 스트림에는 두 종류(`hot`과 `cold`)가 있습니다. 반응형 프로그래밍을 성공적으로 사용하기 위해서는 이 스트림의 차이를 이해해야 합니다.

차가운 스트림(Cold Stream/Observables)은 게으릅니다. 그들은 누군가가 그들을 관찰하기 시작할 때까지 아무것도 하지 않죠. 그것들은 소비되었을 때에만 동작합니다. 누군가 결과에 흥미를 가지기 전까진 실행되지 않는 비동기 동작을 나타내기 위해 사용됩니다. 예를 들자면 파일 다운로드가 있네요. 아무도 데이터를 요청하지 않으면 파일 다운로드가 실행되지 않죠. 이처럼 콜드 스트림으로 생성된 데이터는 구독자들(subscribers) 간에 공유되지 않으며, 구독 시 모든 항목(Item)을 확인할 수 있습니다.

핫 스트림(Hot Stream/Observables)은 주식 시세 표시기나 센서 또는 사용자로부터 전송된 데이터와 같이 구독(subscription) 전에 활성화됩니다. 데이터는 구독자들(subscribers) 간에 독립적입니다. 관찰자(Observer)가 핫 스트림을 구독하면 구독 후 방출되는 스트림의 모든 값을 얻습니다. 이 값은 모든 구독자들에게 공유됩니다. 예로, 아무도 온도계를 구독하지 않아아도 지정된 시간마다 현재 온도를 측정하고 알립(publishes)니다. 이처럼 스트림에 구독자를 등록하면 자동으로 다음 측정값을 수신할 수 있습니다.

여러분의 스트림이 뜨거운(hot)지 차가운(cold)지 이해하는 것이 왜 그렇게 중요할까요? 왜냐하면 이 스트림의 유형에 따라 데이터가 소비되는 방식이 변경되기 때문입니다. 만약 핫 스트림을 구독(subscribed)하지 않으면 실시간 데이터를 수신할 수 없으며, 수신되지 않은 데이터는 손실됩니다.

## ✒️ 잘못 사용된 비동기 물림
반응형 프로그래밍 정의에는 비동기라는 중요한 단어가 있습니다. 데이터가 스트림에서 비동기적으로 내보내지면(기본 프로그램 흐름과 무관하게) 알림이 표시됩니다. 프로그램을 데이터 스트림 중심으로 구성하기 위해 비동기 코드를 쓰는 것으로 스트림이 새로운 항목(Item)을 방출할 때 호출되는 코드를 작성할 수 있습니다. 이런 맥락에서 스레드(Thread), 블록킹 코드(Blocking Code), 부수 효과(Side-effect)는 매우 중요한 문제죠. 부수 효과부터 시작할게요.

부수 효과가 없는 함수는 오직 인수와 반환 값을 통해 프로그램의 나머지 부분과 상호 작용합니다. 반응형 프로그래밍을 사용할 때는 불필요한 부수 효과를 피해야 하며, 사용할 때는 명확한 의도를 가져야 합니다. 따라서, 불변성과 순수 함수를 최대한 활용해야 합니다. 일부 부수 효과들은 용이할 수 있으나 이를 남용하는 것은 재난을 초래합니다.

스레드는 두 번째로 중요한 포인트입니다. 스트림을 관찰하며 재미있는 일이 생길 때마다 알림을 받는 것도 좋지만, 누가 호출하고 어떤 스레드에서 해당 기능이 실행되는지 절대 잊어서는 안 됩니다. 그러기 위해서는 프로그램에 너무 많은 스레드를 사용하지 않는 것이 좋죠. 여러 스레드에 의존하는 비동기 프로그램들은 종종 교착 상태를 찾아야 하는 어려운 동기화 퍼즐이 됩니다.

세 번째 요점은, 절대 막지 말라는 것입니다. 자신을 호출하는 스레드가 없으므로 절대 차단해서는 안 됩니다. 다른 항목이 방출되는 것을 방지할 수 있다면 버퍼가 가득 찰 때까지 버퍼링됩니다(이 경우 역압이 발생할 수 있지만 이 게시물의 주제는 아닙니다). RX와 비동기 IO를 결합함으로써 비차단 코드(Non-Blocking Code)를 작성하는 데 필요한 모든 것을 얻을 수 있습니다.

```java
client.get("/api/people/4")
      .rxSend()
      .map(HttpResponse::bodyAsJsonObject)
      .map(json -> json.getString("name"))
      .subscribe(System.out::println, Throwable::printStackTrace);
```

> 이 마지막 구문에서 구독 방법을 확인하세요. 처리 단계 중 하나가 예외를 발생시킬 때 호출되는 두 번째 메서드가 필요합니다. 예외는 항상 잡아야(catch) 합니다. 그렇지 않으면 무엇이 잘못되고 있는지 이해하기 위해 많은 시간을 보낼거에요.

## ✒️ 단순함 유지
알다시피, `큰 힘에는 큰 책임이 따르죠`. RX는 매우 멋진 기능을 제공하지만 잘못된 방향으로 기울기 쉽습니다. 플랩맵(flapmap)을 채우고, 재시도(retry)하고, 디바운스(debounce)하고, 압축(zip)하면 마치 닌자처럼 느껴집니다. 좋은 코드는 다른 사람이 읽을 수 있어야 한다는 것을 잊지 마세요.

코드를 한 번 볼까요?
```java
manager.getCampaignById(id)
       .flatMap(campaign -> manager.getCartsForCampaign(campaign)
           .flatMap(list -> {
               Single <List<Product>> products = manager.getProducts(campaign);
               Single <List<UserCommand>> carts = manager.getCarts(campaign);
               return products.zipWith(carts,
                   (p, c) -> new CampaignModel(campaign, p, c));
           })
           .flatMap(model -> template
               .rxRender(rc, "templates/fruits/campaign.thl.html")
               .map(Buffer::toString))
       )
       .subscribe(
           content -> rc.response().end(content),
           err -> {
               log.error("Unable to render campaign view", err);
               getAllCampaigns(rc);
           }
       );
```

이런 예시를 보면 이해하기 어렵죠?

## ✒️ 반응형 프로그래밍 != 반응형 시스템
아마도 가장 혼란스러운 부분일 겁니다. 반응형 프로그래밍을 사용한다고 해서 반응형 시스템이 구축되는 것은 아니에요. 반응형 시스템은 반응형 분산 시스템을 구축하기 위한 아키텍처 스타일로, 분산형 시스템이 제대로 작동하는 것으로 볼 수 있습니다. 반응형 시스템은 다음과 같은 네 가지 특성이 있습니다.

- Responsive: 반응형 시스템은 합리적인 시간 내에 요청을 처리해야 합니다(합리적으로 정의하길 권장합니다).
- Resilient: 반응형 시스템은 장애 발생 시 응답을 유지해야 하므로(충돌, 시간 초과, 500 Error 등) 장애에 대해 설계하고 적절히 대처해야 합니다.
- Elastic: 반응형 시스템은 다양한 부하에서 응답을 유지해야 합니다. 따라서 확장 및 축소가 가능하고 최소한의 리소스로 처리할 수 있어야 합니다.
- Message driven: 반응형 시스템의 컴포넌트는 비동기 메시지 전달을 사용하여 상호 작용합니다.

이렇게 반응형 시스템의 기본 원칙은 단순하지만, 그럼에도 불구하고 그 중 하나를 구축하는 것은 까다롭습니다. 일반적으로 각 노드는 비동기화 비차단(non-blocking) 개발 모델과 작업 기반(Task-based) 동시성 모델을 수용해야 하며 non-blocking I/O를 사용해야 합니다. 이런 점들을 먼저 고려하지 않으면 금세 스파게티 코드가 될 겁니다.

리액티브 프로그래밍과 리액티브 eXtension은 비동기 짐승 길들이기 위한 개발 모델을 제공합니다. 그것을 현명하게 사용하면 당신의 코드는 쉽게 읽고 이해할 수 있는 상태를 유지할 것입니다. 그러나 반응형 프로그래밍을 사용해도 시스템이 반응형 시스템으로 변환되지는 않습니다. 반응형 시스템은 다음 레벨이에요.