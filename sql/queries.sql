#SIMPLE


#Select employees who joined the organization from 2018 to 2020
SELECT employee_name, employee_id, employee_doj
FROM employee
WHERE employee_doj >= '2018-01-01' AND employee_doj < '2021-01-01';


#Select causes that are active :
SELECT cause_type, cause_id 
FROM cause 
WHERE  cause_status = 'active' ;


#Display the budget for all the online campaigns :
SELECT campaign_budget 
FROM campaign
WHERE campaign_location = ‘Online’ ;


#Display the designations in the ‘Public Relations’ department :
SELECT employee_designation 
FROM employee 
WHERE employee_department = ‘Public Relations’ ;




#AGGREGATE


#Calculate the total budget of all the campaigns held in Chicago
SELECT SUM(campaign_budget) as TOTAL_CHICAGO_BUDGET
FROM campaign
WHERE campaign_location = 'Chicago';


#Calculate the total amount of allocated funds received from the donations collected :
SELECT SUM(fund_amount) as TOTAL_FUNDS_COLLECTED 
FROM fund 
WHERE fund_status = 'Allocated' ;


#Display the count of each donation type greater than 50 :
SELECT COUNT(donation_donor_id) , donation_type 
FROM donation 
GROUP BY donation_type 
HAVING COUNT(donation_donor_id) > 50 ;


#Remove the trailing spaces from the employee names:
UPDATE employee 
SET employee_name = TRIM(employee_name) ;




#COMPLEX


#Selecting employees in ascending order of their names which are employed for active Educational #causes


CREATE VIEW Employed_for_Education AS
SELECT E.employee_id, E.employee_name
FROM Employee E
INNER JOIN Cause C ON C.approver_id = E.employee_id
WHERE C.cause_status = 'active' AND C.cause_type = 'Education'
GROUP BY E.employee_id
ORDER BY employee_name ASC;


select * from Employed_for_Education;


# Retrieve the donor ID and name whose donation has not been received yet.
Create view incomplete_donation as 
SELECT donor_name, donor_id 
FROM donor 
WHERE EXISTS (SELECT donation_type 
     FROM donation 
     WHERE donation.donation_donor_id = donor.donor_id 
      AND donation_status = 'Not_Received');


Select * from incomplete_donation;


# Selecting the employees who are not handling any campaigns.


CREATE VIEW free_employees AS
select employee_id from employee e where  Not Exists (select campaign_employee_id from campaign where campaign_employee_id =e.employee_id);


Select * from free_employees;




# Counting all the donation items with their quantities that are available

select COUNT(*) as TOTAL_DONATIONS_AVAILABLE 
from donor d inner join donation do on d.donor_id=do.donation_donor_id where donation_status ='Received';
