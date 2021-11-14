Stored Procedures


#Calculate the total amount fund with a received status
CREATE DEFINER=`root`@`localhost` PROCEDURE `Active_Fund`()
BEGIN
Select sum(F.fund_amount) as TOTAL_FUND_ALLOCATION
FROM fund F
INNER JOIN donation D ON F.fund_donation_id = D.donation_id
WHERE D.donation_status = 'Received';
END


#Calculating the total number of campaigns under each employee
CREATE DEFINER=`root`@`localhost` PROCEDURE `campaigns_under_employee`()
BEGIN
Select campaign_employee_id,count(campaign_id) as no_of_campaigns from campaign group by campaign_employee_id;
END


#Calculating the total number of donations per donor
CREATE DEFINER=`root`@`localhost` PROCEDURE `donations_per_donor`()
BEGIN
Select d.donor_id,d.donor_name,count(don.donation_id) as no_of_donations from donation don inner join donor d on d.donor_id=don.donation_donor_id group by d.donor_id;  
END


#Calculate the total number of active causes :
CREATE DEFINER=`root`@`localhost` PROCEDURE `active_causes_count`()
BEGIN
select count(cause_id),cause_type from cause where  cause_status = 'Active' group by cause_id ;
END 






Functions


#Calculate the total number of years a person has been employed for
CREATE DEFINER=`root`@`localhost` FUNCTION `No_of_year_employed`(date1 date) RETURNS int
    DETERMINISTIC
BEGIN
        DECLARE date2 DATE;
        Select current_date()into date2;
        RETURN year(date2)-year(date1);
END




#Calculate the total number of items collected :
CREATE DEFINER=`root`@`localhost` FUNCTION `No_of_items_collected`(item_quantity int) RETURNS int
    DETERMINISTIC
BEGIN
        DECLARE total INT ;
        
        SELECT SUM(item_quantity)
        INTO total 
        FROM item
        
        RETURN total ; 
END


#Calculate the total funds collected: 


CREATE DEFINER=`root`@`localhost` FUNCTION `funds_received`() RETURNS int
    DETERMINISTIC
BEGIN
        Declare  total_fund int;


        Select Sum(fund_amount)
        into total_fund
        from fund;


        RETURN total_fund ;
END


#Calculate the total number of employees:


CREATE DEFINER=`root`@`localhost` FUNCTION `no_of_employees`() RETURNS int
    DETERMINISTIC
BEGIN
declare total int;
select count(employee_id)
into total
from employee;
RETURN total;
END