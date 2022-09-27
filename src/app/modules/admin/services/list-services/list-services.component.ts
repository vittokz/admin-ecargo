/* eslint-disable arrow-parens */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-list-services',
    templateUrl: './list-services.component.html',
    styleUrls: ['./list-services.component.scss'],
})
export class ListServicesComponent implements OnInit {
    paramUrl: any;
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            this.paramUrl = { ...params.keys, ...params };
        });
        console.log(this.paramUrl);
    }
}
