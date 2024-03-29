# java9新特性

**概述**：java9对数组和集合的stream进行史诗级加强，至于那个模块化，大家自行百度吧，那种东西我不想讲

**arrays类:**

1. **compare方法**
2. **equals方法**
3. **mismatch方法**

**collection类:**

1. **<E> List<E> of(E e1)方法**
2. **<K, V> Map<K, V> of(K k1, V v1)**
3. **<E> Set<E> of(E e1, E e2, E e3)方法**

**flowapi类**:

1. **Publisher**：负责发布消息，是数据源的角色。
2. **Subscriber**：负责订阅并处理消息，是消费者的角色。
3. **Subscription**：订阅控制类，用于发布者和订阅者之间的通信。
4. **Processor**：同时充当 Publisher 和 Subscriber 的角色，可以对数据进行处理后再发布。

**defaultMethod**：接口可以设置多个default方法

**completable**：

1. `thenAcceptBoth()`: 接受两个`CompletableFuture`对象作为参数，并在它们都完成时执行一个`BiConsumer`操作。
2. `runAfterBoth()`: 接受两个`CompletableFuture`对象作为参数，并在它们都完成时执行一个`Runnable`操作。
3. `acceptEither()`: 接受两个`CompletableFuture`对象作为参数，并在其中一个完成时执行一个`Consumer`操作。
4. `runAfterEither()`: 接受两个`CompletableFuture`对象作为参数，并在其中一个完成时执行一个`Runnable`操作。
5. `thenCompose()`: 接受一个`Function`作为参数，该函数将上一个`CompletableFuture`的结果转换为一个新的`CompletableFuture`对象。
6. `allOf()`: 接受一组`CompletableFuture`对象作为参数，并返回一个新的`CompletableFuture`对象，当所有给定的`CompletableFuture`对象都完成时，该新对象将被标记为完成。
7. `anyOf()`: 接受一组`CompletableFuture`对象作为参数，并返回一个新的`CompletableFuture`对象，当其中任何一个给定的`CompletableFuture`对象完成时，该新对象将被标记为完成。
8. `exceptionally()`: 接受一个`Function`作为参数，该函数将在发生异常时被调用，并返回一个新的`CompletableFuture`对象。
9. `handle()`: 接受一个`BiFunction`作为参数，该函数将在`CompletableFuture`完成或发生异常时被调用，并返回一个新的`CompletableFuture`对象。

**stream流:**

1. **takeWhile方法**：`takeWhile`方法用于从流中获取满足指定条件的元素，直到遇到第一个不满足条件的元素为止。
2. **dropWhile方法**：`dropWhile`方法与`takeWhile`方法相反，它用于跳过流中满足指定条件的元素，直到遇到第一个不满足条件的元素为止。

## arrays

### compare方法源码：

```
public static int compare(int[] a, int[] b) {
        if (a == b)
            return 0;
        if (a == null || b == null)
            return a == null ? -1 : 1;

        int i = ArraysSupport.mismatch(a, b,
                                       Math.min(a.length, b.length));
        if (i >= 0) {
            return Integer.compare(a[i], b[i]);
        }

        return a.length - b.length;
    }
```

其本质效果就是：数组相等就返回0，不相等就返回-1

### equals方法源码：

```
public static boolean equals(int[] a, int[] a2) {
        if (a==a2)
            return true;
        if (a==null || a2==null)
            return false;

        int length = a.length;
        if (a2.length != length)
            return false;

        return ArraysSupport.mismatch(a, a2, length) < 0;
    }
```

其本质效果就是：数组相等就返回true，不相等就返回flase

### mismatch方法源码

```
  public static int mismatch(int[] a, int[] b) {
        int length = Math.min(a.length, b.length); // Check null array refs
        if (a == b)
            return -1;

        int i = ArraysSupport.mismatch(a, b, length);
        return (i < 0 && a.length != b.length) ? length : i;
    }
```

其本质效果就是：返回数组第一个不匹配的下标

## collection

### list

