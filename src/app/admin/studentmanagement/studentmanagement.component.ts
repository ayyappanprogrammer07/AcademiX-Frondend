import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studentmanagement',
  templateUrl: './studentmanagement.component.html',
  styleUrls: ['./studentmanagement.component.css']
})
export class StudentmanagementComponent implements OnInit {

  form!: FormGroup;
  courses: any[] = [];
  departments: any[] = [];
  totalstuentscount: any = 0;
  activestudentscount: any = 0;
  boyscount: any = 0;
  girlscount: any = 0;
  newmonthcount: any = 0;
  students: any[] = [];

  filteredStudents: any[] = [];
  searchTerm = '';
  selectedDegree = '';
  selectedDepartment = '';
  selectedYear = '';
  selectedSection = '';
  selectedGender = '';

  showModal = false;
  showViewModal = false;
  isEditing = false;
  selectedStudent: any = null;

  regnoExists: any = null;

  formData: any = {};

  modalStep = 0;
  modalSteps = ['Personal Info', 'Contact Info', 'Parent / Guardian', 'Academic Details', 'Identification'];

  avatarColors = ['#7C3AED', '#2563EB', '#059669', '#DC2626', '#D97706', '#db2777'];

  genders = ['Male', 'Female', 'Other'];

  pagesize = 5;
  totalPages: number = 0;
  pagesArray: number[] = [];
  currentPage: number = 1;

  // Import modal
  showImportModal = false;
  importFileType = 'excel';
  importFileName = '';
  importFile: File | null = null;

  // ── ✅ Age Validation Variables ──────────────────────────────────────────────
  ageError: string = '';
  isAgeValid: boolean = false;
  // ─────────────────────────────────────────────────────────────────────────────

  // ── ✅ Year → Semester Dependent Dropdown ────────────────────────────────────
  semesterMap: { [key: string]: { value: string; label: string }[] } = {
    '1st Year': [
      { value: 'Sem 1', label: 'Sem 1' },
      { value: 'Sem 2', label: 'Sem 2' }
    ],
    '2nd Year': [
      { value: 'Sem 3', label: 'Sem 3' },
      { value: 'Sem 4', label: 'Sem 4' }
    ],
    '3rd Year': [
      { value: 'Sem 5', label: 'Sem 5' },
      { value: 'Sem 6', label: 'Sem 6' }
    ],
    '4th Year': [
      { value: 'Sem 7', label: 'Sem 7' },
      { value: 'Sem 8', label: 'Sem 8' }
    ]
  };

