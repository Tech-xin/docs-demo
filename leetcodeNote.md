### 力扣解题笔记--JavaScript

### 88.合并两个有序数组

##### 1.从后往前合并

```javascript
//
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = n + m - 1;

    while(j >= 0){//给j一个范围，避免他循环到-1
        if(i >= 0 & nums1[i] >= nums2[j]){//给i一个范围，避免循环到-1返回undefined
            nums1[k--] = nums1[i--]
        }else{
            nums1[k--] = nums2[j--]
            }
    }
    //时间复杂度O(m+n);因为while循环是单层的，且每个元素只访问了一次
    //空间复杂度O(1);因为在nums1上直接操作的，利用了nums1本身的预留空间，不额外占用空间
};
```

##### 2.直接合并后排序

```javascript
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2)
    nums1.sort((a,b) => a - b)
};
```

array.splice(start, deletecount, items1,items2,...)在数组array的start索引位删除delete count个元素然后插入items们；

...nums2是把nums2的[1,2,3]换成1，2, 3的展开运算符。

array.sort()是对字符串进行排序的，加上（a,b）=> a-b表示对数字进行升序排序

（a,b）=> b - a表示降序排序

