﻿create database ngo_for_the_people;
use ngo_for_the_people;




DROP TABLE IF EXISTS `users`;


CREATE TABLE users( id int  AUTO_INCREMENT,username varchar(255),email varchar(255) ,password varchar(255), PRIMARY KEY (id));


create index users_index on users(username);


INSERT INTO users (`id`,`username`,`email`,`password`) VALUES (1,'Kunal Shah','kshah220@uic.edu','12345');
INSERT INTO users (`id`,`username`,`email`,`password`) VALUES (2,'Samruddhi Kalsekar','skalse2@uic.edu','12345');
INSERT INTO users (`id`,`username`,`email`,`password`) VALUES (3,'Anjani Sruti Doradla','adorad4@uic.edu','12345');
INSERT INTO users (`id`,`username`,`email`,`password`) VALUES (4,'Nikita Thakur','nthaku3@uic.edu','12345');
INSERT INTO users (`id`,`username`,`email`,`password`) VALUES (5,'Diana Diaz','dmdh@uic.edu','12345');


 
 


DROP TABLE IF EXISTS `employee`;


create table employee(employee_id int , employee_name VARCHAR(40) NOT NULL, employee_contact int NOT NULL, employee_address VARCHAR(80), employee_designation VARCHAR(40), employee_department VARCHAR(40), employee_availability VARCHAR(40), employee_doj DATE, PRIMARY KEY(employee_id));


create index employee_index on employee(employee_name);


INSERT INTO employee (`employee_id`,`employee_name`,`employee_contact`,`employee_address`,`employee_designation`,`employee_department`,`employee_availability`,`employee_doj`) VALUES (211,'Chrisitna George',235467890,'3122 Taylor Street, Chicago,IL','Administrative Manager','Administration','unavailable','2017-02-27');
INSERT INTO employee (`employee_id`,`employee_name`,`employee_contact`,`employee_address`,`employee_designation`,`employee_department`,`employee_availability`,`employee_doj`) VALUES (212,'John Doe',123456789,'3321 W Laflin St, Chicago,IL','Campaign Manager','Campaign','available','2020-02-01');
INSERT INTO employee (`employee_id`,`employee_name`,`employee_contact`,`employee_address`,`employee_designation`,`employee_department`,`employee_availability`,`employee_doj`) VALUES (213,'Layla Paul',234567890,'1131 W Taylor Street','Executive Manager','Campaign','unavailable','2017-04-21');
INSERT INTO employee (`employee_id`,`employee_name`,`employee_contact`,`employee_address`,`employee_designation`,`employee_department`,`employee_availability`,`employee_doj`) VALUES (214,'Neha Rodrigues',123457689,'2786 South Street, NYC, NY','Director','Board of Directors','available','2018-02-01');
INSERT INTO employee (`employee_id`,`employee_name`,`employee_contact`,`employee_address`,`employee_designation`,`employee_department`,`employee_availability`,`employee_doj`) VALUES (215,'Jane Young',238793472,'1018 S Oakley Blvd','Consultant','Public Relations','unavailable','2019-03-07');






DROP TABLE IF EXISTS `donor`;


create table donor(donor_id int, donor_ssn VARCHAR(9)  NOT NULL, donor_name VARCHAR(50), donor_contact int NOT NULL, UNIQUE(donor_id, donor_ssn), PRIMARY KEY(donor_id));


create index donor_index on donor(donor_name);


INSERT INTO donor (`donor_id`,`donor_ssn`,`donor_name`,`donor_contact`) VALUES (10,'123456789','Jason Dsouza',3123831);
INSERT INTO donor (`donor_id`,`donor_ssn`,`donor_name`,`donor_contact`) VALUES (12,'123456987','Harsh Jethwani',3123835);
INSERT INTO donor (`donor_id`,`donor_ssn`,`donor_name`,`donor_contact`) VALUES (13,'123456879','Mehul Gupta',3137890);
INSERT INTO donor (`donor_id`,`donor_ssn`,`donor_name`,`donor_contact`) VALUES (14,'123456978','Vedant Maheshwari',3123234);
INSERT INTO donor (`donor_id`,`donor_ssn`,`donor_name`,`donor_contact`) VALUES (15,'123459876','Aakash Gupta',3123889);
INSERT INTO donor (`donor_id`,`donor_ssn`,`donor_name`,`donor_contact`) VALUES (16,'123339876','Jane Depaul',3124889);




  


DROP TABLE IF EXISTS `cause`;


