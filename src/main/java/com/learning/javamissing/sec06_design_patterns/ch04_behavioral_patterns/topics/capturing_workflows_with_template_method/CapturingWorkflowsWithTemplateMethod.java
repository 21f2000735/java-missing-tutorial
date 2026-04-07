package com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns.topics.capturing_workflows_with_template_method;

/**
 * Concept: Template method
 * Why this concept is needed:
 * Some workflows stay stable overall while a few internal steps vary.
 *
 * What problem this solves:
 * It keeps the workflow order fixed while allowing subclasses to customize selected steps.
 *
 * Real-world setup:
 * Reporting exports always fetch data, format it, and deliver it, but the formatting step changes.
 *
 * How to think about it:
 * Lock the algorithm skeleton in one place and vary only the step that truly differs.
 *
 * How to code it:
 * 1. Put the full workflow in a final method.
 * 2. Keep stable steps in the base class.
 * 3. Make the variable step abstract or overridable.
 *
 * Expected output:
 * fetch order data
 * format rows as CSV
 * send file to reporting bucket
 */
public class CapturingWorkflowsWithTemplateMethod {
    public static void main(String[] args) {
        System.out.println("Concept: template method");
        System.out.println("Problem: export jobs share the same outer workflow but differ in formatting.");
        System.out.println();

        OrderExporter exporter = new CsvOrderExporter();

        // Expected output:
        // fetch order data
        // format rows as CSV
        // send file to reporting bucket
        exporter.export();
        System.out.println("Why it works: the outer workflow order stays fixed while one step varies safely.");
        System.out.println("Common mistake: forcing inheritance when composition would give more freedom and less coupling.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- template method fixes the workflow order");
        System.out.println("- subclasses fill in only the varying steps");
        System.out.println("- this works well when a process is stable but some steps change");
    }

    static abstract class OrderExporter {
        final void export() {
            fetchData();
            formatData();
            deliver();
        }

        void fetchData() {
            System.out.println("fetch order data");
        }

        abstract void formatData();

        void deliver() {
            System.out.println("send file to reporting bucket");
        }
    }

    static final class CsvOrderExporter extends OrderExporter {
        @Override
        void formatData() {
            System.out.println("format rows as CSV");
        }
    }
}
