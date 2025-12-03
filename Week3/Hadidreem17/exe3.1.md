# Exercise 3.1 – SQL Normalization  

## Dinner Club Database

# 1. Columns that violate First Normal Form (1NF)

In the original table, the following columns contain **multiple values inside a single cell**:

- `food_code`
- `food_description`

Examples:

C1, C2
Curry, Cake

P1, T1, M1
Pie, Tea, Mousse

yaml
Copy code

This violates **1NF**, which requires:

- Each cell must contain only **one atomic value**  
- No repeating groups or lists inside a single cell

> Note: The date column (`dinner_date`) has inconsistent formats, but this is a **data quality issue**, not a violation of 1NF (each cell still holds one date).


# 2. Entities Identified in the Table

The original table mixes multiple concepts. After analyzing it, we identify the following entities:

### Member

- member_id  
- member_name  
- member_address  

###  Venue

- venue_code  
- venue_description  

###  Food

- food_code  
- food_description  

###  Dinner 

- dinner_id  
- dinner_date  
- venue_code (each dinner happens at one venue)

###  DinnerMembers 

A **Many-to-Many** relationship between Members and Dinners.

###  DinnerFoods

A **Many-to-Many** relationship between Dinners and Foods.


# 3. 3NF-Compliant Table Structure

Below are all tables needed for a fully normalized **Third Normal Form (3NF)** database.


## 3.1 Members Table

```sql
CREATE TABLE Members (
    member_id INT PRIMARY KEY,
    member_name VARCHAR(100) NOT NULL,
    member_address VARCHAR(255) NOT NULL
);

Venues Table

CREATE TABLE Venues (
    venue_code VARCHAR(10) PRIMARY KEY,
    venue_description VARCHAR(100) NOT NULL
);

Foods Table

CREATE TABLE Foods (
    food_code VARCHAR(10) PRIMARY KEY,
    food_description VARCHAR(100) NOT NULL
);

Dinners Table

CREATE TABLE Dinners (
    dinner_id VARCHAR(20) PRIMARY KEY,
    dinner_date DATE NOT NULL,
    venue_code VARCHAR(10) NOT NULL,
    FOREIGN KEY (venue_code) REFERENCES Venues(venue_code)
);


DinnerMembers

CREATE TABLE DinnerMembers (
    dinner_id VARCHAR(20) NOT NULL,
    member_id INT NOT NULL,
    PRIMARY KEY (dinner_id, member_id),
    FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);


DinnerFoods Table

CREATE TABLE DinnerFoods (
    dinner_id VARCHAR(20) NOT NULL,
    food_code VARCHAR(10) NOT NULL,
    PRIMARY KEY (dinner_id, food_code),
    FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
    FOREIGN KEY (food_code) REFERENCES Foods(food_code)
);


Final 3NF Schema Overview

Members (1) ----< DinnerMembers >---- (M) Dinners

Dinners (1) ----< DinnerFoods >---- (M) Foods

Venues (1) ----< Dinners (M)

