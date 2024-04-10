import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from './../_services/user.service';
import { catchError, throwError } from 'rxjs';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  
  

})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm!: FormGroup;
  public obj: any = {};
  constructor(private fb: FormBuilder ,private UserService:UserService) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required,Validators.max(200)]]
    });
  }

  onSubmit() {
   
    
    if (this.contactForm.valid) {
      this.obj = { ...this.contactForm.value, ...this.obj };
      this.contactForm.value;
      console.log(
        "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
        this.contactForm.value
      );
  
      this.UserService.postQuery(this.contactForm.value)
      .pipe(
        catchError(error=>{
          console.log(error('Error posting form Data',error));
          alert("Error in Form Submitting")
          return throwError(error)
        
        })
      ).subscribe(response=>{
        console.log("FOrm submitted Successfully",response);
        alert("Form Submitted Successfully")
        this.contactForm.reset();
      })
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
    }
    else{
      alert("Plaese Enter all the Deatils")
    }
  }
}
