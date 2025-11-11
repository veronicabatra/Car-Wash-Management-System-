
#include <iostream>
#include <string>
#include <queue>
#include <fstream>
#include <iomanip>
using namespace std;

// Customer class to store customer information
class Customer {
private:
    string name;
    int serviceType;
    float serviceCost;

public:
    // Constructor to initialize customer data
    Customer(string n, int type) {
        name = n;
        serviceType = type;
        
        // Set cost based on service type
        switch(type) {
            case 1: serviceCost = 20.0f; break;
            case 2: serviceCost = 35.0f; break;
            case 3: serviceCost = 40.0f; break;   
            case 4: serviceCost = 60.0f; break;  
            default: serviceCost = 0.0f; break;
        }
    }
    
    // Getter methods
    string getName() { return name; }
    int getServiceType() { return serviceType; }
    float getServiceCost() { return serviceCost; }
    
    // Method to display customer information
    void displayInfo() {
        string serviceName;
        switch(serviceType) {
            case 1: serviceName = "Basic Wash"; break;
            case 2: serviceName = "Wax + Dent Removing"; break;
            case 3: serviceName = "Vacuum + Polish"; break;
            case 4: serviceName = "Full Package"; break;
            default: serviceName = "Invalid Service"; break;
        }
        
        cout << "Name: " << name << " | Service: " << serviceName 
            << " | Cost: $" << fixed << setprecision(2) << serviceCost << endl;
    }
};

// CarWashSystem class to manage the queue and operations
class CarWashSystem {
private:
    queue<Customer> customerQueue;
    float totalRevenue;

public:
    // Constructor
    CarWashSystem() {
        totalRevenue = 0.0f;
    }
    
    // Add customer to queue
    void addCustomer() {
        string name;
        int serviceType;
        
        cout << "\n=== ADD NEW CUSTOMER ===" << endl;
        cout << "Enter customer name: ";
        cin.ignore(); // Clearing the input buffer
        getline(cin, name);
        
        cout << "\nSelect service type:" << endl;
        cout << "1. Basic Wash - $20" << endl;
        cout << "2. Wax + Dent Removing - $35" << endl;
        cout << "3. Vacuum + Polish - $40" << endl;
        cout << "4. Full Package - $60" << endl;
        cout << "Enter choice (1-4): ";
        cin >> serviceType;
        
        // Validate service type
        if(serviceType < 1 || serviceType > 4) {
            cout << "Invalid service type! Please try again." << endl;
            return;
        }
        
        // Create customer and add to queue
        Customer newCustomer(name, serviceType);
        customerQueue.push(newCustomer);
        
        cout << "\n Customer added successfully to queue!" << endl;
        cout << "Queue position: " << customerQueue.size() << endl;
    }
    
    // Complete service for the first customer in queue
    void completeService() {
        if(customerQueue.empty()) {
            cout << "\n No customers in queue!!" << endl;
            return;
        }
        
        Customer currentCustomer = customerQueue.front();
        cout << "\n=== COMPLETING SERVICE ===" << endl;
        cout << "Processing customer: ";
        currentCustomer.displayInfo();
        
        // Add cost to revenue and remove from queue
        totalRevenue += currentCustomer.getServiceCost();
        customerQueue.pop();
        
        cout << " Service completed! Customer removed from queue." << endl;
        cout << "Total revenue: $" << fixed << setprecision(2) << totalRevenue << endl;
    }
    
    // Show current queue
    void showQueue() {
        if(customerQueue.empty()) {
            cout << "\n Queue is empty!" << endl;
            return;
        }
        
        cout << "\n=== CURRENT QUEUE ===" << endl;
        cout << "Total customers waiting: " << customerQueue.size() << endl;
        cout << "----------------------------------------" << endl;
        
        // Create a temporary queue to display without removing customers
        queue<Customer> tempQueue = customerQueue;
        int position = 1;
        
        while(!tempQueue.empty()) {
            Customer customer = tempQueue.front();
            cout << position << ". ";
            customer.displayInfo();
            tempQueue.pop();
            position++;
        }
        cout << "----------------------------------------" << endl;
    }
    
    // Show total revenue
    void showRevenue() {
        cout << "\n=== REVENUE SUMMARY ===" << endl;
        cout << "Total Revenue: $" << fixed << setprecision(2) << totalRevenue << endl;
        cout << "Customers served: " << (totalRevenue > 0 ? "At least 1" : "0") << endl;
    }
    
    // Save report to file
    void saveReport() {
        ofstream file("carwash_report.txt");
        if(file.is_open()) {
            file << "=== CAR WASH MANAGEMENT SYSTEM REPORT ===" << endl;
            file << "Date: " << __DATE__ << " Time: " << __TIME__ << endl;
            file << "----------------------------------------" << endl;
            file << "Total Revenue: $" << fixed << setprecision(2) << totalRevenue << endl;
            file << "Customers in queue: " << customerQueue.size() << endl;
            file << "----------------------------------------" << endl;
            
            if(!customerQueue.empty()) {
                file << "Remaining customers in queue:" << endl;
                queue<Customer> tempQueue = customerQueue;
                int position = 1;
                
                while(!tempQueue.empty()) {
                    Customer customer = tempQueue.front();
                    file << position << ". " << customer.getName() 
                         << " - Service Type: " << customer.getServiceType()
                         << " - Cost: $" << customer.getServiceCost() << endl;
                    tempQueue.pop();
                    position++;
                }
            }
            
            file.close();
            cout << "\n Report saved to 'carwash_report.txt'" << endl;
        } else {
            cout << "\n Error saving report!" << endl;
        }
    }
};

// Main function with menu-driven interface
int main() {
    CarWashSystem carWash;
    int choice;
    
    cout << "=== CAR WASH MANAGEMENT SYSTEM ===" << endl;
    cout << "Welcome to the Car Wash Queue Manager!" << endl;
    
    while(true) {
        cout << "\n=== MAIN MENU ===" << endl;
        cout << "1. Add Customer to Queue" << endl;
        cout << "2. Show Current Queue" << endl;
        cout << "3. Complete Service (Process First Customer)" << endl;
        cout << "4. Show Revenue Summary" << endl;
        cout << "5. Save Report to File" << endl;
        cout << "6. Exit" << endl;
        cout << "Enter your choice (1-6): ";
        cin >> choice;
        
        switch(choice) {
            case 1:
                carWash.addCustomer();
                break;
                
            case 2:
                carWash.showQueue();
                break;
                
            case 3:
                carWash.completeService();
                break;
                
            case 4:
                carWash.showRevenue();
                break;
                
            case 5:
                carWash.saveReport();
                break;
                
            case 6:
                cout << "\n=== EXITING SYSTEM ===" << endl;
                cout << "Saving final report..." << endl;
                carWash.saveReport();
                cout << "Thank you for using Car Wash Management System!" << endl;
                exit(0);
                
            default:
                cout << "\n Invalid choice! Please enter 1-6." << endl;
                break;
        }
    }
    
    return 0;
}
