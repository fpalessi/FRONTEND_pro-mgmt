# FRONTEND_pro-mgmt
Frontend made with React. Backend: https://github.com/fpalessi/BACKEND_pro-mgmt

Fully functional app built on Express, MongoDB and React. Once you sign up and confirm your account via email, you can log in and start managing your projects and tasks. <br> 
It uses password hashing (bcrypt), access token (JSON Web Token) and the Nodemailer module for account validation.
Design was done with TailwindCSS and the state was handled with Context API. <br> 
It has many functionalities such as adding (editing and deleting) projects, adding new tasks to each of these projects, etc. 
You can also add collaborators (registered users) to these tasks who can mark them as completed once they finished them.

Password reset and account confirmation by email are both disabled since Nodemailer is charging $820 for a 1 year license. Here you have 2 accounts with some projects as a demo, or feel free to create your own one. 
 test@outlook.es - 123test || test@gmail.com - test123.
