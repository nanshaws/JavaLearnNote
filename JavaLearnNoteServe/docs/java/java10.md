# java10新特性

- Local Variable Type Inference（局部变量类型推断）
- Collection API enhancements（集合API增强）
- Stream API enhancements（流API增强）
- Optional Interface enhancements（可选接口增强）
- Application Class data sharing（应用程序类数据共享）

## Local Variable Type Inference

​       局部变量类型推断是Java 10中引入的一项新特性，它允许在声明局部变量时省略类型。编译器会根据右侧的表达式自动推断出变量的类型。

```
var list = new ArrayList<String>();
list.add("Hello");
list.add("World");
```

## Collection API enhancements

- `toArray()`方法现在支持将集合转换为数组，同时可以指定数组的运行时类型。例如：

```
List<String> list = Arrays.asList("A", "B", "C");
String[] array = list.toArray(new String[0]);
```

- `spliterator()`方法现在支持并行处理。例如：

```
List<String> list = Arrays.asList("A", "B", "C");
list.parallelStream().forEach(System.out::println);
```

## Stream API enhancements

- `takeWhile()`和`dropWhile()`方法现在支持并行处理。例如：

```
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
list.stream().takeWhile(x -> x < 5).forEach(System.out::println); // 输出1, 2, 3, 4
list.stream().dropWhile(x -> x < 5).forEach(System.out::println); // 输出5, 6, 7, 8, 9, 10
```

## Optional Interface enhancements

- `Optional`类现在支持`orElseThrow()`方法，用于在`Optional`为空时抛出异常。例如：

```
Optional<String> optional = Optional.empty();
String value = optional.orElseThrow(() -> new IllegalArgumentException("Value is missing"));
```

##     Application Class data sharing    

​        Java 10引入了一个新的模块系统，允许在不同的模块之间共享数据。这可以通过在模块描述符中使用`exports`指令来实现。例如，如果我们有一个名为`com.example.myapp`的模块，我们可以将其导出以供其他模块使用：

```
module com.example.myapp {
    exports com.example.myapp;
}
```

​      然后，其他模块可以通过`requires`指令来使用这个模块：

```
module com.example.otherapp {
    requires com.example.myapp;
}
```

