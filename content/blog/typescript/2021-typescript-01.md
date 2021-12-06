---
title: 타입스크립트의 접근제어자
date: 2021-12-06 17:59:31
category: typescript
draft: false
---

```js
/**
 * 부모 클래스
 */
class AccessModifier {
  // 어디서든 접근 가능
  public publicValue: string;
  // 해당 클래스와 자식 클래스의 내부에서만 접근 가능
  protected protectedValue: string;

  // 자신만 접근 가능
  private privateValue: string;

  constructor(name: string, id: string) {
    this.publicValue = name;
    this.protectedValue = id;

    this.privateValue = '';
  }

  private setPrivateValue() {}
}

/**
 * 자식 클래스
 */
class ExtendsAccessModifier extends AccessModifier {
  private privateValues: string[];

  constructor(name: string, id: string, targets: string[]) {
    super(name, id);

    this.privateValues = targets;
  }

  accessMember() {
    this.setPrivateValue(); // 접근 불가능
    console.log(this.privateValue); // 접근 불가능
    console.log(this.protectedValue); // 클래스 내부에서만 접근 가능
  }
}

const test = new ExtendsAccessModifier('test', 'tester', [
  'testers1',
  'testers2',
  'testers3',
]);

// 인스턴스이므로 private, protected 접근 불가능
test.setPrivateValue();
test.privateValue;
test.protectedValue;

// 인스턴스이므로 public 만 접근 가능
console.log(test.accessMember());
console.log(test.publicValue);
```