```
//creating empty List
		List<Employee> empList1=List.of();
		
		//creating List with one object
		List<Employee> empList2=List.of(new Employee(1,"William Smith"));
		
		//creating list with multiple objects, can accept upto 10 elements
		List<Employee> empList3=List.of(new Employee(1,"zhangsan"),
										new Employee(2,"lisi"),
										new Employee(3,"wangwu"));
```

### map

```
//creating empty Set
		Map<Integer, Employee> empMap1=Map.of();
				
		//creating Set with one object
		Map<Integer,Employee> empMap2=Map.of(1, new Employee(101,"William Smith"));
				
		//creating Set with multiple objects, can accept upto 10 elements
		Map<Integer, Employee> empMap3=Map.of(1,new Employee(101,"William Smith"),
											2,new Employee(102,"Rakesh Ahuja"),
											3,new Employee(103,"David Monte"));
				
		//creating arbitrary number of elements in Map 
		Map<Integer,Employee> empMap4=Map.ofEntries(
							entry(1, new Employee(101,"William Smith")),
							entry(2, new Employee(102, "Rakesh Ahuja")),
							entry(3, new Employee(103, "David Monte"))
							);	
```

### set

```
//creating empty Set
		Set<Employee> empSet1=Set.of();
		
		//creating Set with one object
		Set<Employee> empSet2=Set.of(new Employee(101,"William Smith"));
		
		//creating Set with multiple objects, can accept upto 10 elements
		Set<Employee> empSet3=Set.of(new Employee(101,"William Smith"),
										new Employee(102,"Rakesh Ahuja"),
										new Employee(103,"David Monte"));
```

## flowapi

```
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Flow;
import java.util.concurrent.SubmissionPublisher;

public class FlowAPIExample {
    public static void main(String[] args) throws InterruptedException {
        // 创建数据源
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 创建发布者
        SubmissionPublisher<Integer> publisher = new SubmissionPublisher<>();

        // 创建订阅者
        Flow.Subscriber<Integer> subscriber = new Flow.Subscriber<>() {
            private Flow.Subscription subscription;

            @Override
            public void onSubscribe(Flow.Subscription subscription) {
                this.subscription = subscription;
                subscription.request(1); // 请求一个数据项
            }

            @Override
            public void onNext(Integer item) {
                System.out.println("接收到数据：" + item);
                subscription.request(1); // 继续请求下一个数据项
            }

            @Override
            public void onError(Throwable throwable) {
                System.err.println("发生错误：" + throwable.getMessage());
            }

            @Override
            public void onComplete() {
                System.out.println("数据处理完成");
            }
        };

        // 订阅数据流
        publisher.subscribe(subscriber);

        // 发布数据流
        for (Integer number : numbers) {
            publisher.submit(number);
        }

        // 关闭发布者
        publisher.close();

        // 等待异步处理完成
        Thread.sleep(1000);
    }
}

```

## completablefuture

```
private static void completeOnTime() {
    // TODO Auto-generated method stub
    int value1 = 100;
    int value2 = 200;

    CompletableFuture.supplyAsync(() -> {
       try {
          TimeUnit.SECONDS.sleep(5);
       } catch (InterruptedException e) {
          e.printStackTrace();
       }
       return value1 + value2;
    }).completeOnTimeout(10, 2, TimeUnit.SECONDS).
             thenAccept(result -> System.out.println("Result from completeOnTime()==> "+result));
    //waits for 2 seconds to complete, else returns 10 as a value
    try {
       TimeUnit.SECONDS.sleep(10);//waiting for 10 seconds
    } catch (InterruptedException e) {
       // TODO Auto-generated catch block
       e.printStackTrace();
    }
}
```

## stream

### **takeWhile**方法

```
import java.util.stream.Stream;

public class TakeWhileExample {
    public static void main(String[] args) {
        Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        numbers.takeWhile(n -> n < 5)
               .forEach(System.out::println); // 输出 1, 2, 3, 4
    }
}

```

### **dropWhile方法**

```
import java.util.stream.Stream;

public class DropWhileExample {
    public static void main(String[] args) {
        Stream<Integer> numbers = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        numbers.dropWhile(n -> n < 5)
               .forEach(System.out::println); // 输出 5, 6, 7, 8, 9, 10
    }
}

```

