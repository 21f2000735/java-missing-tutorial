package com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality.topics.writing_readable_junit_tests;

public class WritingReadableJUnitTests {
    public static void main(String[] args) {
        explainWhy();
        showTestShape();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- JUnit gives a structure for executable checks");
        System.out.println("- the value comes from a clear scenario and assertion");
        System.out.println("- a test name should describe behavior");
    }

    private static void explainWhy() {
        System.out.println("Concept: the basic shape of a JUnit test");
        System.out.println("Real-world problem: developers need repeatable verification for a tax-calculation rule.");
        System.out.println("Mental model: arrange a scenario, execute behavior, assert the result.");
        System.out.println();
    }

    private static void showTestShape() {
        String test = """
                @Test
                void calculatesTaxIncludedTotal() {
                    int actual = PriceCalculator.totalWithTax(2000, 18);
                    assertEquals(2360, actual);
                }
                """;

        System.out.println(test);
        System.out.println("Why it matters: the method name and assertion make the behavior under test easy to read.");
    }
}
