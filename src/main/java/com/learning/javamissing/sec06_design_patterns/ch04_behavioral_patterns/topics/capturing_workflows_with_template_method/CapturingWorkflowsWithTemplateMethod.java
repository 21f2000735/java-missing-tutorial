package com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns.topics.capturing_workflows_with_template_method;

public class CapturingWorkflowsWithTemplateMethod {
    public static void main(String[] args) {
        OrderExporter exporter = new CsvOrderExporter();

        // Expected output:
        // fetch order data
        // format rows as CSV
        // send file to reporting bucket
        exporter.export();
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
