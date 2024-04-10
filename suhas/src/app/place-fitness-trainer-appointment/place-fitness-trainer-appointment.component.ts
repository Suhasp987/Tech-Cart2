import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from '../_services';

export class formData {
  constructor(
    public inr: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string,
    public amount:Number
  ) { }
}
@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm!: FormGroup;
  showWeeksInput: boolean = false;
   appoint:any[]=[]
  constructor(private formBuilder: FormBuilder, private UserService:UserService) {}

  ngOnInit(): void {
    this.fitnessForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      amount: [''],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      phonenumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      streetaddress: ['', Validators.required],
      addressline2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      trainerpreference: ['', Validators.required],
      physiotherapist: ['', Validators.required],
      packages: ['', Validators.required],
      weeks: ['']
      
    });

    this.UserService.getfitnessdata().subscribe(
      (appointments:any) => {
        this.appoint = appointments;
      },
      (error:any) => {
        console.error('Error fetching appointments:', error);
      }
    );

    this.fitnessForm.get('packages')?.valueChanges.subscribe((value: string) => {
      this.updateAmount();
    });

    this.fitnessForm.get('physiotherapist')?.valueChanges.subscribe(() => {
      this.updateAmount();
    });
  }

  updateAmount() {
    const packageValue = this.fitnessForm.get('packages')?.value;
    const physioValue = this.fitnessForm.get('physiotherapist')?.value === 'Yes' ? 200 : 0;
    const packageAmount = this.calculateFinalAmount(packageValue);
    const finalAmount = packageAmount + physioValue;
    this.fitnessForm.get('amount')?.setValue(finalAmount);
  }
  

  
  calculateFinalAmount(packageName: string): number {
    // Implement logic to calculate amount based on package
    let amount = 0;
    switch (packageName) {
      case 'Package A':
        amount = 3000;
        break;
      case 'Package B':
        amount = 5000;
        break;
      case 'Package C':
        amount = 8000;
        break;
      default:
        amount = 0;
    }
    return amount;
  }

  isWeeksInputVisible(): boolean {
    const selectedPackage = this.fitnessForm.get('packages')?.value;
    return selectedPackage === 'Package B' || selectedPackage === 'Package C';
  }
  onSubmit(): void {
    const email = this.fitnessForm.get('email')?.value;
    const phoneNumber = this.fitnessForm.get('phonenumber')?.value;

    // Check if email or phone number already exists in appointments
    const emailExists = this.appoint.some(appointment => appointment.email === email);
    const phoneExists = this.appoint.some(appointment => appointment.phonenumber === phoneNumber);

    if (emailExists) {
      alert('Email already exists. Please use a different email.');
      return;
    }

    if (phoneExists) {
      alert('Phone number already exists. Please use a different phone number.');
      return;
    }
    console.log(this.fitnessForm.value);
    console.log('Amount:', this.fitnessForm.get('amount')?.value);
    if (this.fitnessForm.valid) {
      const formData = this.fitnessForm.value;
      console.log("formdata")
      console.log('Amount:', this.fitnessForm.get('amount')?.value);
      console.log(formData.age);
      // Make HTTP POST request to API endpoint
      this.UserService.postfitnessdata(formData)
        .pipe(
          catchError(error => {
            console.error('Error posting form data:', error);
            alert("Error in form submitting")
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Form submitted successfully. Response:', response?.amount);
          alert("FOrm Submitted Sucessfully")
          this.fitnessForm.reset();
          // Handle success, e.g., display success message or navigate to another page
        });
    } else {
      // Mark all form fields as touched to display validation errors
      this.fitnessForm.markAllAsTouched();
    }
  }
}
