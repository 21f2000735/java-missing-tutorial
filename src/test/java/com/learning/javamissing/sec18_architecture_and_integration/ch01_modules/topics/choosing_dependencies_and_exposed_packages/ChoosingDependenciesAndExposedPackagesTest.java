package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.choosing_dependencies_and_exposed_packages;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ChoosingDependenciesAndExposedPackagesTest {
    @Test
    void storeDescriptorShowsRequiredModuleAndExportedApiPackage() {
        String descriptor = ChoosingDependenciesAndExposedPackages.storeModuleDescriptor();

        assertTrue(descriptor.contains("requires java.sql;"));
        assertTrue(descriptor.contains("exports com.learning.store.api;"));
    }
}
