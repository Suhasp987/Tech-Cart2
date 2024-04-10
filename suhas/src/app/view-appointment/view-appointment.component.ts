import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from '../_services';

import 'jquery';
declare var $: any;

// Define an interface for the appointment object
interface Appointment {
  amount: number;
  firstname: string;
  age: number;
  email: string;
  phonenumber: string;
  streetaddress: string;
  addressline2?: string;
  city: string;
  id:number;
  state: string;
  country: string;
  pincode: string;
  packages: string;
  trainerpreference: string;
  physiotherapist: string;
  weeks?: number;
  
}

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
  appointments: Appointment[] = []; // Array of appointments
  editAppointment: any = {};
  
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getFitnessAppointments();
  }


  
  // Fetch all fitness appointments from the API
  getFitnessAppointments() {
    this.userService.getfitnessdata() // Call getfitnessdata from UserService
      .pipe(
        catchError(error => {
          console.error('Error fetching appointments:', error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log(response);
        this.appointments = response; // Store fetched appointments in the component
      });

      
  }

  // Delete an appointment by ID
  Deleteitem(id: number):void {
    this.userService.deleteAppointmentById(id)
      .pipe(
        catchError(error => {
          console.error('Error deleting appointment:', error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        // After successful deletion, update the appointments list
        this.getFitnessAppointments();
      });
  }

  // Edit appointment (not implemented in this example)
 

openEditModal(appointment: any) {
  this.editAppointment = { ...appointment }; // Create a copy of the appointment
  // Show the modal using jQuery (make sure you have jQuery included)
  $('#editAppointmentModal').modal('show');
}

saveAppointment() {
  // Call API to update appointment with edited data
  this.userService.updateAppointment(this.editAppointment.id, this.editAppointment).subscribe(
    () => {
      console.log('Appointment updated successfully.');
      $('#editAppointmentModal').modal('hide'); // Hide modal after successful update
      this.getFitnessAppointments(); // Refresh appointments list
    },
    (error) => {
      console.error('Error updating appointment:', error);
      // Handle error scenarios, display error messages, etc.
    }
  );}}