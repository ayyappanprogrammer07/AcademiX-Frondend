import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
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
  form!: FormGroup;
  courses: any[] = [];
  departments :any[]=[];


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

  constructor(private router: Router, private formbuilder: FormBuilder,private toastrservice:ToastrService,private apiservice:ApiService) {}

  ngOnInit() {
    this.filteredStudents = [...this.students];
    this.formValidation();
  }

  formValidation() {
    this.form = this.formbuilder.group({
      studentId: ['', Validators.required],
      Firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      age: [''],
      bloodgroup: [''],
      nationality: [''],
      Community: [''],

      mobileno: ['', Validators.required],
      alternativemobileno:[''],
      emailaddress:[''],
      addressline1: ['', Validators.required],
      addressline2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      Country: [''],
      PostalCode: [''],

      fathersname: ['', Validators.required],
      fathersmobileno: [''],
      mothersname: ['', Validators.required],
      mothersmobileno: [''],
      guardianname: [''],
      guardianno: [''],
      relationship: [''],

      course: ['', Validators.required],
      dept: ['',Validators.required],
      year: ['', Validators.required],
      semester:['',Validators.required],
      section: [''],
      rollno: [''],
      admisiondate: ['',Validators.required],
      admissontype: ['',Validators.required],



      AadhaarNumber: [''],
      PassportNumber: [''],
      GovtIDType: [''],
      GovtIDNumber: [''],

      PreviousSchoolofsslc:['',Validators.required],
      Boardofsslc:['',Validators.required],
      YearofPassingofsslc:['',Validators.required],
      PercentageCGPAofsslc:['',Validators.required],

      
      PreviousSchoolofhsc:['',Validators.required],
      Boardofhsc:['',Validators.required],
      YearofPassingofhsc:['',Validators.required],
      PercentageCGPAofhsc:['',Validators.required],

      Previousdegree:[''],
      previousdepartment:[''],
      previousinstitution:[''],
      previousuniversity:[''],
      previousyearofpassing:[''],
      previouspercentageorcgpa:['']

    });
  }

  addstudent()
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      this.toastrservice.error('Please enter Mandatory Fields');
      console.log('please enter all the details')
      return;
    }
    else
    {
        let requestobject = 
        {
            "personalInfo":
                  {
                    "regNo": this.form.value.studentId,
                    "firstName": this.form.value.Firstname,
                    "middleName": this.form.value.middlename,
                    "lastName": this.form.value.lastname,
                    "gender": this.form.value.gender,
                    "dateOfBirth": this.form.value.DOB,
                    "age": this.form.value.age,
                    "bloodGroup": this.form.value.bloodgroup,
                    "nationality": this.form.value.nationality,
                    "categoryOrCommunity": this.form.value.Community
                  },
            "contactInfo": {
                    "mobileNo": this.form.value.mobileno,
                    "alternateMobile": this.form.value.alternativemobileno,
                    "emailAddress": this.form.value.emailaddress,
                    "addressLine1": this.form.value.addressline1,
                    "addressLine2": this.form.value.addressline2,
                    "city": this.form.value.city,
                    "state": this.form.value.state,
                    "country": this.form.value.Country,
                    "postalCode": this.form.value.PostalCode
                  },
            "parentDetails": {
                    "fatherName": this.form.value.fathersname,
                    "fathersMobileNumber": this.form.value.fathersmobileno,
                    "mothersName": this.form.value.mothersname,
                    "mothersMobile":this.form.value.mothersmobileno,
                    "guardianName": this.form.value.guardianname,
                    "guardianPhone": this.form.value.guardianno,
                    "relationship": this.form.value.relationship
                  },
            "academicDetails": {
                    "courseOrProgram": this.form.value.course,
                    "department": this.form.value.dept,
                    "year": this.form.value.year,
                    "semester": this.form.value.semester,
                    "section": this.form.value.section,
                    "rollNo": this.form.value.rollno,
                    "admissionDate": this.form.value.admisiondate,
                    "admissionType": this.form.value.admissontype
                  },
            "identificationDetails": {
                    "regNo": this.form.value.studentId,
                    "aadhaarNumber": this.form.value.AadhaarNumber,
                    "passportNumber": this.form.value.PassportNumber,
                    "govtIDType": this.form.value.GovtIDType,
                    "govtIDNumber": this.form.value.GovtIDNumber,
                    "sslcSchool": this.form.value.PreviousSchoolofsslc,
                    "sslcBoard":this.form.value.Boardofsslc,
                    "sslcYearOfPassing": this.form.value.YearofPassingofsslc,
                    "sslcPercentageOrCGPA": this.form.value.PercentageCGPAofsslc,
                    "hscSchool": this.form.value.PreviousSchoolofhsc,
                    "hscBoard": this.form.value.Boardofhsc,
                    "hscYearOfPassing": this.form.value.YearofPassingofhsc,
                    "hscPercentageOrCGPA": this.form.value.PercentageCGPAofhsc,

                    "previousDegree":this.form.value.Previousdegree,
                    "previousDepartment": this.form.value.previousdepartment,
                    "previousInstitution": this.form.value.previousinstitution,
                    "previousUniversity": this.form.value.previousuniversity,
                    "previousYearOfPassing": this.form.value.previousyearofpassing,
                    "previousPercentageOrCGPA": this.form.value.previouspercentageorcgpa
                  }
          }
        console.log(requestobject);
        this.apiservice.addstudent(requestobject).subscribe(
          (response)=>{
            if(response.isadded)
            {
                this.toastrservice.success('Students Added Succesfully');
                this.closeModal();        
                this.form.reset();        
                this.modalStep = 0;    
            }
            else
            {
              this.toastrservice.error('Failed to add ','Please Try again');
            }
          }
        )
    }
  }

