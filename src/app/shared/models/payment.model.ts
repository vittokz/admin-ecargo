export interface Ipayment {
    id?: string;
    fecha?: string;
    usuario?: string;
    conductor?: string;
    total?: number;
    cuota?: string;
    Mpago?: string;
    estado?: number;
    servicio?: string;
}
export interface PaymentDetails {
    first_cuote?: {
        amount?: number,
        coupon?: number,
        cuote?: string,
        date?: string,
        payment_method?: string,
        wallet?: number
    },
    second_cuote?: {
        amount?: number,
        coupon?: number,
        cuote?: string,
        date?: string,
        payment_method?: string,
        wallet?: number
    },
    status?: number
}