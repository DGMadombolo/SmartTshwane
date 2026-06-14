-- ==========================================
-- SmartTshwane Database Schema
-- PostgreSQL
-- ==========================================

-- Drop tables if they already exist
DROP TABLE IF EXISTS Notifications CASCADE;
DROP TABLE IF EXISTS ServiceRequests CASCADE;
DROP TABLE IF EXISTS Statuses CASCADE;
DROP TABLE IF EXISTS Categories CASCADE;
DROP TABLE IF EXISTS Departments CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

-- ==========================================
-- Users
-- ==========================================

CREATE TABLE Users (
UserId SERIAL PRIMARY KEY,
FirstName VARCHAR(100) NOT NULL,
LastName VARCHAR(100) NOT NULL,
Email VARCHAR(255) UNIQUE NOT NULL,
PhoneNumber VARCHAR(20),
PasswordHash TEXT NOT NULL,
Role VARCHAR(50) NOT NULL DEFAULT 'Citizen',
CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Departments
-- ==========================================

CREATE TABLE Departments (
DepartmentId SERIAL PRIMARY KEY,
DepartmentName VARCHAR(100) NOT NULL,
Description TEXT
);

-- ==========================================
-- Categories
-- ==========================================

CREATE TABLE Categories (
CategoryId SERIAL PRIMARY KEY,
CategoryName VARCHAR(100) NOT NULL,
DepartmentId INT NOT NULL,

```
CONSTRAINT FK_Category_Department
    FOREIGN KEY (DepartmentId)
    REFERENCES Departments(DepartmentId)
    ON DELETE CASCADE
```

);

-- ==========================================
-- Statuses
-- ==========================================

CREATE TABLE Statuses (
StatusId SERIAL PRIMARY KEY,
StatusName VARCHAR(50) NOT NULL UNIQUE
);

-- ==========================================
-- Service Requests
-- ==========================================

CREATE TABLE ServiceRequests (
RequestId SERIAL PRIMARY KEY,

```
UserId INT NOT NULL,
CategoryId INT NOT NULL,
StatusId INT NOT NULL,

Title VARCHAR(255) NOT NULL,
Description TEXT NOT NULL,

Address TEXT,

Latitude DECIMAL(10,8),
Longitude DECIMAL(11,8),

CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT FK_Request_User
    FOREIGN KEY (UserId)
    REFERENCES Users(UserId),

CONSTRAINT FK_Request_Category
    FOREIGN KEY (CategoryId)
    REFERENCES Categories(CategoryId),

CONSTRAINT FK_Request_Status
    FOREIGN KEY (StatusId)
    REFERENCES Statuses(StatusId)
```

);

-- ==========================================
-- Notifications
-- ==========================================

CREATE TABLE Notifications (
NotificationId SERIAL PRIMARY KEY,

```
UserId INT NOT NULL,

Message TEXT NOT NULL,

IsRead BOOLEAN DEFAULT FALSE,

CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT FK_Notification_User
    FOREIGN KEY (UserId)
    REFERENCES Users(UserId)
    ON DELETE CASCADE
```

);

-- ==========================================
-- Seed Data
-- ==========================================

INSERT INTO Statuses (StatusName)
VALUES
('Pending'),
('In Progress'),
('Resolved'),
('Rejected');

INSERT INTO Departments (DepartmentName, Description)
VALUES
('Roads', 'Road maintenance and pothole repairs'),
('Water & Sanitation', 'Water leaks and sanitation issues'),
('Electricity', 'Power outages and street lights'),
('Waste Management', 'Garbage collection and illegal dumping'),
('Parks & Recreation', 'Public parks and recreational facilities');

-- ==========================================
-- End of SmartTshwane Schema
-- ==========================================
