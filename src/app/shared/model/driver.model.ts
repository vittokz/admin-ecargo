export interface Drivers{
    creation_date: Date,
    profile_info: {
        names: string,
        last_names: string,
        phone: string,
        emg_phone1: string,
        emg_phone2: string,
        email: string,
        photo_url: string,
    },
    notification_info: {notification_id: string, topic: string},
    documents: any[],
    vehicle_info: any[],
    current_summary: any[],
    current_location: any[],
    face_data: any[],
    rating: number,
    documents_status: {
        vehicle_status: number,
        driver_status: number,
        driver_message: string,
        vehicle_message: string
    },
    busy: boolean,
    status: boolean,
    enable: boolean
}