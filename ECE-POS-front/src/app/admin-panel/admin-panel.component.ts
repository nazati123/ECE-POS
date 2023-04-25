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

  editing = false;
  editingId?: number;
  approverForm!: FormGroup;
  oldApprover?: Faculty;

  groupEditing = false;
  groupEditingId?: number;
  groupForm!: FormGroup;
  oldGroup?: Group;

  userEditing = false;
  userEditingId?: number;
  userForm!: FormGroup;
  oldUser?: User;

  constructor(private facultyApi: FacultyService, private groupApi: GroupService, private userApi: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.facultyApi.getApprovers().subscribe((data: Faculty[]) => {
      this.approvers = data;
    });

    this.groupApi.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });

    this.userApi.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });

    this.approverForm  = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.groupForm  = this.fb.group({
      id: [],
      groupName: ['', Validators.required]
    });

    this.userForm  = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  saveApprover() {
    if(this.editing){
      let editedFaculty = this.approverForm.value;
      this.facultyApi.editApprover(this.oldApprover?.email as string, editedFaculty).subscribe();
      this.editingId = undefined;
      this.editing = false;
      this.approvers[this.approvers.indexOf(this.oldApprover as Faculty)] = editedFaculty;
    }
    else {
      this.facultyApi.addApprover(this.approverForm.value as Faculty).subscribe();
      this.approvers.push(this.approverForm.value as Faculty);
    }
    this.approverForm.reset();
  }

  editApprover(faculty: Faculty) {
    this.editing = true;
    this.editingId = this.approvers.indexOf(faculty);
    this.oldApprover = faculty;
    this.approverForm.patchValue(faculty);
  }

  removeApprover(faculty: Faculty) {
    this.facultyApi.deleteApprover(faculty.email).subscribe();
    this.approvers.splice(this.approvers.indexOf(faculty), 1);
  }

  saveGroup() {
    if(this.groupEditing){
      let editedGroup = this.groupForm.value;
      this.groupApi.editGroup(this.oldGroup?.id as number, editedGroup).subscribe();
      this.groupEditingId = undefined;
      this.groupEditing = false;
      this.groups[this.groups.indexOf(this.oldGroup as Group)] = editedGroup;
    }
    else {
      let groupName : Group = {
        groupName: this.groupForm.get('groupName')?.value
      }
      this.groupApi.addGroup(groupName).subscribe(data => {
        let newGroup = data as Group;
        this.groups.push(newGroup);
      });
    }
    this.groupForm.reset();
  }

  editGroup(group: Group) {
    this.groupEditing = true;
    this.groupEditingId = this.groups.indexOf(group);
    this.oldGroup = group;
    this.groupForm.patchValue(group);
  }

  removeGroup(group: Group) {
    this.groupApi.deleteGroup(group.id as number).subscribe();
    this.groups.splice(this.groups.indexOf(group), 1);
  }

  saveUser() {
    if(this.userEditing){
      let editedUser = this.userForm.value;
      this.userApi.editUser(this.oldUser?.username as string, editedUser).subscribe();
      this.userEditingId = undefined;
      this.userEditing = false;
      this.users[this.users.indexOf(this.oldUser as User)] = editedUser;
    }
    else {
      this.userApi.addUser(this.userForm.value as User).subscribe();
      this.users.push(this.userForm.value as User);
    }
    this.userForm.reset();
  }

  editUser(user: User) {
    this.userEditing = true;
    this.userEditingId = this.users.indexOf(user);
    this.oldUser = user;
  }

  removeUser(user: User) {
    this.userApi.removeUser(user.username as string).subscribe();
    this.groups.splice(this.users.indexOf(user), 1);
  }
  
}