getcourses()
{
  this.apiservice.getcourse().subscribe(
    (response: any[]) =>
    {
      this.courses = response.map((c:any) => ({
        courseid: c.courseid,
        coursename: c.coursename
      }));
    }
  )
}
 onStepClick(index: number) {
  if (index === 3) {       // 3 = Academic Details (0-based index)
    this.getcourses();
  }
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
    const dob = this.form.get('DOB')?.value;
    if (dob) {
      const today = new Date();
      const birth = new Date(dob);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      this.form.patchValue({ age: age });
    }
  }

  openAddStudent() {
    this.isEditing = false;
    this.formData = {};
    this.form.reset();
    this.modalStep = 0;
    this.showModal = true;
  }

  editStudent(student: Student) {
    this.isEditing = true;
    this.formData = { ...student };
    this.form.patchValue({
      Firstname: student.name.split(' ')[0],
      lastname: student.name.split(' ')[1] || '',
      gender: student.gender,
      DOB: student.dob,
      bloodgroup: student.bloodGroup,
      mobileno: student.phone,
      address: student.address,
      fathersname: student.fatherName,
      fathersmobileno: student.parentPhone,
      mothersname: student.motherName,
      dept: student.department,
      year: student.year,
      admissiondate: student.admissionDate,
    });
    this.modalStep = 0;
    this.showModal = true;
  }

  viewStudent(student: Student) {
    this.selectedStudent = student;
    this.showViewModal = true;
  }

  saveStudent() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const f = this.form.value;
    if (this.isEditing) {
      const index = this.students.findIndex(s => s.id === this.formData.id);
      if (index !== -1) {
        this.students[index] = {
          ...this.students[index],
          name: `${f.Firstname} ${f.lastname}`,
          gender: f.gender,
          dob: f.DOB,
          bloodGroup: f.bloodgroup,
          phone: f.mobileno,
          address: f.address,
          fatherName: f.fathersname,
          parentPhone: f.fathersmobileno,
          motherName: f.mothersname,
          department: f.dept,
          year: f.year,
          admissionDate: f.admissiondate,
        };
      }
    } else {
      const newStudent: Student = {
        id: this.students.length + 1,
        name: `${f.Firstname} ${f.lastname}`,
        email: this.formData.email || '',
        rollNo: this.formData.rollNo || '',
        class: f.year || '',
        section: this.formData.section || '',
        gender: f.gender,
        phone: f.mobileno,
        status: 'Active',
        bloodGroup: f.bloodgroup || '',
        dob: f.DOB,
        address: f.address,
        admissionDate: f.admissiondate,
        fatherName: f.fathersname,
        motherName: f.mothersname,
        parentPhone: f.fathersmobileno,
        degree: f.course,
        department: f.dept,
        year: f.year,
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
    this.form.reset();
    this.modalStep = 0;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedStudent = null;
  }
  getDepartments()
  {
    this.apiservice.getDepartments(1).subscribe(
    (response: any[]) =>
    {
      this.departments = response.map((c:any) => ({
        departmentid: c.courseid,
        departmentname: c.coursename
      }));
    }
  )
  }

  
}