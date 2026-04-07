package com.learning.javamissing.sec19_testing_and_quality.ch02_junit5_and_test_doubles.topics.test_doubles_and_verification;

public class TestDoublesAndVerification {
    public static void main(String[] args) {
        FakeNotifier notifier = new FakeNotifier();
        RegistrationService service = new RegistrationService(notifier);
        service.register("lee@example.com");

        // Expected output:
        // sentTo = lee@example.com
        System.out.println("sentTo = " + notifier.lastRecipient);
        System.out.println("Why it matters: Mockito automates this style of stubbing and verification, but the core skill is isolating collaborators with a controllable test double.");
    }

    interface Notifier {
        void sendWelcomeMail(String email);
    }

    static final class FakeNotifier implements Notifier {
        String lastRecipient;

        @Override
        public void sendWelcomeMail(String email) {
            lastRecipient = email;
        }
    }

    static final class RegistrationService {
        private final Notifier notifier;

        RegistrationService(Notifier notifier) {
            this.notifier = notifier;
        }

        void register(String email) {
            notifier.sendWelcomeMail(email);
        }
    }
}
