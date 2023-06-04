package com.internshipproject.project.contacts;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@RestController
@CrossOrigin
public class UpdateContact {
    @RequestMapping(path = "contacts/update",consumes = "application/json",method = RequestMethod.POST)
    public static Contacts updateContact(@RequestBody Contacts request)
    {
        Contacts response = new Contacts();
        try {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();
            st.executeUpdate("insert into contacts(first_name,last_name,mobile,user_id) values('" + request.getFirst_name()
                    + "','"+ request.getLast_name()+"','" + request.getMobile()+ "','"+request.getUser_id()+"');");
            ResultSet result = st.executeQuery("select * from contacts where first_name='" + request.getFirst_name() + "'");
            while (result.next()) {
                response.first_name = result.getString("first_name");
                response.last_name=result.getString("last_name");
                response.mobile=result.getString("mobile");
                response.user_id=result.getInt("user_id");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}
