# AWS Cognito Angular     
# Description     
This project demonstrate how to integrate AWS services, including Lambda, Cognito, and API Gateway, into an Angular frontend.                 
The application provides a authentication and authorization system using Amazon Cognito, allowing users to sign up, sign in, logout, reset their passwords, and receive verification codes. The UI   is built with Bootstrap.                 

# Technologies Used  
- Angular (version: 16.1.7)  
- Bootstrap (version: 5.3.0)   

# AWS Services Used  
- AWS Amplify  
- Amazon Cognito  
- AWS Lambda  
- API Gateway  
  
# Prerequisites            
- [Node.js](https://nodejs.org/en) and npm installed on your system  
- [AWS account](https://aws.amazon.com/) to create a Cognito User Pool and manage Lambda functions with API Gateway.  

# Installation     
- Clone or download the project files.           
- Install the dependencies by running the following command in the project directory: **npm install**    
- Run the project: **ng serve**  

# Configuration   
1. Open the **'environment.ts'** file located in src/environments. Replace the following placeholders with your values:    
   ![image](https://github.com/user-attachments/assets/222d4cac-9f31-4ef7-a7a0-ba14913bd56e)         
2. In the **order.service.ts** file located in src/app/services replace the URL with your API Gateway URL from AWS.   
   ![image](https://github.com/user-attachments/assets/60fa59b1-50e3-4bda-bb45-85afdb0dd55d)     

# Features        
**1. User Registration:** New users can sign up and create an account by providing e-mail and password.   
  ![image](https://github.com/user-attachments/assets/765d8d8e-481d-476e-9fe0-b5350c321df6)           
  After successful registration, a verification code is automatically sent to the user's email for account verification.       
  Insert the verification code after the registration process.             
  ![image](https://github.com/user-attachments/assets/78fb5106-e1af-4346-b81d-5aec94692630)              
       

**2. User Login:** Registered users can sign in using their credentials and access the application.                     
  ![image](https://github.com/user-attachments/assets/10062830-b99e-4cd6-8100-222e69f07233)               
  After sign in successfully, the user gains access to view their orders retrieved from an AWS Lambda function.      
  ![image](https://github.com/user-attachments/assets/31cf17db-37ee-4443-aede-2f0f24451643)              
  The user can log out from the application.         
  ![image](https://github.com/user-attachments/assets/dcd687ab-76eb-4c0f-a4df-50ad4873474a)               

**3. Forgot Password:** In case users forget their passwords, the application allows them to reset their passwords by receiving a verification code through email.                
  ![image](https://github.com/user-attachments/assets/578d0e4b-d691-4456-a705-8c13557274d0)            
  
**4. Resend Code:** If users do not receive the verification code during the sign-up process, they will have the option to request a new code when they sign in with their email and password in the login section.                
  ![image](https://github.com/user-attachments/assets/061b6cfd-c723-4aa6-811f-061f68c45e9a)          
   
