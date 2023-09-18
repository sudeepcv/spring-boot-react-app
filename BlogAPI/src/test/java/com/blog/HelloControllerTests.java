package com.blog;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Test;

import com.blog.controller.HelloController;

public class HelloControllerTests {

    @Test
    public void testHello() {
        HelloController helloController = new HelloController();
        String result = helloController.hello();
        assertEquals("hello", result);
    }

    @Test
    public void testHelloNegative() {
        HelloController helloController = new HelloController();
        String result = helloController.hello();
        assertNotEquals("goodbye", result);
    }

}
