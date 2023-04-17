package com.capstone.POS.services;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {
    private static final int BCRYPT_ROUNDS = 12; // the number of rounds to use in the BCrypt algorithm

    public static String hashPassword(String password) {
        // generate a salt for the password
        String salt = BCrypt.gensalt(BCRYPT_ROUNDS);

        // hash the password using the salt and the BCrypt algorithm
        String hashedPassword = BCrypt.hashpw(password, salt);

        return hashedPassword;
    }

    public static boolean checkPassword(String password, String hashedPassword) {
        // check if the provided password matches the hashed password
        boolean passwordMatches = BCrypt.checkpw(password, hashedPassword);

        return passwordMatches;
    }
}

