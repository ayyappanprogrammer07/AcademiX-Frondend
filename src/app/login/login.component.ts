import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading=true;
  showPassword=false
  formgroup!:FormGroup;
  constructor(private formbuilder:FormBuilder,private apiservice :ApiService,private toastrservice:ToastrService,private router:Router){}

  ngOnInit()
  {
    this.formgroup=this.formbuilder.group({
      'username':['',Validators.required],
      'usertype':['',Validators.required],
      'password':['',Validators.required]
  })
  }

  

  togglePassword()
  {
    this.showPassword = !this.showPassword;
  }

  signin()
  {
    if(this.formgroup.valid)
    {
      let reqestobject=
      {
      "name": this.formgroup.value.username,
      "usertype": this.formgroup.value.usertype,
      "password": this.formgroup.value.password
      }
      this.apiservice.is_userexist(reqestobject).subscribe(
        (response)=>{
          if(response.is_user_exist)
          {
            this.toastrservice.success('Welcome back!', 'Login Successful');
            this.router.navigate(['adminmain'])
          }
          else
          {
            this.toastrservice.error('Invalid Credintials');
          }
      })
    }
    else
    {
      console.log('Please enter the all the details');
    }

  }
 
}