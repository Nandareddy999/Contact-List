package com.internshipproject.project.contacts;

import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@RestController
@CrossOrigin
public class Login {
    @RequestMapping(path = "contacts/login",consumes = "application/json", method = RequestMethod.POST)
    public static LoginOutput login(@RequestBody LoginInput request)
    {
        LoginOutput response = new LoginOutput();
        try
        {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();

            ResultSet result = st.executeQuery("select * from contacts_login where user_name='" + request.getUser_name() + "'");
            if(!result.next())
            {
                response.error="Invalid user_name or password";
                response.status="failed";
                return response;
            }
            result = st.executeQuery("select * from contacts_login where user_name='" + request.getUser_name() + "'");
            while (result.next()) {
                if(!result.getString("password").equals(request.getPassword()))
                {
                    response.error="Invalid Password";
                    response.status="failed";
                    return response;
                }
                else {
                    response.status="Success";
                    response.user_id=result.getString("user_id");

                }
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return response;
    }
}
