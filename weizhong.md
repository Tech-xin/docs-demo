### 2.24微众银行+海辰储能前端面经

##### 1.vue的生命周期

##### 2.vue2和vue3的区别

##### 3.local storage和session storage的区别

在存储周期上：local storage是永久保存的，即使浏览器的标签页或者窗口被关闭或者设备重启后，数据会依然保存在浏览器中，除非用户手动操作清除浏览器数据，否则数据会一直保存在浏览器中；

session Storage是只在会话期间保存，标签页关闭回数据自动清空

在作用于域：local storage是的作用域是同源标签页共享同一份local storage数据，也就是在相同协议，域名 下的标签页；但是session storage是不同元标签页各有各的session storage空间；

在使用场景上：localstorage适用于长期保存的数据，例如用户偏好设置，自动填充/缓存；sessionstorage适用于当前会话所需要的临时数据确保用户关闭窗口后数据被清理，分步表单，一次性会话状态；

#####4.讲讲hashmap/set/arraylist/list，如果写一个商城输入商品用哪个好？



#####5.