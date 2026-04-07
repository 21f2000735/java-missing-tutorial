package com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns.topics.creating_objects_with_factory_method;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CreatingObjectsWithFactoryMethodTest {
    @Test
    void createsCardGatewayFromFactory() {
        CreatingObjectsWithFactoryMethod.PaymentGateway gateway =
                CreatingObjectsWithFactoryMethod.PaymentGatewayFactory.forMethod("CARD");

        assertEquals("CARD payment accepted for 1500", gateway.charge(1_500));
    }
}
