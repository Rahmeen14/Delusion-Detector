# Delusion-Detector
A simple Node web app that uses Random Forest Regression to detect if a to-be-employee is lying about his previous salary.

This is a simple node app that accepts a companies salary data, i.e., a .csv file that has designations, salaries for those designations and a certain prdered level assigned with each designation depending upon the salary (higher the salary, higher the level).
Besides this, the app also demands two  inputs:

1.) The level at which the employee was in the company (a fractional number between 1 and total number of designations) where the fractional part arises by virtue of years of experience. For instance, if I am working as a Senior Executive which is level number 6 with 3 years of experience, then if in my company promotions occur after an average of 6 years of continuing the same post, then my level becomes 6.5 

2.) The salary which the employee, while negotiations, claims  to have had in the previous company.

The node app.js file then sends the information to a python script that implements Random Forest Regression, an ensemble Machine Learning Algorithm on the data to predict the possible salary of the employee.

The app then reports whether:
1.) The employee is honest, i.e., told his exact salary
2.) The employee understated his salary
3.) The employee was trying to bluff the company, claiming more than he deserves. The app also gives the %Bluff of the employee

![Alt text](/readMeSS/pic1.png?raw=true "App looks like:")
![Alt text](/readMeSS/pic2.png?raw=true "App looks like:")
![Alt text](/readMeSS/pic3.png?raw=true "App looks like:")
![Alt text](/readMeSS/pic4.png?raw=true "App looks like:")
