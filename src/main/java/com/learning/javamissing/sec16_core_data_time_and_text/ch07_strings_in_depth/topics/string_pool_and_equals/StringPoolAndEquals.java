package com.learning.javamissing.sec16_core_data_time_and_text.ch07_strings_in_depth.topics.string_pool_and_equals;

public class StringPoolAndEquals {
    public static void main(String[] args) {
        String literalA = "java";
        String literalB = "java";
        String objectString = new String("java");

        // Expected output:
        // literalA == literalB -> true
        // literalA == objectString -> false
        // literalA.equals(objectString) -> true
        System.out.println("literalA == literalB -> " + (literalA == literalB));
        System.out.println("literalA == objectString -> " + (literalA == objectString));
        System.out.println("literalA.equals(objectString) -> " + literalA.equals(objectString));
        System.out.println("Why it works: literals can reuse the same pooled reference, but new String(...) creates a different object with the same content.");
    }
}
