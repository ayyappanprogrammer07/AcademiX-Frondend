import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isCollapsed = false;
  activeRoute = 'dashboard';
  totalstuentscount:any=0;

  constructor(private router: Router,private apiservice:ApiService) {}
  ngOnInit()
  {
    this.GetTotalStudentsCount
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigate(route: string) {
    this.activeRoute = route;
    this.router.navigate(['adminmain', route]);
  }

  logout()
  {
    this.router.navigate([''])
  }

  GetTotalStudentsCount() {
    this.apiservice.GetTotalStudentsCount().subscribe(response => {
      this.totalstuentscount = response;
      console.log(this.totalstuentscount)
    });
  }

}