create table cause (cause_id int NOT NULL primary key, cause_type VARCHAR(80),cause_status VARCHAR(60),approver_id int , FOREIGN KEY (approver_id) REFERENCES employee(employee_id) ON DELETE CASCADE ON UPDATE CASCADE);


create index cause_index on cause(cause_status);


INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (1,'Receiver','active',212);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (2,'Receiver','active',212);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (3,'Receiver','complete',213);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (4,'Receiver','active',214);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (5,'Receiver','inactive',214);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (6,'Education','active',215);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (7,'Education','complete',212);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (8,'Education','active',212);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (9,'Education','inactive',211);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (10,'Education','complete',214);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (11,'Health','complete',214);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (12,'Health','active',213);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (13,'Health','complete',213);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (14,'Health','complete',215);
INSERT INTO cause (`cause_id`,`cause_type`,`cause_status`,`approver_id`) VALUES (15,'Health','complete',212);










DROP TABLE IF EXISTS `health`;


create table health ( cause_id int primary key, org_name VARCHAR(40), need_type VARCHAR(40), need_quantity int , poc_name VARCHAR(40), poc_contact int NOT NULL,FOREIGN KEY (cause_id) REFERENCES cause(cause_id) ON DELETE CASCADE ON UPDATE CASCADE);


create index health_index on health(org_name);


