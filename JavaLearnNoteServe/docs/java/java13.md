# java13新特性

- Updates in java.nio.file.FileSystems
- Updates in XML parsers

## Updates in java.nio.file.FileSystems

​        在Java 13中，对java.nio.file.FileSystems类进行了一些更新。这个类提供了访问文件系统的方法，例如创建、删除和修改文件或目录。在Java 13中，引入了一些新的方法和属性，以提供更好的文件系统支持。

```
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class FileSystemExample {
    public static void main(String[] args) {
        // 获取默认的文件系统
        var fileSystem = FileSystems.getDefault();

        // 定义要读取的文件路径
        var filePath = fileSystem.getPath("example.txt");

        try {
            // 读取文件内容
            List<String> lines = Files.readAllLines(filePath, StandardCharsets.UTF_8);

            // 输出文件内容
            for (String line : lines) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}
```

## Updates in XML parsers

​         在Java 13中，对XML解析器进行了一些更新。这些更新包括修复了一些已知的问题，并提高了解析性能。此外，还引入了一些新的特性，如支持XML命名空间和CDATA块等。

```
import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XMLParserExample {
    public static void main(String[] args) {
        try {
            // 创建文档构建工厂
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

            // 创建文档构建器
            DocumentBuilder builder = factory.newDocumentBuilder();

            // 解析XML文件
            Document document = builder.parse(new File("example.xml"));

            // 获取根元素
            Element rootElement = document.getDocumentElement();

            // 获取所有子节点
            NodeList nodeList = rootElement.getChildNodes();

            // 遍历子节点
            for (int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);

                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    System.out.println("Element: " + element.getTagName());
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing XML file: " + e.getMessage());
        }
    }
}
```

