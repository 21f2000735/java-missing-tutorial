package com.learning.javamissing.sec09_hidden_java_features.ch01_underused_core_utilities.topics.using_factory_methods_and_copy_of;

import java.util.ArrayList;
import java.util.List;

public class UsingFactoryMethodsAndCopyOf {
    public static void main(String[] args) {
        System.out.println("Concept: concise immutable collection creation");
        System.out.println("Real-world problem: a service wants a safe read-only list of default roles.");
        System.out.println();

        List<String> mutableRoles = new ArrayList<>(List.of("VIEWER", "EDITOR"));
        List<String> safeCopy = List.copyOf(mutableRoles);
        mutableRoles.add("ADMIN");

        // Expected output:
        // safeCopy = [VIEWER, EDITOR]
        // mutableRoles = [VIEWER, EDITOR, ADMIN]
        System.out.println("safeCopy = " + safeCopy);
        System.out.println("mutableRoles = " + mutableRoles);
        System.out.println("Why it works: List.copyOf creates an unmodifiable snapshot instead of sharing later mutations.");
    }
}
