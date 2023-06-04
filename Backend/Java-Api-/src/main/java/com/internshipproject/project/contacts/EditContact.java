package com.internshipproject.project.contacts;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

@Data
class Response {
    String status;
    String error;
}

@RestController
@CrossOrigin
public class EditContact {

    @RequestMapping(path = "contacts/edit", consumes = "application/json", method = RequestMethod.POST)
    public static Response editContact(@RequestBody Contacts request) {
        Response response = new Response();

        try {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();
            ResultSet result = st
                    .executeQuery("select * from contacts where first_name='" + request.getFirst_name() + "'");
            if (!result.next()) {
                response.setError("contact doesn't exist");
                response.setStatus("failed");
                return response;
            }
            st.executeUpdate("update contacts set last_name='" + request.getLast_name() + "', mobile='"
                    + request.getMobile() + "' where first_name='" + request.getFirst_name() + "'");
            result = st.executeQuery("select * from contacts where first_name='" + request.getFirst_name() + "'");
            while (result.next()) {
                if (result.getString("last_name").equals(request.getLast_name())) {
                    response.setStatus("success");
                    return response;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}
