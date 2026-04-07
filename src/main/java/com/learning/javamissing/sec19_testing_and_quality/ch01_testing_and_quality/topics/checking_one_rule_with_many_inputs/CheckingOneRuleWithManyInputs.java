package com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality.topics.checking_one_rule_with_many_inputs;

public class CheckingOneRuleWithManyInputs {
    public static void main(String[] args) {
        explainWhy();
        showRepeatedRuleExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- parameterized tests fit one rule checked against many inputs");
        System.out.println("- they reduce repetition without hiding the rule");
        System.out.println("- readability should still stay high");
    }

    private static void explainWhy() {
        System.out.println("Concept: test one rule with multiple data rows");
        System.out.println("Real-world problem: tax calculation must work for several price-and-rate combinations.");
        System.out.println("Mental model: if the behavior is the same and only the inputs change, parameterize the test.");
        System.out.println();
    }

    private static void showRepeatedRuleExample() {
        String test = """
                @ParameterizedTest
                @CsvSource({
                    "2000,18,2360",
                    "1000,5,1050",
                    "5000,0,5000"
                })
                void totalWithTax(int price, int tax, int expected) {
                    assertEquals(expected, PriceCalculator.totalWithTax(price, tax));
                }
                """;

        System.out.println(test);
        System.out.println("Why it matters: the rule stays the same, but many cases are verified without copy-paste tests.");
    }
}
