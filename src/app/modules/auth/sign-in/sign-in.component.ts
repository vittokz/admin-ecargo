import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthFirebaseService } from 'app/shared/services/auth-firebase.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    tokenRecuperado: string ='';
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authServiceFirebase: AuthFirebaseService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    )
    {
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
    }
    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        const form = this.signInForm.value;
        if ( this.signInForm.invalid )
        {
            return;
        }
        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;
        const resp = this._authServiceFirebase.signIn(form.email, form.password);
        resp.then((token)=>{
            if(token===undefined){
                this._router.navigateByUrl('/login');
            }
            else{
            this.tokenRecuperado= token['Aa'];
            this._authServiceFirebase.setTokenGenerado(this.tokenRecuperado);
            this._authServiceFirebase.setUidUser(token['uid']);
            this._router.navigateByUrl('/home');
            }

        });
        }
}
