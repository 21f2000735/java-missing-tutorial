package com.learning.javamissing.sec13_io_and_data_access.ch02_files_buffers_and_serialization.topics.bytes_chars_and_files;

import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

public class BytesCharsAndFiles {
    public static void main(String[] args) {
        String invoice = "Invoice-42";
        byte[] rawBytes = invoice.getBytes(StandardCharsets.UTF_8);
        Path file = Path.of("reports", "invoice-42.txt");

        // Expected output:
        // byteCount = 10
        // path = reports/invoice-42.txt
        System.out.println("byteCount = " + rawBytes.length);
        System.out.println("path = " + file);
        System.out.println("Why it matters: bytes represent encoded data, characters represent text meaning, and Path is the modern entry point for filesystem work.");
    }
}
