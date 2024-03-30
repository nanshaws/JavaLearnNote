# java14新特性

- Modified switch case syntax
- Using yield in the switch case

1. 修改了switch case语法：在Java 14中，对switch case的语法进行了一些修改。这些修改使得switch case更加简洁和易读。
2. 在switch case中使用yield：在Java 14中，可以在switch case中使用yield关键字。yield关键字用于返回一个值，并且可以中断当前方法的执行。

```
public class SwitchCaseExample {
    public static void main(String[] args) {
        int day = 3;
        String dayName = getDayName(day);
        System.out.println("Day " + day + " is " + dayName);
    }

    private static String getDayName(int day) {
        return switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6 -> "Saturday";
            case 7 -> "Sunday";
            default -> {
                System.out.println("Invalid day");
                yield null;
            }
        };
    }
}
```

