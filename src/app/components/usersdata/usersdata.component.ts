import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { IUser } from '../models/user.model';


const GetUsersQuery = gql`
query{
  getUsers{
    email,
    name,
    password,
    createdOn,
    updatedOn
  }
}
`
const GetUsersQueryFilter = gql`
query ($filter:UserFilter){
  getUsers(filter:$filter){
    email,
    name,
    password,
    createdOn,
    updatedOn
  }
}`;

const AddUserMutaion = gql
  `mutation ($input:UserInput!){
    addUser(input:$input) {
      email,
      name,
      password,
      createdOn,
      updatedOn
  }
 }`

@Component({
  selector: 'app-usersdata',
  templateUrl: './usersdata.component.html',
  styleUrls: ['./usersdata.component.css']
})
export class UsersdataComponent implements OnInit {

  allUsers: IUser[] = [];
  selectedName: string = '';
  userForms = {
    Email: '',
    Name: '',
    Password: '',
    CreatedOn: '',
    UpdatedOn: ''
  };

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    // this.apollo.watchQuery<any>({
    //   query: GetUsersQueryFilter,
    // })
    //   .valueChanges
    //   .subscribe(({ data, loading }) => {
    //     console.log(loading);
    //     this.allUsers = data.getUsers;
    //   })

    this.apollo.watchQuery<any>({
      query: GetUsersQueryFilter,
    })
      .refetch({})
      .then(({ data, loading }) => {
        console.log(loading);
        this.allUsers = data.getUsers;
      })
  }

  searchByName() {
    // this.apollo.watchQuery<any>({
    //   query: GetUsersQueryFilter,
    //   variables: {
    //     name: this.selectedName
    //   }
    // })
    //   .valueChanges
    //   .subscribe(({ data, loading }) => {
    //     console.log(loading);
    //     this.allUsers = data.getUsers;
    //   });

    console.log(this.selectedName);


    this.apollo.watchQuery<any>({
      query: GetUsersQueryFilter,
    })
      .refetch({
        filter: { name: this.selectedName }
      })
      .then(({ data, loading }) => {
        console.log(loading);
        this.allUsers = data.getUsers;
      })
  }

  newUser() {
    this.apollo.mutate({
      mutation: AddUserMutaion,
      variables: {
        input: {
          email: this.userForms.Email,
          name: this.userForms.Name,
          password: this.userForms.Password,
          createdOn: new Date(),//this.userForms.CreatedOn,
          updatedOn: new Date()//this.userForms.UpdatedOn
        }
      }
    }).subscribe((data: any) => {
      console.log(data);
      this.getAllUsers();
      // let users = Object.assign([], this.allUsers)
      // //users.unshift(data["Save"]);
      // this.allUsers = users;
    })
  }
}
