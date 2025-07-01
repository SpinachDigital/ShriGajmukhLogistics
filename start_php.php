<?php
// Simple test script to verify PHP server is working
echo "PHP Server is running on port 5000\n";
echo "Current time: " . date('Y-m-d H:i:s') . "\n";
echo "PHP version: " . phpversion() . "\n";
echo "Document root: " . $_SERVER['DOCUMENT_ROOT'] ?? getcwd() . "\n";
?>