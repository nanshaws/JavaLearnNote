# java15新特性

- Using text blocks
- Hidden classes Improvement in the CharSequence interface

## Using text blocks

​         在Java 15中，引入了一个新的语法特性，称为文本块。文本块允许你在代码中直接嵌入多行字符串，而无需使用转义字符或连接操作符。这使得处理多行字符串更加简洁和易读。

```
public class TextBlockExample {
    public static void main(String[] args) {
        String json = """
                {
                    "name": "John",
                    "age": 30,
                    "city": "New York"
                }
                """;
        System.out.println("JSON data:");
        System.out.println(json);
    }
}
```

## Hidden classes Improvement in the CharSequence interface

​        在Java 15中，对CharSequence接口进行了一些改进，以提高性能和减少内存占用。这些改进包括使用隐藏类来优化字符串操作，以及引入新的API来处理Unicode字符。

```
public class CharSequenceExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        System.out.println("Original string: " + str);

        // 使用CharSequence接口的改进进行字符串操作
        int length = str.length(); // 使用隐藏类优化的方法调用
        char ch = str.charAt(0); // 使用隐藏类优化的方法调用

        System.out.println("Length of the string: " + length);
        System.out.println("First character of the string: " + ch);
    }
}

```

