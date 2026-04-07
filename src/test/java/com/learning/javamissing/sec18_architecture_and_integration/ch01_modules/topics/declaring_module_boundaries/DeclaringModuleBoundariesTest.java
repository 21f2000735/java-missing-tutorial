package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.declaring_module_boundaries;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class DeclaringModuleBoundariesTest {
    @Test
    void descriptorShowsDependencyAndExport() {
        String descriptor = DeclaringModuleBoundaries.descriptorText();

        assertTrue(descriptor.contains("requires java.net.http;"));
        assertTrue(descriptor.contains("exports com.learning.analytics.api;"));
    }
}
