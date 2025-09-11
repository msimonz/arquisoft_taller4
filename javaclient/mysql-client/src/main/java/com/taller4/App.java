package com.taller4;

import java.sql.*;
import java.util.Scanner;

public class App {
    private static final String URL = "jdbc:mysql://localhost:3306/dbtaller4";
    private static final String USER = "simis";
    private static final String PASS = "password";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             Scanner sc = new Scanner(System.in)) {

            System.out.println("✅ Conectado a MySQL");
            while (true) {
                System.out.print("mysql> ");
                String query = sc.nextLine();

                if (query.equalsIgnoreCase("exit")) {
                    System.out.println("👋 Saliendo...");
                    break;
                }

                try (Statement st = conn.createStatement()) {
                    if (query.toLowerCase().startsWith("select")) {
                        ResultSet rs = st.executeQuery(query);
                        int cols = rs.getMetaData().getColumnCount();

                        while (rs.next()) {
                            for (int i = 1; i <= cols; i++) {
                                System.out.print(rs.getString(i) + "\t");
                            }
                            System.out.println();
                        }
                    } else {
                        int rows = st.executeUpdate(query);
                        System.out.println("Filas afectadas: " + rows);
                    }
                } catch (SQLException e) {
                    System.out.println("❌ Error: " + e.getMessage());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
