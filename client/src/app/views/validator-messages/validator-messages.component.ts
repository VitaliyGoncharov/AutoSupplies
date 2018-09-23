import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ValidatorService } from "../../core/services/validator.service";

@Component({
    selector: 'validator-messages',
    templateUrl: './validator-messages.component.html',
    styleUrls: ['./validator-messages.component.scss']
})
export class ValidatorMessages implements OnInit {
    @Input() control: FormControl;
    @Input() controlName: string;

    constructor() { }

    ngOnInit() {
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidatorService.getValidatorErrorMessage(
                    propertyName,
                    this.controlName,
                    this.control.errors[propertyName]
                );
            }
        }

        return null;
    }
}