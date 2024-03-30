# java17新特性

- Improvements in Random Number Generator algorithms
- Deserialization filtering
- Modified switch case
- Reflection API for a sealed class
- Vector API

中文介绍：

1. 随机数生成器算法的改进：在Java 17中，对随机数生成器算法进行了一些改进，以提高性能和减少内存占用。这些改进包括使用更高效的算法和优化了随机数生成器的实现。
2. 反序列化过滤：在Java 17中，引入了一个新的特性，允许在反序列化过程中进行过滤操作。这可以防止恶意代码执行或处理不安全的输入数据。
3. 修改后的switch case语法：在Java 17中，对switch case语法进行了一些修改，以提供更好的类型安全性和代码可读性。现在可以使用新的switch表达式来简化代码。
4. 密封类的反射API：在Java 17中，引入了一个新的反射API，用于支持密封类。密封类是一种限制继承的类，通过反射API可以访问密封类的成员和方法。
5. Vector API：在Java 17中，引入了一个新的Vector API，提供了更灵活和高效的方式来处理向量计算。这个API包括了一些新的方法，如add、subtract、multiply等。

## Improvements in Random Number Generator algorithms+Modified switch case

```
import java.util.Random;
import java.util.Vector;

public class Java17Example {
    public static void main(String[] args) {
        // 使用改进的随机数生成器算法
        Random random = new Random();
        int randomNumber = random.nextInt(10);
        System.out.println("Random number: " + randomNumber);

        // 使用修改后的switch case语法
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6 -> "Saturday";
            case 7 -> "Sunday";
            default -> "Invalid day";
        };
        System.out.println("Day name: " + dayName);
    }
}
```

## Deserialization filtering

```
import java.io.*;

public class DeserializationFilterExample {
    public static void main(String[] args) {
        // 创建一个包含恶意代码的序列化对象
        byte[] serializedObject = createSerializedObject();

        // 使用反序列化过滤器进行反序列化
        try (ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(serializedObject);
             ObjectInputStream objectInputStream = new ObjectInputStream(byteArrayInputStream)) {
            objectInputStream.setObjectInputFilter(new ObjectInputFilter() {
                @Override
                public Status checkInput(FilterInfo filterInfo) {
                    if (filterInfo.references() > 0) {
                        return Status.REJECTED; // 拒绝包含引用的对象
                    } else {
                        return Status.ALLOWED; // 允许其他对象
                    }
                }
            });

            Object deserializedObject = objectInputStream.readObject();
            System.out.println("Deserialized object: " + deserializedObject);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private static byte[] createSerializedObject() {
        // 创建包含恶意代码的序列化对象
        // 示例省略
        return null;
    }
}
```

​        在这个例子中，我们首先创建了一个包含恶意代码的序列化对象。然后，我们使用`ObjectInputStream`进行反序列化，并设置了一个自定义的反序列化过滤器。在过滤器中，我们检查对象的引用数量，如果大于0，则拒绝该对象；否则，允许其他对象。通过这种方式，我们可以防止恶意代码执行或处理不安全的输入数据。

## Reflection API for a sealed class

```
import java.lang.reflect.Method;

public class SealedClassReflectionExample {
    public static void main(String[] args) {
        // 获取密封类的方法
        Method sealedMethod = getSealedMethod();

        // 调用密封类的方法
        try {
            Object result = sealedMethod.invoke(null);
            System.out.println("Result: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Method getSealedMethod() {
        // 获取密封类的方法
        // 示例省略
        return null;
    }
}
```

## Vector API

```
package org.cyl.spaceutils;
 
import jdk.incubator.vector.FloatVector;
import jdk.incubator.vector.VectorSpecies;
 
public class VectorScalarOperations {
    public static void main(String[] args) {
        // 定义矢量a和b
        float[] a = {1, 2, 3};
        float[] b = {4, 5, 6};
        float[] c=new float[a.length];
        VectorScalarOperations v1=new VectorScalarOperations();
        long startTime = System.nanoTime();
        v1.vectorComputation(a,b,c);
        long endTime = System.nanoTime();
        System.out.println("矢量花费的时间:"+(endTime-startTime));
 
        long startTime1 = System.nanoTime();
        v1.xadd(a,b,c);
        long endTime1 = System.nanoTime();
        System.out.println("标量花费的时间:"+(endTime1-startTime1));
 
    }
 
    static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_PREFERRED;
    void vectorComputation(float[] a, float[] b, float[] c) {
        int i = 0;
        int upperBound = SPECIES.loopBound(a.length);
        for (; i < upperBound; i += SPECIES.length()) {
            // FloatVector va, vb, vc;
            var va = FloatVector.fromArray(SPECIES, a, i);
            var vb = FloatVector.fromArray(SPECIES, b, i);
            var vc = va.mul(va)
                    .add(vb.mul(vb));
            vc.intoArray(c, i);
        }
    }
 
    void xadd(float[]a,float[]b,float[]c){
        for (int i=0;i<a.length;i++){
            c[i] = (a[i] * a[i] + b[i] * b[i]) * -1.0f;
        }
    }
}
```

