import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../faculty.service';
import { GroupService } from '../group.service';
import { Faculty } from '../faculty';
import { Group } from '../group';
import { User } from '../user';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  approvers! : Faculty[];
  groups! : Group[];
  users! : User[];

  approverForm!: FormGroup;

  constructor(private facultyApi: FacultyService, private groupApi: GroupService, private userApi: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.facultyApi.getApprovers().subscribe((data: Faculty[]) => {
      this.approvers = data;
    });

    this.groupApi.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });

    // this.userApi.getUsers().subscribe((data: User[]) => {
    //   this.users = data;
    // });

    this.approverForm  = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addApprover() {
    this.facultyApi.addApprover(this.approverForm.value as Faculty).subscribe();
    this.approvers.push(this.approverForm.value as Faculty);
    this.approverForm.reset();
  }

  removeApprover(faculty: Faculty) {
    this.facultyApi.deleteApprover(faculty.email).subscribe();
    this.approvers.splice(this.approvers.indexOf(faculty), 1);
  }
  
}
