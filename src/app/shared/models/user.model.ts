/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
export interface IUser {
    no?: number;
    id?: string;
    create?: string;
    enable?: boolean;
    phone?: string;
    last_names?: string;
    photo_url?: string;
    email?: string;
    emg_phone?: string;
    names?: string;
    saveAdrdress?: any[];
    userMasivo?: boolean;
    wallet?: number;
  }

 //DEFINE LA ESTRUCTURA COMPLETA DE LOS CAMPOS DE LA BASE DE DATOS FIREBASE
  export interface IUserFirebase {
    user_fmasivo?: boolean;
    agreement?: Agreement;
    wallet?: number;
    profile_info?: ProfileInfo;
    creation_date?: Date;
    enable?: boolean;
    save_addresses?: any[];
    notification_id?: string;
  }

  export interface Agreement {}
  export interface ProfileInfo {
    email?: string;
    photo_url?: string;
    emg_phone?: string;
    names?: string;
    phone?: string;
    last_names?: string;
  }