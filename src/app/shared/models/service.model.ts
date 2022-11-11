/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
export interface IService {
    no?: number;
    id?: string;
    addresses_info?: AddressesInfo;
    service_track?: ServiceTrack;
    payment_details?: PaymentDetails;
    creation_date?: string;
    vehicle_info?: VehicleInfo;
    pickup_position?: PickupPosition;
    status?: number;
    messages_count?: number;
    rating_info?: RatingInfo;
    cancelled_details?: CancelledDetails;
    users_info?: UsersInfo;
    service_details?: ServiceDetails;
  }
  export interface ServiceTrack {
    remaining_distance?: number;
    last_update?: LastUpdate;
    remaining_time?: number;
  }
  export interface LastUpdate {
    seconds?: number;
    nanoseconds?: number;
  }
  export interface PaymentDetails {}
  export interface CreationDate {
    seconds?: number;
    nanoseconds?: number;
  }
  export interface VehicleInfo {
    brand?: string;
    color?: string;
    modelo?: string;
    plate?: string;
    type?: string;
  }
  export interface PickupPosition {
    geopoint?: Geopoint;
    geohash?: string;
  }
  export interface Geopoint {
    latitude?: number;
    longitude?: number;
  }
  export interface RatingInfo {}
  export interface CancelledDetails {}
  export interface UsersInfo {
    driver_info?: DriverInfo;
    client_info?: ClientInfo;
  }
  export interface DriverInfo {
    email?: string;
    emg_phone1?: string;
    emg_phone2?: string;
    name?: string;
    phone?: string;
    photo_url?: string;
    rating?: number;
    uid?: string;
  }
  export interface ClientInfo {
    photo_url?: string;
    name?: string;
    uid?: string;
    emg_phone?: string;
    email?: string;
    phone?: string;
  }
  export interface AddressesInfo {
    pickup_address?: PickupAddress;
    delivery_address?: DeliveryAddress;
  }
  export interface PickupAddress {
    city: string;
    position?: Position;
    details?: string;
    address?: string;
    country?: string;
  }
  export interface Position {
    latitude?: number;
    longitude?: number;
  }
  export interface DeliveryAddress {
    person_name?: string;
    address?: string;
    country?: string;
    details?: string;
    position?: Position2;
    city?: string;
  }
  export interface Position2 {
    latitude?: number;
    longitude?: number;
  }
  export interface ServiceDetails {
    app_delivery_time?: number;
    lost_date?: LostDate;
    pending_payment?: boolean;
    vehicle_type?: string;
    service_type?: string;
    scheduled_date?: string;
    total_base_price?: number;
    service_base_price?: number;
    volume?: number;
    otp1?: string;
    accepted_date?: string;
    pickup_date?: string;
    delivery_date?: string;
    otp2?: string;
    delivery_checkout?: boolean;
    weight?: number;
    delivery_mesage?: string;
    total_distance?: number;
    delivery_evidence?: any[];
  }
  export interface LostDate {
    seconds?: number;
    nanoseconds?: number;
  }
  //definicion para impresion de la tabla
  export interface IServiceTable{
    no?: number;
    UserInfoName: string;
    DriverInfoName: string;
    createDate: CreationDate;
    deliveryAddress: string;
    deliveryCity: string;
    pickupAddress: string;
    pickupCity: string;
    vehicleInfoType: string;
    serviceDetailsType: string;
    status: number;
  }