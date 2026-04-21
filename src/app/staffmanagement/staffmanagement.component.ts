import { Component } from '@angular/core';

@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.css']
})
export class StaffmanagementComponent {
  staffList = [
    { id: 'S001', name: 'John', department: 'IT', role: 'Developer', email: 'john@gmail.com', status: 'Active' },
    { id: 'S002', name: 'Priya', department: 'HR', role: 'Manager', email: 'priya@gmail.com', status: 'Inactive' }
  ];

  filteredStaff = [...this.staffList];

  searchTerm = '';
  selectedDepartment = '';
  selectedRole = '';

  departments = ['IT', 'HR', 'Admin'];
  roles = ['Developer', 'Manager', 'Staff'];

  filterStaff() {
    this.filteredStaff = this.staffList.filter(s =>
      (this.searchTerm === '' || s.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedDepartment === '' || s.department === this.selectedDepartment) &&
      (this.selectedRole === '' || s.role === this.selectedRole)
    );
  }

  deleteStaff(id: string) {
    this.staffList = this.staffList.filter(s => s.id !== id);
    this.filterStaff();
  }

  editStaff(staff: any) {
    console.log('Edit:', staff);
  }

  openForm() {
    console.log('Open Add Staff Form');
  }

}
