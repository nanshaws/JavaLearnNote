# java11新特性

- Nest-based access control（基于嵌套的访问控制）
- Updates in the Reflection API（反射API的更新）
- String API updates（字符串API更新）
- Updates in reflective access of the nested class（嵌套类的反射访问更新）
- Local variable syntax for lambda parameters（Lambda参数的局部变量语法）
- HttpClient(Standard)（标准HttpClient）
- Launch Single-File SourceCode Program（启动单文件源代码程序）

## Nest-based access control

​        在Java中，嵌套类和接口可以访问其外部类的私有成员。这种访问权限被称为基于嵌套的访问控制。例如：

```
class OuterClass {
    private String privateField = "Private Field";

    class InnerClass {
        void accessOuterClass() {
            System.out.println(privateField);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        OuterClass.InnerClass inner = outer.new InnerClass();
        inner.accessOuterClass(); // 输出 "Private Field"
    }
}
```

## Updates in the Reflection API

​         Java 9引入了模块系统，这导致了一些反射API的更改。例如，`java.lang.reflect.Proxy`类现在有一个名为`getProxyClass`的新方法，用于获取代理类的`Class`对象。此外，`java.lang.reflect.Method`类现在有一个名为`isModule`的方法，用于检查方法是否属于某个模块。

## String API updates

​       Java 11引入了一些新的字符串API，如`strip()`, `isBlank()`, `repeat()`等。例如：

```
public class Main {
    public static void main(String[] args) {
        String str = " Hello, World! ";
        System.out.println(str.strip()); // 输出 "Hello, World!"
        System.out.println("".isBlank()); // 输出 true
        System.out.println("*".repeat(5)); // 输出 "*****"
    }
}
```

## Updates in reflective access of the nested class

​         Java 14引入了一个新的API，允许在运行时访问嵌套类的私有成员。这个API是`java.lang.invoke.MethodHandles.Lookup`类的一个新方法`findAllClasses()`。例如：

```
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodHandles.Lookup;
import java.util.Set;

class OuterClass {
    private static class PrivateNestedClass {
    }
}

public class Main {
    public static void main(String[] args) throws Throwable {
        Lookup lookup = MethodHandles.lookup();
        Set<Class<?>> classes = lookup.findAllClasses(OuterClass.class);
        for (Class<?> clazz : classes) {
            System.out.println(clazz.getName());
        }
    }
}
```

## Local variable syntax for lambda parameters

​     Java 10引入了一种新的语法，允许在Lambda表达式中使用局部变量。这种语法称为“局部变量语法”。例如：

```
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach((name) -> System.out.println(name)); // Java 8及更早版本
names.forEach(name -> System.out.println(name)); // Java 10及更高版本
```

## HttpClient(Standard)

​    Java 11引入了一个新的HTTP客户端API，名为`java.net.http.HttpClient`。这个API提供了一种更简单、更现代的方式来处理HTTP请求。例如：

```
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.example.com"))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
```

## Launch Single-File SourceCode Program

​        从Java 11开始，可以使用`java`命令行工具直接运行单个源代码文件。例如，如果你有一个名为`HelloWorld.java`的文件，只需在命令行中输入`java HelloWorld.java`即可运行它。