package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.module_boundaries;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ModuleBoundariesTest {
    @Test
    void storeDescriptorShowsRequiredModuleAndExportedApiPackage() {
        String descriptor = ModuleBoundaries.storeModuleDescriptor();

        assertTrue(descriptor.contains("requires java.sql;"));
        assertTrue(descriptor.contains("exports com.learning.store.api;"));
    }
}
