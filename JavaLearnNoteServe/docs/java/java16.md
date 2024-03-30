# java16新特性

- Default Method invocation from a proxy
- Improved Date -Time API 
- Modified Stream API Pattern matching for instanceof operator
- Record classes
- JPackage tool

中文介绍：

1. 代理中的默认方法调用：在Java 16中，引入了一个新的特性，允许在代理对象上直接调用接口的默认方法。这简化了使用代理时对默认方法的处理。
2. 改进的日期-时间API：在Java 16中，对日期和时间API进行了一些改进，以提高性能和易用性。这些改进包括新的日期和时间类、更精确的时间计算以及更好的时区支持。
3. 修改后的Stream API模式匹配：在Java 16中，对Stream API的模式匹配进行了一些修改，以提供更好的类型安全性和代码可读性。现在可以使用instanceof操作符进行模式匹配，而无需显式地检查类型。
4. Record类：在Java 16中，引入了Record类的概念。Record类是一种简化数据类的声明方式，它自动生成了构造函数、getter方法和equals()、hashCode()等方法。
5. JPackage工具：JPackage是Java 16中引入的一个新工具，用于创建模块化的Java应用程序。它可以将多个模块打包成一个独立的可执行文件或库，并提供了更好的依赖管理和版本控制。

```
import java.time.LocalDate;
import java.util.stream.Stream;

public class Java16Example {
    public static void main(String[] args) {
        // 使用默认方法调用
        MyInterface proxy = (MyInterface) Proxy.newProxyInstance(
                MyInterface.class.getClassLoader(),
                new Class<?>[]{MyInterface.class},
                (proxy, method, methodArgs) -> "Default implementation"
        );
        System.out.println("Default method invocation: " + proxy.defaultMethod());

        // 使用改进的日期-时间API
        LocalDate today = LocalDate.now();
        System.out.println("Today's date: " + today);

        // 使用修改后的Stream API模式匹配
        Object obj = "Hello";
        if (obj instanceof String s) {
            System.out.println("It's a string: " + s);
        } else {
            System.out.println("Not a string");
        }

        // 使用Record类
        Person person = new Person("John", 25);
        System.out.println("Person name: " + person.name());
        System.out.println("Person age: " + person.age());

        // 使用JPackage工具（示例省略）
    }
}

interface MyInterface {
    default String defaultMethod() {
        return "Default implementation";
    }
}

record Person(String name, int age) {}
```