INSERT INTO health (`cause_id`,`org_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (11,'Methodist Hospital of Chicago','Fund',3000,'Karen Diaz',1876187262);
INSERT INTO health (`cause_id`,`org_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (12,'Kindred Chicago Central Hospital','Fund',2000,'Stanley Hudson',1827398723);
INSERT INTO health (`cause_id`,`org_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (13,'Mount Sinai Hospital','Bed Sheets',600,'Michael Scott',1897389217);
INSERT INTO health (`cause_id`,`org_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (14,'Mercy Hospital & Medical Center','Fund',4000,'Toby Flenderson',1817238971);
INSERT INTO health (`cause_id`,`org_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (15,'La Rabida Children Hospital','Toys',5400,'Rachel Green',187829722);










DROP TABLE IF EXISTS `education`;


create table education ( cause_id int, institution_name VARCHAR(40), need_type VARCHAR(40), need_quantity int , poc_name VARCHAR(40), poc_contact int NOT NULL, PRIMARY KEY (cause_id), FOREIGN KEY (cause_id) REFERENCES cause(cause_id)ON DELETE CASCADE ON UPDATE CASCADE);


create index education_index on education(institution_name);


INSERT INTO education (`cause_id`,`institution_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (6,'Dyett High School','Desks',600,'Angela Kinsley',1289876651);
INSERT INTO education (`cause_id`,`institution_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (7,'Benito Juarez Community Academy','Laptops',40,'Ryan Howard',1928922221);
INSERT INTO education (`cause_id`,`institution_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (8,'Roosevelt High School','English Tutor',1,'Jim Halpert',1782737676);
INSERT INTO education (`cause_id`,`institution_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (9,'Gage Park High School','Desks',200,'Dwight Schrute',1834792384);
INSERT INTO education (`cause_id`,`institution_name`,`need_type`,`need_quantity`,`poc_name`,`poc_contact`) VALUES (10,'Mather High School','Notebooks',2000,'Pamela Beesley',1796239228);








DROP TABLE IF EXISTS `campaign`;


create table campaign( campaign_id INT Primary Key, campaign_name varchar(100) not null, campaign_details varchar(1000), campaign_location varchar(50) not null, campaign_employee_id int, campaign_budget int not null, foreign key(employee_id) references employee(employee_id));


create index campaign_index on campaign(campaign_name);


INSERT into campaign values(1,'Save the Children','The organization shares a newsletter as well as updates our website, informing its users about our programs that reach out to help vulnerable children, number of lives impacted, how the donations have been utilized, etc.Additionally, the communication action is used to encourage the user to make a donation.','Chicago',211,55000);


INSERT into campaign values(3,'A Moment of Dyslexia','A Moment of Dyslexia shows people what it is really like to be dyslexic','Online',213,6000);


INSERT into campaign values(2,'Unmute,Ask Him (Movember)','ask Him encourages people talk about men mental health','Online',212,5000);


INSERT into campaign values(4,'Take Off the Tape','Anxiety is a topic that is worthy of a conversation because a large part of the problem is the shame associated with it','Chicago',214,10000);


INSERT into campaign values(5,'Blood Donation','Conducts Blood Donation drives across university campuses and corporate offices for the needy.','NYC',215,6000);








DROP TABLE IF EXISTS `donation`;


create table donation(donation_id INT, donation_donor_id int, donation_type VARCHAR(40), donation_status VARCHAR(40) NOT NULL,foreign key(donation_donor_id) references donor(donor_id),PRIMARY KEY(donation_id));


create index donation_index on donation(donation_status);
INSERT INTO donation (`donation_id`,`donation_donor_id`,`donation_type`,`donation_status`) VALUES (10,10,'Fund','Received');
INSERT INTO donation (`donation_id`,`donation_donor_id`,`donation_type`,`donation_status`) VALUES (12,12,'Fund','Received');
INSERT INTO donation (`donation_id`,`donation_donor_id`,`donation_type`,`donation_status`) VALUES (13,13,'Clothes','Received');
INSERT INTO donation (`donation_id`,`donation_donor_id`,`donation_type`,`donation_status`) VALUES (14,14,'Books','Received');
INSERT INTO donation (`donation_id`,`donation_donor_id`,`donation_type`,`donation_status`) VALUES (15,15,'Food','Not_Received');
INSERT INTO donation (`donation_id`,`donation_donor_id`,`donation_type`,`donation_status`) VALUES (16,16,'Fund','Not_Received');








DROP TABLE IF EXISTS `receiver`;


create table receiver(cause_id INT PRIMARY KEY,receiver_ssn INT NOT NULL,
receiver_name VARCHAR(50) NOT NULL,receiver_contact VARCHAR(20) NOT NULL,receiver_income INT NOT NULL,receiver_family VARCHAR(20) NOT NULL,
receiver_location VARCHAR(20) NOT NULL,FOREIGN KEY (cause_id) REFERENCES cause(cause_id) ON DELETE CASCADE ON UPDATE CASCADE);


create index receiver_index on receiver(receiver_name);


INSERT INTO receiver (`cause_id`,`receiver_ssn`,`receiver_name`,`receiver_contact`,`receiver_income`,`receiver_family`,`receiver_location`) VALUES (1,121213123,'Daniela Prado','1837349371',2000,'Rodrigo Prado','Chicago');
INSERT INTO receiver (`cause_id`,`receiver_ssn`,`receiver_name`,`receiver_contact`,`receiver_income`,`receiver_family`,`receiver_location`) VALUES (2,147394342,'Eric Jagoring','1128748222',5000,'Joanna Jagoring','Atlanta');
INSERT INTO receiver (`cause_id`,`receiver_ssn`,`receiver_name`,`receiver_contact`,`receiver_income`,`receiver_family`,`receiver_location`) VALUES (3,198173812,'Amy Nobles','1253678207',4000,'Andrea Nobles','Urbana Champaign');
INSERT INTO receiver (`cause_id`,`receiver_ssn`,`receiver_name`,`receiver_contact`,`receiver_income`,`receiver_family`,`receiver_location`) VALUES (4,137826378,'Daniel Ganderton','1263786123',4500,'Jada Ganderton','Aurora');
INSERT INTO receiver (`cause_id`,`receiver_ssn`,`receiver_name`,`receiver_contact`,`receiver_income`,`receiver_family`,`receiver_location`) VALUES (5,128278229,'Gabriela Fring','1762889652',3000,'Gustavo Fring','Albuquerque');








DROP TABLE IF EXISTS `fund`;


create table fund(fund_donation_id int, foreign key(fund_donation_id) references donation(donation_id),fund_donor_id int, foreign key(fund_donor_id) references donor(donor_id),fund_amount INT NOT NULL, fund_status VARCHAR(20), PRIMARY KEY(fund_donation_id));


create index fund_index on fund(fund_status);


INSERT INTO fund (`fund_donation_id`,`fund_donor_id`,`fund_amount`,`fund_status`) VALUES (10,10,100,'Allocated');
INSERT INTO fund (`fund_donation_id`,`fund_donor_id`,`fund_amount`,`fund_status`) VALUES (12,12,500,'Allocated');






DROP TABLE IF EXISTS `item`;


create table item(donation_id INT PRIMARY KEY,item_type VARCHAR(50) NOT NULL,
item_quantity INT NOT NULL,item_status VARCHAR(20) NOT NULL,FOREIGN KEY (donation_id) REFERENCES donation(donation_id) );


create index item_index on item(item_type);


INSERT INTO item (`donation_id`,`item_type`,`item_quantity`,`item_status`) VALUES (13,'Food',5000,'Available');
INSERT INTO item (`donation_id`,`item_type`,`item_quantity`,`item_status`) VALUES (14,'Clothes',300,'Available');
INSERT INTO item (`donation_id`,`item_type`,`item_quantity`,`item_status`) VALUES (15,'Clothes',2400,'Allocated');