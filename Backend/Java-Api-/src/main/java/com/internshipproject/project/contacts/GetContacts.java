package com.internshipproject.project.contacts;

import org.springframework.web.bind.annotation.*;
import lombok.Data;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

@Data
class Get{
    int user_id;
}
@RestController
@CrossOrigin
public class GetContacts {
    @RequestMapping(path = "contacts/get",consumes = "application/json",method = RequestMethod.POST)
    public static ArrayList<Contacts> getContacts(@RequestBody Get request)
    {
        ArrayList<Contacts> response= new ArrayList<>();
        try {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();
            ResultSet result = st.executeQuery("select * from contacts where user_id='"+request.getUser_id()+"'");
            while (result.next()) {
                Contacts obj = new Contacts();
                obj.first_name=result.getString("first_name");
                obj.last_name=result.getString("last_name");
                obj.mobile=result.getString("mobile");
                obj.user_id=result.getInt("user_id");
                response.add(obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}
