// Car Wash Management System - Frontend JavaScript

// Global variables to store data
let customers = [];
let totalRevenue = 0;
let customersServed = 0;

// Service types and their costs
const serviceTypes = {
    1: { name: "Basic Wash", cost: 20 },
    2: { name: "Wax + Dent Removing", cost: 35 },
    3: { name: "Vacuum + Polish", cost: 40 },
    4: { name: "Full Package", cost: 60 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateDisplay();
    setupEventListeners();
});

// Load data from localStorage
function loadData() {
    const savedCustomers = localStorage.getItem('carWashCustomers');
    const savedRevenue = localStorage.getItem('carWashRevenue');
    const savedServed = localStorage.getItem('carWashServed');
    
    if (savedCustomers) {
        customers = JSON.parse(savedCustomers);
    }
    if (savedRevenue) {
        totalRevenue = parseFloat(savedRevenue);
    }
    if (savedServed) {
        customersServed = parseInt(savedServed);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('carWashCustomers', JSON.stringify(customers));
    localStorage.setItem('carWashRevenue', totalRevenue.toString());
    localStorage.setItem('carWashServed', customersServed.toString());
}

// Setup event listeners
function setupEventListeners() {
    // Add customer form submission
    document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addCustomer();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('addCustomerModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Show add customer modal
function showAddCustomerModal() {
    document.getElementById('addCustomerModal').style.display = 'block';
    document.getElementById('customerName').focus();
}

// Close modal
function closeModal() {
    document.getElementById('addCustomerModal').style.display = 'none';
    document.getElementById('addCustomerForm').reset();
}

// Add new customer
function addCustomer() {
    const name = document.getElementById('customerName').value.trim();
    const serviceType = parseInt(document.getElementById('serviceType').value);
    
    if (!name || !serviceType) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    const customer = {
        id: Date.now(),
        name: name,
        serviceType: serviceType,
        serviceCost: serviceTypes[serviceType].cost,
        addedAt: new Date().toISOString()
    };
    
    customers.push(customer);
    saveData();
    updateDisplay();
    closeModal();
    
    showToast(`Customer ${name} added to queue!`, 'success');
}

// Complete service for the first customer
function completeService() {
    if (customers.length === 0) {
        showToast('No customers in queue!', 'error');
        return;
    }
    
    const customer = customers.shift();
    totalRevenue += customer.serviceCost;
    customersServed++;
    
    saveData();
    updateDisplay();
    
    showToast(`Service completed for ${customer.name}! Revenue: $${customer.serviceCost}`, 'success');
}

// Refresh queue display
function refreshQueue() {
    updateDisplay();
    showToast('Queue refreshed!', 'info');
}

// Update all displays
function updateDisplay() {
    updateStats();
    updateQueueDisplay();
}

// Update statistics
function updateStats() {
    document.getElementById('queueCount').textContent = customers.length;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('customersServed').textContent = customersServed;
}

// Update queue display
function updateQueueDisplay() {
    const container = document.getElementById('queueContainer');
    
    if (customers.length === 0) {
        container.innerHTML = `
            <div class="empty-queue">
                <i class="fas fa-inbox"></i>
                <p>No customers in queue</p>
            </div>
        `;
        return;
    }
    
    let queueHTML = '';
    customers.forEach((customer, index) => {
        const serviceInfo = serviceTypes[customer.serviceType];
        queueHTML += `
            <div class="customer-card">
                <div class="customer-info">
                    <h4>${customer.name}</h4>
                    <p>Service: ${serviceInfo.name}</p>
                    <p>Added: ${new Date(customer.addedAt).toLocaleTimeString()}</p>
                </div>
                <div class="customer-cost">
                    $${customer.serviceCost}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = queueHTML;
}

// Download report
function downloadReport() {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carwash_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Report downloaded!', 'success');
}

// Generate report content
function generateReport() {
    const now = new Date();
    let report = `=== CAR WASH MANAGEMENT SYSTEM REPORT ===\n`;
    report += `Date: ${now.toLocaleDateString()}\n`;
    report += `Time: ${now.toLocaleTimeString()}\n`;
    report += `----------------------------------------\n`;
    report += `Total Revenue: $${totalRevenue.toFixed(2)}\n`;
    report += `Customers Served: ${customersServed}\n`;
    report += `Customers in Queue: ${customers.length}\n`;
    report += `----------------------------------------\n`;
    
    if (customers.length > 0) {
        report += `Remaining customers in queue:\n`;
        customers.forEach((customer, index) => {
            const serviceInfo = serviceTypes[customer.serviceType];
            report += `${index + 1}. ${customer.name} - ${serviceInfo.name} - $${customer.serviceCost}\n`;
        });
    }
    
    return report;
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Reset revenue to zero
function resetRevenue() {
    if (confirm('Are you sure you want to reset the total revenue and customers served to zero? This action cannot be undone.')) {
        totalRevenue = 0;
        customersServed = 0;
        saveData();
        updateDisplay();
        showToast('Revenue and customers served reset to zero!', 'success');
    }
}

// Clear all data (for testing)
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        customers = [];
        totalRevenue = 0;
        customersServed = 0;
        localStorage.clear();
        updateDisplay();
        showToast('All data cleared!', 'info');
    }
}

// Export data for backup
function exportData() {
    const data = {
        customers: customers,
        totalRevenue: totalRevenue,
        customersServed: customersServed,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carwash_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', 'success');
}

// Import data from backup
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    customers = data.customers || [];
                    totalRevenue = data.totalRevenue || 0;
                    customersServed = data.customersServed || 0;
                    saveData();
                    updateDisplay();
                    showToast('Data imported successfully!', 'success');
                } catch (error) {
                    showToast('Invalid backup file!', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N to add customer
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showAddCustomerModal();
    }
    
    // Ctrl/Cmd + Enter to complete service
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        completeService();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add some sample data for demonstration (remove in production)
// function addSampleData() {
//     if (customers.length === 0) {
//         const sampleCustomers = [
//             { name: "John Smith", serviceType: 1 },
//             { name: "Sarah Johnson", serviceType: 4 },
//             { name: "Mike Wilson", serviceType: 2 },
//             { name: "Emily Davis", serviceType: 3 }
//         ];
        
//         sampleCustomers.forEach(customer => {
//             const newCustomer = {
//                 id: Date.now() + Math.random(),
//                 name: customer.name,
//                 serviceType: customer.serviceType,
//                 serviceCost: serviceTypes[customer.serviceType].cost,
//                 addedAt: new Date().toISOString()
//             };
//             customers.push(newCustomer);
//         });
        
//         saveData();
//         updateDisplay();
//         showToast('Sample data added!', 'info');
//     }
// }

// Auto-save every 30 seconds
setInterval(saveData, 30000);

// Add sample data button (for demo purposes)
// Uncomment the next line to add a demo button
// addSampleData(); 