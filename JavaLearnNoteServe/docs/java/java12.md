# java12新特性

- Teeting Collectors in the Stream API
- Updates in String API:
- Updates in NIO
- Updates in CompletableFuture
- Compact Number Formatting

## Teeting Collectors in the Stream API

​        在Stream API中引入了新的收集器，如`teeing()`，它可以将两个流的元素组合在一起进行操作。例如，可以将一个流的元素与另一个流的元素相加，然后将结果收集到一个新的列表中。

```
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TeetingCollectorExample {
    public static void main(String[] args) {
        Stream<Integer> stream1 = Stream.of(1, 2, 3, 4, 5);
        Stream<Integer> stream2 = Stream.of(6, 7, 8, 9, 10);

        List<Integer> result = Stream.concat(stream1, stream2)
                .collect(Collectors.teeing(
                        Collectors.summingInt(Integer::intValue),
                        Collectors.counting(),
                        (sum, count) -> sum / count
                ));

        System.out.println("平均值： " + result);
    }
}
```

## Updates in String API

String API进行了一些更新，包括`strip()`、`isBlank()`等方法的改进。

```
public class StringAPIExample {
    public static void main(String[] args) {
        String str1 = "  你好，世界！  ";
        String str2 = "";

        System.out.println("去除首尾空格： " + str1.strip());
        System.out.println("判断是否为空： " + str2.isBlank());
    }
}
```

## Updates in NIO

NIO（New I/O）进行了一些更新，包括对文件锁定和文件属性的支持。

```
import java.nio.channels.FileLock;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class NIOExample {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("test.txt");

        try (FileChannel fileChannel = FileChannel.open(path, StandardOpenOption.WRITE)) {
            FileLock lock = fileChannel.lock();
            if (lock != null) {
                System.out.println("文件锁定成功");
            } else {
                System.out.println("文件锁定失败");
            }
        }
    }
}
```

## Updates in CompletableFuture

CompletableFuture进行了一些更新，包括对异常处理的改进。

```
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            if (true) {
                throw new RuntimeException("发生异常");
            }
            return "Hello, World!";
        });

        future.exceptionally(ex -> {
            System.out.println("处理异常： " + ex.getMessage());
            return "Error";
        }).thenAccept(System.out::println);
    }
}
```

## Compact Number Formatting

引入了紧凑数字格式化，可以更简洁地表示数字。

```
import java.text.NumberFormat;
import java.util.Locale;

public class CompactNumberFormattingExample {
    public static void main(String[] args) {
        NumberFormat format = NumberFormat.getCompactNumberInstance(Locale.CHINA, NumberFormat.Style.SHORT);
        System.out.println("紧凑数字格式化： " + format.format(123456789));
    }
}
```

