# Car Wash Management System

A complete C++ program for managing a car wash queue system with customer management, service tracking, and revenue calculation.

## Features

✅ **Customer Management**
- Add customers to queue with names and service types
- Track customer information and service costs

✅ **Service Types & Pricing**
- Basic Wash - $20
- Wax + Dent Removing - $35  
- Vacuum + Polish - $40
- Full Package - $60

✅ **Queue Management**
- FIFO (First In, First Out) queue system
- Display current queue status
- Process customers in order

✅ **Revenue Tracking**
- Automatic cost calculation based on service type
- Total revenue accumulation
- Revenue summary display

✅ **File Output**
- Save daily reports to text file
- Include queue status and revenue data

## How to Run

### Option 1: Web Interface (Recommended - No Server Needed!)
**Simplest way - works immediately:**
1. **Double-click** `index.html` in the project folder
2. **Or open** `launch.html` for a nice launcher page
3. **Works in any browser** - no installation required!

### Option 2: C++ Console Application
**For command-line interface:**

#### Using g++ (MinGW):
```bash
g++ -o carwash.exe carwash.cpp
./carwash.exe
```

#### Using Visual Studio (cl):
```bash
cl carwash.cpp /Fe:carwash.exe
carwash.exe
```

#### Using gcc:
```bash
gcc -o carwash.exe carwash.cpp -lstdc++
./carwash.exe
```

### Option 3: Online Compiler (C++ only)
If you don't have a C++ compiler installed:
- [OnlineGDB](https://www.onlinegdb.com/)
- [Replit](https://replit.com/)
- [Programiz](https://www.programiz.com/cpp-programming/online-compiler/)

## Program Structure

### Classes

1. **Customer Class**
   - Stores customer name, service type, and cost
   - Constructor automatically calculates cost based on service type
   - `displayInfo()` method shows customer details

2. **CarWashSystem Class**
   - Manages the customer queue using `std::queue`
   - Tracks total revenue
   - Methods for adding customers, completing services, showing queue, and saving reports

### Main Menu Options

1. **Add Customer to Queue** - Add new customer with name and service selection
2. **Show Current Queue** - Display all waiting customers
3. **Complete Service** - Process the first customer in queue
4. **Show Revenue Summary** - Display total revenue earned
5. **Save Report to File** - Save current status to `carwash_report.txt`
6. **Exit** - Save final report and exit program

## Testing the Program

### Sample Test Cases:

1. **Add Multiple Customers:**
   - Add customer "John" with Basic Wash ($20)
   - Add customer "Sarah" with Full Package ($60)
   - Add customer "Mike" with Wax + Dent Removing ($35)

2. **Process Services:**
   - Complete service for John (should show $20 revenue)
   - Complete service for Sarah (should show $80 total revenue)

3. **Check Queue:**
   - Show queue should display Mike as the only remaining customer

4. **Save Report:**
   - Use option 5 to save current status to file

## File Output

The program creates `carwash_report.txt` with:
- Date and time stamp
- Total revenue earned (in dollars)
- Number of customers in queue
- List of remaining customers with their service details

## Requirements Checklist

- ✅ Customer class with name, service type, and cost
- ✅ Queue to manage bookings using `std::queue`
- ✅ Service menu with 4 different service types and charges
- ✅ Menu-driven interface with switch-case structure
- ✅ Total revenue tracker
- ✅ File output functionality
- ✅ Comprehensive comments and clean code
- ✅ Input validation and error handling
- ✅ Professional formatting and user-friendly interface

## Installation Requirements

To compile this program, you need a C++ compiler. Recommended options:

1. **MinGW-w64** (for g++)
2. **Visual Studio Community** (for cl)
3. **Dev-C++** (includes g++)
4. **Code::Blocks** (includes g++)

## Author

Hardik and Veronica - Car Wash Queue Management System 