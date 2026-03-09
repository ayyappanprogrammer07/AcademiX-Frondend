import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Student {
  id: number;
  name: string;
  email: string;
  rollNo: string;
  class: string;
  section: string;
  gender: string;
  phone: string;
  status: string;
  bloodGroup: string;
  dob: string;
  address: string;
  admissionDate: string;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  degree: string;
  department: string;
  year: string;
  
}

@Component({
  selector: 'app-studentmanagement',
  templateUrl: './studentmanagement.component.html',
  styleUrls: ['./studentmanagement.component.css']
})
export class StudentmanagementComponent implements OnInit {
  form!:FormGroup;

  students: Student[] = [
    { id: 1, name: 'Arun Kumar', email: 'arun@mail.com', rollNo: 'R001', class: '10', section: 'A', gender: 'Male', phone: '9876543210', status: 'Active', bloodGroup: 'O+', dob: '2005-04-12', address: '12 Main St, Chennai', admissionDate: '2022-06-01', fatherName: 'Raj Kumar', motherName: 'Meena Kumar', parentPhone: '9876500001', degree: 'BE', department: 'CS', year: '1' },
    { id: 2, name: 'Priya Sharma', email: 'priya@mail.com', rollNo: 'R002', class: '10', section: 'A', gender: 'Female', phone: '9876543211', status: 'Active', bloodGroup: 'A+', dob: '2005-07-22', address: '45 Park Ave, Chennai', admissionDate: '2022-06-01', fatherName: 'Suresh Sharma', motherName: 'Latha Sharma', parentPhone: '9876500002', degree: 'BSc', department: 'CS', year: '2' },
    { id: 3, name: 'Vikram Singh', email: 'vikram@mail.com', rollNo: 'R003', class: '11', section: 'B', gender: 'Male', phone: '9876543212', status: 'Active', bloodGroup: 'B+', dob: '2004-11-05', address: '78 Lake Road, Chennai', admissionDate: '2021-06-01', fatherName: 'Rajan Singh', motherName: 'Kavitha Singh', parentPhone: '9876500003', degree: 'BE', department: 'Mechanical', year: '3' },
    { id: 4, name: 'Divya Nair', email: 'divya@mail.com', rollNo: 'R004', class: '11', section: 'A', gender: 'Female', phone: '9876543213', status: 'Inactive', bloodGroup: 'AB+', dob: '2004-03-18', address: '23 Hill St, Chennai', admissionDate: '2021-06-01', fatherName: 'Mohan Nair', motherName: 'Suja Nair', parentPhone: '9876500004', degree: 'MSc', department: 'CS', year: '1' },
    { id: 5, name: 'Karthik Raj', email: 'karthik@mail.com', rollNo: 'R005', class: '12', section: 'D', gender: 'Male', phone: '9876543214', status: 'Active', bloodGroup: 'O-', dob: '2003-09-30', address: '56 River Rd, Chennai', admissionDate: '2020-06-01', fatherName: 'Selvam Raj', motherName: 'Geetha Raj', parentPhone: '9876500005', degree: 'BE', department: 'Mechanical', year: '4' },
    { id: 6, name: 'Sneha Reddy', email: 'sneha@mail.com', rollNo: 'R006', class: '12', section: 'B', gender: 'Female', phone: '9876543215', status: 'Active', bloodGroup: 'A-', dob: '2003-01-14', address: '90 Cross St, Chennai', admissionDate: '2020-06-01', fatherName: 'Venkat Reddy', motherName: 'Padma Reddy', parentPhone: '9876500006', degree: 'BSc', department: 'CS', year: '2' },
  ];

  filteredStudents: Student[] = [];
  searchTerm = '';
  selectedDegree = '';
  selectedDepartment = '';
  selectedYear = '';
  selectedSection = '';
  selectedGender = '';

  showModal = false;
  showViewModal = false;
  isEditing = false;
  selectedStudent: Student | null = null;

  formData: any = {};

  modalStep = 0;
  modalSteps = ['Personal Info', 'Contact Info', 'Parent / Guardian', 'Academic Details', 'Identification'];

  avatarColors = ['#7C3AED', '#2563EB', '#059669', '#DC2626', '#D97706', '#db2777'];
  

  constructor(private router: Router,private formbuilder:FormBuilder) {}

  ngOnInit() {
    this.filteredStudents = [...this.students];
    this.formvValidation();
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(s => {
      const matchSearch = !this.searchTerm ||
        s.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchDegree = !this.selectedDegree || s.degree === this.selectedDegree;
      const matchDept = !this.selectedDepartment || s.department === this.selectedDepartment;
      const matchYear = !this.selectedYear || s.year === this.selectedYear;
      const matchSection = !this.selectedSection || s.section === this.selectedSection;
      const matchGender = !this.selectedGender || s.gender === this.selectedGender;
      return matchSearch && matchDegree && matchDept && matchYear && matchSection && matchGender;
    });
  }

  getAvatarColor(name: string): string {
    const index = name.charCodeAt(0) % this.avatarColors.length;
    return this.avatarColors[index];
  }

  calcAge() {
    if (this.formData.dob) {
      const today = new Date();
      const birth = new Date(this.formData.dob);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      this.formData.age = age;
    }
  }

  openAddStudent() {
    this.isEditing = false;
    this.formData = {};
    this.modalStep = 0;
    this.showModal = true;
  }

  editStudent(student: Student) {
    this.isEditing = true;
    this.formData = { ...student };
    this.modalStep = 0;
    this.showModal = true;
  }

  viewStudent(student: Student) {
    this.selectedStudent = student;
    this.showViewModal = true;
  }

  saveStudent() {
    if (this.isEditing) {
      const index = this.students.findIndex(s => s.id === this.formData.id);
      if (index !== -1) this.students[index] = { ...this.formData };
    } else {
      const newStudent: Student = {
        ...this.formData,
        id: this.students.length + 1,
        status: 'Active'
      };
      this.students.push(newStudent);
    }
    this.filterStudents();
    this.closeModal();
  }

  deleteStudent(student: Student) {
    if (confirm(`Deactivate ${student.name}?`)) {
      const index = this.students.findIndex(s => s.id === student.id);
      if (index !== -1) this.students[index].status = 'Inactive';
      this.filterStudents();
    }
  }

  closeModal() {
    this.showModal = false;
    this.formData = {};
    this.modalStep = 0;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedStudent = null;
  }


formvValidation(){
  this.form=this.formbuilder.group({
    "studentId":["", Validators.required],
    "Firstname":["", Validators.required],
    "middlename":[""],
    "lastname":["", Validators.required],
    "gender":["", Validators.required],
    "DOB":["", Validators.required],
    "age":[""],
    "bloodgroup":[""],
    "nationality":[""],
    "Community":[""],
    
    "mobileno":["", Validators.required],
    "address":["", Validators.required],
    "city":["", Validators.required],
    "state":["", Validators.required],
    "fathersname":["", Validators.required],
    "fathersmobileno":["", Validators.required],
    "mothersname":["", Validators.required],
    "course":["", Validators.required],
    "dept":["", Validators.required],
    "year":["", Validators.required],
    "admissiondate":["", Validators.required],
    "admissiontype":["", Validators.required],
  })
}
addStudent()
{
  console.log(this.form.value);
}
}