/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICoupon } from '../models/coupon.model';

@Injectable({
    providedIn: 'root',
})
export class CouponService {
    constructor(private afs: AngularFirestore) {}

    //Agregar un cupon a la base de datos
    insertCoupon(data: ICoupon){
         return this.afs.collection('coupons').add(data);
    }
    //trae los cupones
    getCoupons(): any {
        return this.afs.collection('coupons').snapshotChanges();
    }
    //actualiza un cupon
    async updateCoupon(documentId: string, dataCupon: any) {
        await this.afs.collection('coupons').doc(documentId).update({
            code: dataCupon.code,
            description: dataCupon.description,
            discount: dataCupon.discount,
            name: dataCupon.name,
        });
        return 'success';
    }
}
