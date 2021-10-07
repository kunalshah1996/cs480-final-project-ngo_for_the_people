Glossary

Entities :- 

Admin :
Admin manages the daily operations of the NGO such as creating an account for the employees,  registers donors and approves the cause. Admin can take incharge by logging in using the login credentials. 

  Primary key :  admin_id
  Other attributes : admin_name, admin_username , admin_password


Employee :
Synonym : Volunteer, Approver
Employees or volunteers help with fundraising, analyse the tasks and operations of the organisation, working on a campaign and supporting a cause. Volunteers also show their availability status for different dates.

  Primary key : e_id
  Other attributes : e_name, e_contact, e_address, e_designation, e_department, e_availability_status


Campaign :
Campaigns are fundraising elements for the organisation which restates the mission and help nonprofit donors in a meaningful way that leads them to give. Employees arrange the campaigns related to different departments and causes and work on bringing more funds to the organisation. Campaigns depend on causes and their types.

  Primary key : campaign_id
	Foreign key : e_id
	Other attributes : campaign_name, description, location, employee(poc), budget


Receiver  :
The main objective of the NGO is to feed the needy people(receiver). The organisation aims at qualifying the marginalised communities by doing best to ameliorate the situation. Any social cause can be brought up which gets approved by the admin and supported by the employee.

  Primary key : receiver_id
  Foreign key : cause_id
  Other attributes : receiver_ssn, receiver_name, receiver_phone, receiver_income, receiver_family, receiver_location


Education :
The organisation can play a major role as supporters with local school districts by providing them additional support via campaigns and funds. This sector can explore more into it by giving aid to many needy students. 

  Primary key : institution_id
  Foreign key : cause_id
  Other attributes : institution_name, need_type, need_quantity, poc_name, poc_phone


Health :
The main role of this department is to provide health advocacy to all the people who are in need. Provisional services include nursing and care, blood donations, surgeries and many more. It can take place through small events or the organisation can accommodate campaigns with the help of funds.

  Primary key : org_id
  Foreign key : cause_id
  Other attributes : org_name, need_type, need_quantity, poc_name, poc_phone


Donation :
Donations are the most important element. The donations received would be stored as funds and utilised for the campaigns and other events by the organisation. The donor and their corresponding identification number is stored. The type of donation is also stored and used. 

  Primary key : donation_id
  Foreign key : donor_id
  Other attributes : donation_type, status

Fund :
All the money donations are stored in the funds for further usage. The amount and sender and receiver identities and other related information are stored in this table. 

  Primary key : fund_id
  Foreign key  : donation_id
  Other attributes : amount, donor_id, status

Item :
All the other types of donations are tracked and stored in this table. The item table keeps a record of all donated items for instance meals, books, or any other commodity. This helps track all the distribution of goods to all the departments(causes) based on their type, status(delivered/in-transit) and quantity.

  Primary key : item_id
  Foreign_key : donation_id
  Other attributes : type, status, quantity

Donor :
They help in supporting and enhancing the ngo by making many ways in building levels and capacity to bridge the poor growth. Also, donors can help in building potential financial assistance, education and approvals.

  Primary key : donor_id
  Other attributes : donor_ssn,  donor_name, donor_phone

Cause :
Causes signify the various departments or fields that the NGO works for. For instance, for the current use-case, the departments - health and education have been considered. For each cause, their corresponding type, status are also recorded.

  Primary key : cause_id
  Foreign key : approver_id
  Other attributes : type, status
	
  
  
Entity Cardinality :
Admin creates and manages account for Employee - one to many 
Admin registers Donors - one to many
Admin approves the Cause - one to many
Employee works on campaign - many to many
Employee supports cause - many to many
Employee collects Donation - many to many
Donor makes Donation - many to many

Attribute Cardinality :

1. Attribute maximum

  a) Singular : 
      admin_name, admin_username, admin_password
      e_designation, e_availability
      donation_status
      campaign_name,  campaign_details, campaign_budget
      insitution_name, need_quantity
      cause_type, cause_status
      fund_amount, fund_status
      org_name
      item_quantity, item_status
      receiver_contact, receiver_name, receiver_income

  b) Plural :
      donor_name, donor_contact
      e_name, e_contact, e_address,  e_department
      donation_type
      campaign_location
      need_type, poc_name, poc_contact
      item_type
      receiver_family, receiver_location 

  c) Unique :
      admin_id
      campaign_id
      e_id
      cause_id
      donation_id
      donor_id
      donor_ssn
      institution_id
      fund_id
      org_id
      item_id
      receiver_ssn

2. Attribute minimum

  a) Required :
      admin_id
      campaign_id
      e_id
      cause_id
      donation_id
      donor_id
      institution_id
      fund_id
      org_id
      item_id

  b) Optional (grouping based on entities) :
      receiver_family
      e_availability





