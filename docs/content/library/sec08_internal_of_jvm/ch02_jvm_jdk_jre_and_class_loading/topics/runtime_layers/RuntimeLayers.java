package com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading.topics.runtime_layers;

public class RuntimeLayers {
    public static void main(String[] args) {
        System.out.println("Concept: JVM, JRE, and JDK answer different questions.");
        System.out.println("Real-world problem: a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.");
        System.out.println();

        // Expected output:
        // JVM = executes bytecode
        // JRE = runtime pieces needed to run Java programs
        // JDK = tools + runtime for developing Java
        System.out.println("JVM = executes bytecode");
        System.out.println("JRE = runtime pieces needed to run Java programs");
        System.out.println("JDK = tools + runtime for developing Java");
        System.out.println("Why it matters: the JDK contains tools like javac, while the JVM is the execution engine inside the larger runtime story.");
    }
}
