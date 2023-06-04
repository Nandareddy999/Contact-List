package com.internshipproject.project.contacts;

import org.springframework.web.bind.annotation.*;

import lombok.Data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@Data
class Response
{
    String status;
    String error;
}
@RestController
@CrossOrigin
public class DeleteContact {

    @RequestMapping(path = "contacts/delete",consumes = "application/json",method = RequestMethod.POST)
    public static Response updateContact(@RequestBody Contacts request)
    {
        Response response = new Response();

        try {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();
            ResultSet result = st.executeQuery("select * from contacts where first_name='" + request.getFirst_name() + "'");
            if(!result.next())
            {
                response.setStatus("failed");
                response.setError("contact doesn't exist");
                return response;
            }

            st.executeUpdate("delete from contacts where first_name='"+ request.getFirst_name()+"'and last_name='"+request.getLast_name()+"';");
             result = st.executeQuery("select * from contacts where first_name='" + request.getFirst_name() + "'and last_name='"+request.getLast_name()+"'");
            if(!result.next())
            {
                response.setStatus("success");
                return response;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}
