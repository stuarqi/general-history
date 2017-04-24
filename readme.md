# GeneralHistory

通用历史记录类，提供历史记录的新增、后退和前进等功能

## Constructor

**new GeneralHistory(opts)**

构造方法

### Parameters

Name | Type | Description
----|----|----
opts | object | 设置参数
opts.stackLimit | number | 存储堆栈限制，可选，默认为 50

## Members

### canBack

是否可以后退

### canForward

是否可以前进

### count

记录总数

### current

当前记录数据

### currentIndex

当前记录索引

## Methods

### back(step)

回退历史记录

#### Parameters

Name | Type | Attributes | Default | Description
---- | ---- | ---- | ---- | ----
step | number | optional | 1 | 回退步数

#### Returns

**Type** object

回退后的历史数据， 如果返回 null, 说明回退无效

### clear()

清空记录

#### Returns

**Type** GeneralHistory

当前对象

### forward(step)

前进历史记录，进行了回退操作后，用于恢复回退操作

#### Parameters

Name | Type | Attributes | Default | Description
---- | ---- | ---- | ---- | ----
step | number | optional | 1 | 前进步数

#### Returns

**Type** object

前进后的历史数据，如果返回 null， 说明前进无效

### list(preprocessor)

获取历史记录列表

#### Parameters

Name | Type | Attributes | Default | Description
---- | ---- | ---- | ---- | ----
preprocessor | function | optional | - | 返回列表时每条记录的预处理方法

#### Returns

**Type** Array

历史记录列表

### locate(index)

定位历史记录并返回相应数据

#### Parameters

Name | Type | Description
---- | ---- | ----
index | number | 历史记录位置索引

#### Returns

**Type** object

指定位置的历史记录数据，如果返回 null， 说明定位无效

### push(data)

增加历史记录

#### Parameters

Name | Type | Description
---- | ---- | ----
data | object | 历史记录的数据

#### Returns

**Type** GeneralHistory

当前实例对象


## Usage

```
var his = new GeneralHistory({
  stackLimit: 10  // 最多记录 10 条历史记录
});

// 增加历史记录
his.push('One');
his.push('Two');
his.push('Three');
his.push('Four');

// 回退历史记录
console.log(his.back(2));  // 'Two'

// 前进历史记录
console.log(his.forward());  // 'Three'

// 获取历史记录总数
console.log(his.count); // 4

// 获取历史记录列表
console.log(this.list()); // ['One', 'Two', 'Three', 'Four']

// 清空历史记录
this.clear();
```