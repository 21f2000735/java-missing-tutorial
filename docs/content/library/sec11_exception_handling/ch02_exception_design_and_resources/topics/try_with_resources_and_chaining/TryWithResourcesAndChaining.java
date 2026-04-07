package com.learning.javamissing.sec11_exception_handling.ch02_exception_design_and_resources.topics.try_with_resources_and_chaining;

public class TryWithResourcesAndChaining {
    public static void main(String[] args) {
        try {
            loadInvoice();
        } catch (IllegalStateException exception) {
            System.out.println("topLevelMessage = " + exception.getMessage());
            System.out.println("causeType = " + exception.getCause().getClass().getSimpleName());
        }
    }

    static void loadInvoice() {
        try (InvoiceResource resource = new InvoiceResource()) {
            resource.read();
        } catch (Exception exception) {
            throw new IllegalStateException("Invoice loading failed", exception);
        }
    }

    static final class InvoiceResource implements AutoCloseable {
        void read() throws Exception {
            throw new Exception("File contents were corrupt");
        }

        @Override
        public void close() {
            System.out.println("resource closed");
        }
    }
}
