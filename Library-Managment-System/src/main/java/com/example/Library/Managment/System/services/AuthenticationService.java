package com.example.Library.Managment.System.services;

import com.example.Library.Managment.System.dto.RegisterRequest;
import com.example.Library.Managment.System.entities.Student;
import com.example.Library.Managment.System.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final StudentRepository studentRepository;

    public AuthenticationService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public String registerStudent(RegisterRequest registerRequest){
        Optional<Student> student = studentRepository.findStudentByStudemail(registerRequest.getEmail());

        if(student.isPresent()){
            return "Already Registered";
        }
        Student student1 = new Student();
        student1.setStudemail(registerRequest.getEmail());
        student1.setPassword(registerRequest.getPassword());
        studentRepository.save(student1);

        return "Student registered successfully";
    }

    public String loginStudent(RegisterRequest registerRequest){
        Optional<Student> student = studentRepository.findStudentByStudemail(registerRequest.getEmail());
        if(student.isPresent()){
            Student student1 = student.get();
            if(student1.getPassword().equals(registerRequest.getPassword())){
                return "Login Successfull";
            }
            else{
                return "Incorrect Password";
            }
        }
        return "Student Does Not Exist";
    }
}