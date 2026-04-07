package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.unpacking_records_with_patterns;

public class UnpackingRecordsWithPatterns {
    public static void main(String[] args) {
        explainWhy();
        runLoginEventExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- record patterns unpack structured data during the match");
        System.out.println("- they work best when the record model is already clear");
        System.out.println("- they reduce repeated getter calls in shape-based code");
    }

    private static void explainWhy() {
        System.out.println("Concept: unpack data while matching shape");
        System.out.println("Real-world problem: a login event contains a user object and a source channel.");
        System.out.println("Mental model: if the object has the expected record shape, unpack it immediately.");
        System.out.println();
    }

    private static void runLoginEventExample() {
        Object event = new LoginEvent(new User("Asha"), "mobile");
        if (event instanceof LoginEvent(User(String name), String source)) {
            // Expected output:
            // name = Asha
            // source = mobile
            System.out.println("name = " + name);
            System.out.println("source = " + source);
            System.out.println("Why it works: the pattern drills into the nested record structure in one match.");
        }
    }

    private record User(String name) {}
    private record LoginEvent(User user, String source) {}
}