  availableSemesters: { value: string; label: string }[] = [];
  // ─────────────────────────────────────────────────────────────────────────────
  City = ['Chennai','Ariyalur','Chengalpattu',
'Coimbatore','Cuddalore','Dharmapuri',
'Dindigul','Erode','Kallakurichi',
'Kanchipuram','Kanyakumari','Karur',
'Krishnagiri','Madurai','Mayiladuthurai',
'Nagapattinam','Namakkal','Nilgiris',
'Perambalur','Pudukkottai','Ramanathapuram',
'Ranipet','Salem','Sivaganga',
'Tenkasi','Thanjavur','Theni',
'Thoothukudi','Tiruchirappalli','Tirunelveli',
'Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur',
'Vellore','Viluppuram','Virudhunagar'
]
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private toastrservice: ToastrService,
    private apiservice: ApiService
  ) {}

  ngOnInit() {
    this.filteredStudents = [...this.students];
    this.ngoncallers();
  }

  ngoncallers() {
    this.formValidation();
    this.GetTotalStudentsCount();
    this.getStudentsDetails();
    this.activestudecount();
    this.GetTotalBoysandGirlscount();
    this.getcountnewmonth();
    this.onCountChange();
  }

  // ── ADD STUDENT LOGICS ───────────────────────────────────────────────────────

  formatPostalCode(event: Event): void {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  value = value.substring(0, 6);
  if (value.length > 3) {
    value = `${value.slice(0, 3)} ${value.slice(3)}`;
  }
  this.form.get('PostalCode')?.setValue(value, { emitEvent: false });
}

  setToday(): void {
    const today = new Date().toISOString().split('T')[0];
    this.form.get('admisiondate')?.setValue(today);
  }

  // Allow Numbers Only
  allowOnlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.charCode;
    return charCode >= 48 && charCode <= 57;
  }

  // Auto-insert spaces after every 4 digits
  formatAadhaar(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 12);
    if (value.length > 8) {
      value = `${value.slice(0, 4)} ${value.slice(4, 8)} ${value.slice(8)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 4)} ${value.slice(4)}`;
    }
    this.form.get('AadhaarNumber')?.setValue(value, { emitEvent: false });
  }

  // Allow only: A-Z for 1st char, 0-9 after that
  allowPassportChars(event: KeyboardEvent): boolean {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const charCode = event.charCode;
    if (currentValue.length === 0) {
      return charCode >= 65 && charCode <= 90;
    } else {
      return charCode >= 48 && charCode <= 57;
    }
  }

  // Auto uppercase the first character
  formatPassport(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');
    if (value.length > 0) {
      const first = value[0].replace(/[^A-Z]/g, '');
      const rest = value.slice(1).replace(/[^0-9]/g, '');
      value = first + rest;
    }
    this.form.get('PassportNumber')?.setValue(value, { emitEvent: false });
  }

  onCountChange() {
    console.log(this.pagesize);
    this.getpage();
  }

  getpage() {
    this.totalPages = Math.ceil(this.totalstuentscount / this.pagesize);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    console.log('Navigating to page:', page);
  }

  formValidation() {
    this.form = this.formbuilder.group({
      studentId:            ['', Validators.required],
      Firstname:            ['', Validators.required],
      middlename:           [''],
      lastname:             ['', Validators.required],
      gender:               [null, Validators.required],
      DOB:                  ['', Validators.required],
      age:                  [''],
      bloodgroup:           [''],
      nationality:          [''],
      Community:            [''],

      mobileno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],      
      alternativemobileno:  ['',Validators.pattern('^[0-9]{10}$')],
      emailaddress:         ['', Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)],
      addressline1:         ['', Validators.required],
      addressline2:         [''],
      city:                 ['', Validators.required],
      state:                ['', Validators.required],
      Country:              [''],
      PostalCode:           ['',Validators.pattern(/^[0-9]{3} [0-9]{3}$/)],

      fathersname:          ['', Validators.required],
      fathersmobileno:      ['', Validators.pattern('^[0-9]{10}$')],
      mothersname:          ['', Validators.required],
      mothersmobileno:      ['', Validators.pattern('^[0-9]{10}$')],
      guardianname:         [''],
      guardianno:           ['', Validators.pattern('^[0-9]{10}$')],
      relationship:         [''],

      course:               ['', Validators.required],
      dept:                 ['', Validators.required],
      year:                 ['', Validators.required],
      semester:             ['', Validators.required],
      section:              [''],
      rollno:               [''],
      admisiondate:         ['', Validators.required],
      admissontype:         ['', Validators.required],

      AadhaarNumber:        ['', Validators.pattern('^[0-9 ]{14}$')],
      PassportNumber:       ['', Validators.pattern('^[A-Z]{1}[0-9]{7}$')],
      GovtIDType:           [''],
      GovtIDNumber:         [''],

      PreviousSchoolofsslc: ['', Validators.required],
      Boardofsslc:          ['', Validators.required],
      YearofPassingofsslc:  ['', Validators.required],
      PercentageCGPAofsslc: ['', Validators.required],

      PreviousSchoolofhsc:  ['', Validators.required],
      Boardofhsc:           ['', Validators.required],
      YearofPassingofhsc:   ['', Validators.required],
      PercentageCGPAofhsc:  ['', Validators.required],

      Previousdegree:           [''],
      previousdepartment:       [''],
      previousinstitution:      [''],
      previousuniversity:       [''],
      previousyearofpassing:    [''],
      previouspercentageorcgpa: ['']
    });
  }

  // ── ✅ Year → Semester Dependent Dropdown Logic ──────────────────────────────
  /**
   * Call this on (change) of the Year dropdown in your HTML:
   *   (change)="onYearChange($event)"
   */
  onYearChange(event: any): void {
    const selectedYear = event?.target?.value || this.form.get('year')?.value;

    // Reset semester field and available options
    this.form.get('semester')?.setValue('');
    this.availableSemesters = [];

    if (selectedYear && this.semesterMap[selectedYear]) {
      this.availableSemesters = this.semesterMap[selectedYear];
    }
  }

  /**
   * Call this when editing a student to pre-load the correct semester options
   * based on the already-selected year value.
   */
  private loadSemestersForYear(year: string): void {
    this.availableSemesters = this.semesterMap[year] ?? [];
  }
  // ─────────────────────────────────────────────────────────────────────────────

  // ── ✅ Age Validation ────────────────────────────────────────────────────────
  calcAge() {
    const dob = this.form.get('DOB')?.value;

    if (!dob) {
      this.ageError = '';
      this.isAgeValid = false;
      this.form.patchValue({ age: '' });
      return;
    }

    const today = new Date();
    const birth = new Date(dob);

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

    this.form.patchValue({ age: age < 0 ? 0 : age });

    if (age < 18) {
      this.ageError = `Age must be greater than 18. Current age is ${age}.`;
      this.isAgeValid = false;
      this.form.get('age')?.setErrors({ underage: true });
    } else {
      this.ageError = '';
      this.isAgeValid = true;
      this.form.get('age')?.setErrors(null);
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Import Modal ─────────────────────────────────────────────────────────────
  openImportModal()  { this.showImportModal = true; }
  closeImportModal() { this.showImportModal = false; this.importFileName = ''; this.importFile = null; }

  onImportFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) { this.importFile = file; this.importFileName = file.name; }
  }

  onImportFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) { this.importFile = file; this.importFileName = file.name; }
  }

  downloadTemplate(event: Event) { event.preventDefault(); }

  submitImport() {
    if (!this.importFile) return;
    this.closeImportModal();
  }

  // ── Add Student ──────────────────────────────────────────────────────────────
  addstudent() {
    // ✅ Age validation check
    if (!this.isAgeValid) {
      this.toastrservice.error('Student age must be greater than 18. Please check the Date of Birth.');
      this.modalStep = 0;
      return;
    }

    if (this.regnoExists === false) {
      this.toastrservice.error('Student ID already exists. Please use a different ID.');
      this.modalStep = 0;
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrservice.error('Please enter Mandatory Fields');
      return;
    }

    const requestobject = {
      personalInfo: {
        regNo:               this.form.value.studentId,
        firstName:           this.form.value.Firstname,
        middleName:          this.form.value.middlename,
        lastName:            this.form.value.lastname,
        gender:              this.form.value.gender,
        dateOfBirth:         this.form.value.DOB,
        age:                 this.form.value.age,
        bloodGroup:          this.form.value.bloodgroup,
        nationality:         this.form.value.nationality,
        categoryOrCommunity: this.form.value.Community,
        createdon:           this.getTodayDate()
      },
      contactInfo: {
        mobileNo:        this.form.value.mobileno,
        alternateMobile: this.form.value.alternativemobileno,
        emailAddress:    this.form.value.emailaddress,
        addressLine1:    this.form.value.addressline1,
        addressLine2:    this.form.value.addressline2,
        city:            this.form.value.city,
        state:           this.form.value.state,
        country:         this.form.value.Country,
        postalCode:      this.form.value.PostalCode
      },
      parentDetails: {
        fatherName:          this.form.value.fathersname,
        fathersMobileNumber: this.form.value.fathersmobileno,
        mothersName:         this.form.value.mothersname,
        mothersMobile:       this.form.value.mothersmobileno,
        guardianName:        this.form.value.guardianname,
        guardianPhone:       this.form.value.guardianno,
        relationship:        this.form.value.relationship
      },
      academicDetails: {
        courseOrProgram: this.form.value.course,
        department:      this.form.value.dept,
        year:            this.form.value.year,
        semester:        this.form.value.semester,
        section:         this.form.value.section,
        rollNo:          this.form.value.rollno,
        admissionDate:   this.form.value.admisiondate,
        admissionType:   this.form.value.admissontype
      },
      identificationDetails: {
        regNo:                    this.form.value.studentId,
        aadhaarNumber:            this.form.value.AadhaarNumber,
        passportNumber:           this.form.value.PassportNumber,
        govtIDType:               this.form.value.GovtIDType,
        govtIDNumber:             this.form.value.GovtIDNumber,
        sslcSchool:               this.form.value.PreviousSchoolofsslc,
        sslcBoard:                this.form.value.Boardofsslc,
        sslcYearOfPassing:        this.form.value.YearofPassingofsslc,
        sslcPercentageOrCGPA:     this.form.value.PercentageCGPAofsslc,
        hscSchool:                this.form.value.PreviousSchoolofhsc,
        hscBoard:                 this.form.value.Boardofhsc,
        hscYearOfPassing:         this.form.value.YearofPassingofhsc,
        hscPercentageOrCGPA:      this.form.value.PercentageCGPAofhsc,
        previousDegree:           this.form.value.Previousdegree,
        previousDepartment:       this.form.value.previousdepartment,
        previousInstitution:      this.form.value.previousinstitution,
        previousUniversity:       this.form.value.previousuniversity,
        previousYearOfPassing:    this.form.value.previousyearofpassing,
        previousPercentageOrCGPA: this.form.value.previouspercentageorcgpa
      }
    };

    if (this.isEditing) {
      this.updateStudnet(requestobject);
    } else {
      this.addstud(requestobject);
    }
    this.regnoExists = null;
  }

  updateStudnet(requestobject: any) {
    this.apiservice.updatestudentrecord(requestobject).subscribe((response) => {
      if (response.isadded) {
        this.toastrservice.success('Student Updated Successfully');
        this.closeModal();
        this.form.reset();
        this.modalStep = 0;
        this.ngoncallers();
      } else {
        this.toastrservice.error('Failed to update', 'Please Try again');
      }
    });
  }

  onStepClick(index: number) {
    if (index === 3) { this.getcourses(); }
  }

  // ── Filter ───────────────────────────────────────────────────────────────────
  filterStudents() {
    this.filteredStudents = this.students.filter(s => {
      const fullName  = `${s.personalInfo?.firstName ?? ''} ${s.personalInfo?.lastName ?? ''}`.toLowerCase();
      const regNo     = (s.personalInfo?.regNo ?? '').toLowerCase();
      const matchSearch    = !this.searchTerm    || fullName.includes(this.searchTerm.toLowerCase()) || regNo.includes(this.searchTerm.toLowerCase());
      const matchDegree    = !this.selectedDegree     || s.academicDetails?.courseOrProgram === this.selectedDegree;
      const matchDept      = !this.selectedDepartment || s.academicDetails?.department      === this.selectedDepartment;
      const matchYear      = !this.selectedYear       || s.academicDetails?.year            === this.selectedYear;
      const matchSection   = !this.selectedSection    || s.academicDetails?.section         === this.selectedSection;
      const matchGender    = !this.selectedGender     || s.personalInfo?.gender             === this.selectedGender;
      return matchSearch && matchDegree && matchDept && matchYear && matchSection && matchGender;
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  getAvatarColor(name: string): string {
    if (!name) return this.avatarColors[0];
    const index = name.charCodeAt(0) % this.avatarColors.length;
    return this.avatarColors[index];
  }

  getTodayDate(): string {
    const today = new Date();
    const day   = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year  = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // ── Modal controls ───────────────────────────────────────────────────────────
  openAddStudent() {
    this.isEditing        = false;
    this.formData         = {};
    this.ageError         = '';
    this.isAgeValid       = false;
    this.availableSemesters = [];   // ✅ reset semester options
    this.form.reset();
    this.modalStep        = 0;
    this.showModal        = true;
  }

  editStudent(student: any) {
    this.isEditing = true;
    this.formData  = { ...student };

    const year = student.academicDetails?.year;

    // ✅ Pre-load semester options for the student's saved year
    if (year) {
      this.loadSemestersForYear(year);
    } else {
      this.availableSemesters = [];
    }

    this.form.patchValue({
      studentId:    student.personalInfo?.regNo,
      Firstname:    student.personalInfo?.firstName,
      middlename:   student.personalInfo?.middleName,
      lastname:     student.personalInfo?.lastName,
      gender:       student.personalInfo?.gender,
      DOB:          student.personalInfo?.dateOfBirth,
      age:          student.personalInfo?.age,
      bloodgroup:   student.personalInfo?.bloodGroup,
      nationality:  student.personalInfo?.nationality,
      Community:    student.personalInfo?.categoryOrCommunity,

      mobileno:            student.contactInfo?.mobileNo,
      alternativemobileno: student.contactInfo?.alternateMobile,
      emailaddress:        student.contactInfo?.emailAddress,
      addressline1:        student.contactInfo?.addressLine1,
      addressline2:        student.contactInfo?.addressLine2,
      city:                student.contactInfo?.city,
      state:               student.contactInfo?.state,
      Country:             student.contactInfo?.country,
      PostalCode:          student.contactInfo?.postalCode,

      fathersname:     student.parentDetails?.fatherName,
      fathersmobileno: student.parentDetails?.fathersMobileNumber,
      mothersname:     student.parentDetails?.mothersName,
      mothersmobileno: student.parentDetails?.mothersMobile,
      guardianname:    student.parentDetails?.guardianName,
      guardianno:      student.parentDetails?.guardianPhone,
      relationship:    student.parentDetails?.relationship,

      course:       student.academicDetails?.courseOrProgram,
      dept:         student.academicDetails?.department,
      year:         student.academicDetails?.year,
      semester:     student.academicDetails?.semester,
      section:      student.academicDetails?.section,
      rollno:       student.academicDetails?.rollNo,
      admisiondate: student.academicDetails?.admissionDate,
      admissontype: student.academicDetails?.admissionType,

      AadhaarNumber:  student.identificationDetails?.aadhaarNumber,
      PassportNumber: student.identificationDetails?.passportNumber,
      GovtIDType:     student.identificationDetails?.govtIDType,
      GovtIDNumber:   student.identificationDetails?.govtIDNumber,

      PreviousSchoolofsslc: student.identificationDetails?.sslcSchool,
      Boardofsslc:          student.identificationDetails?.sslcBoard,
      YearofPassingofsslc:  student.identificationDetails?.sslcYearOfPassing,
      PercentageCGPAofsslc: student.identificationDetails?.sslcPercentageOrCGPA,

      PreviousSchoolofhsc:  student.identificationDetails?.hscSchool,
      Boardofhsc:           student.identificationDetails?.hscBoard,
      YearofPassingofhsc:   student.identificationDetails?.hscYearOfPassing,
      PercentageCGPAofhsc:  student.identificationDetails?.hscPercentageOrCGPA,

      Previousdegree:           student.identificationDetails?.previousDegree,
      previousdepartment:       student.identificationDetails?.previousDepartment,
      previousinstitution:      student.identificationDetails?.previousInstitution,
      previousuniversity:       student.identificationDetails?.previousUniversity,
      previousyearofpassing:    student.identificationDetails?.previousYearOfPassing,
      previouspercentageorcgpa: student.identificationDetails?.previousPercentageOrCGPA,
    });

    this.calcAge();

    this.modalStep = 0;
    this.showModal = true;
  }

  viewStudent(student: any) {
    this.selectedStudent = student;
    this.showViewModal   = true;
  }

  closeModal() {
    this.showModal          = false;
    this.formData           = {};
    this.ageError           = '';
    this.isAgeValid         = false;
    this.availableSemesters = [];   // ✅ reset semester options on close
    this.form.reset();
    this.modalStep          = 0;
    this.regnoExists        = null;
  }

  closeViewModal() {
    this.showViewModal   = false;
    this.selectedStudent = null;
  }

  // ── API Calls ────────────────────────────────────────────────────────────────
  GetTotalStudentsCount() {
    this.apiservice.GetTotalStudentsCount().subscribe(response => {
      this.totalstuentscount = response;
      this.getpage();
    });
  }

  getStudentsDetails() {
    this.apiservice.getStudentsDetails().subscribe(response => {
      this.students = response;
    });
  }

  activestudecount() {
    this.apiservice.activestudentscount().subscribe(response => {
      this.activestudentscount = response;
    });
  }

  GetTotalBoysandGirlscount() {
    this.apiservice.GetTotalBoysandGirlscount().subscribe(response => {
      this.boyscount  = response.boyscount;
      this.girlscount = response.girlscount;
    });
  }

  getcountnewmonth() {
    this.apiservice.getcountnewmonth().subscribe(response => {
      this.newmonthcount = response;
    });
  }

  isregnouniqueornot() {
    const value = this.form.get('studentId')?.value;
    if (!value || value.trim() === '') { this.regnoExists = null; return; }
    this.apiservice.isregnouniqueornot(value).subscribe(response => {
      this.regnoExists = response;
    });
  }

  deleteStudent(student: any) {
    const regNo = student.personalInfo.regNo;
    const name = [
      student.personalInfo.firstName,
      student.personalInfo.middlename,
      student.personalInfo.lastname
    ].filter(part => part && part.trim() !== '').join(' ');

    Swal.fire({
      title: 'Delete Student?',
      html: `Are you sure you want to delete <br><b>${name}</b> (${regNo})?<br><span style="color:#ef4444;font-size:13px;">This action cannot be undone.</span>`,
      iconHtml: '🗑️',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'academix-popup',
        title: 'academix-title',
        htmlContainer: 'academix-html',
        confirmButton: 'academix-confirm-btn',
        cancelButton: 'academix-cancel-btn',
        icon: 'academix-icon'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiservice.deleteStudent(regNo).subscribe({
          next: (response) => {
            if (response == true) {
              Swal.fire({
                iconHtml: '✓',
                title: 'Deleted Successfully!',
                text: `${name} has been removed.`,
                customClass: {
                  popup: 'academix-popup',
                  title: 'academix-title',
                  confirmButton: 'academix-confirm-btn',
                  icon: 'academix-icon-success'
                },
                buttonsStyling: false,
                timer: 2500,
                showConfirmButton: false
              });
              this.ngoncallers();
            } else {
              Swal.fire({
                iconHtml: '✕',
                title: 'Delete Failed',
                text: 'Could not delete student. Please try again.',
                customClass: {
                  popup: 'academix-popup',
                  title: 'academix-title',
                  confirmButton: 'academix-confirm-btn',
                  icon: 'academix-icon-error'
                },
                buttonsStyling: false
              });
            }
          },
          error: () => {
            Swal.fire({
              iconHtml: '✕',
              title: 'Error!',
              text: 'Something went wrong. Please try again.',
              customClass: {
                popup: 'academix-popup',
                title: 'academix-title',
                confirmButton: 'academix-confirm-btn',
                icon: 'academix-icon-error'
              },
              buttonsStyling: false
            });
          }
        });
      }
    });
  }

  getDepartments(event: any) {
    const selectedCourseName = event.target.value;
    const selectedCourse = this.courses.find(c => c.coursename === selectedCourseName);
    const courseId = selectedCourse?.courseid;
    this.apiservice.getDepartments(courseId).subscribe((response: any[]) => {
      this.departments = response.map((c: any) => ({
        departmentid:   c.departmentid,
        departmentname: c.departmentname
      }));
    });
  }

  addstud(requestobject: any) {
    this.apiservice.addstudent(requestobject).subscribe((response) => {
      if (response.isadded) {
        this.toastrservice.success('Student Added Successfully');
        this.closeModal();
        this.form.reset();
        this.modalStep = 0;
        this.ngoncallers();
      } else {
        this.toastrservice.error('Failed to add', 'Please Try again');
      }
    });
  }

  getcourses() {
    this.apiservice.getcourse().subscribe((response: any[]) => {
      this.courses = response.map((c: any) => ({
        courseid:   c.courseid,
        coursename: c.coursename
      }));
    });
  }
}