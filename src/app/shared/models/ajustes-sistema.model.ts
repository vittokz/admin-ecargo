/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
export interface IAjustesSistema {
  app_info: AppInfo;
  contact_info: ContactInfo;
  platform_info: PlatformInfo;
  required_documents: RequiredDocument[];
  services_list: ServicesList[];
  supported_max_volume: number;
  supported_max_weight: number;
  supported_min_weight: number;
  vehicles_list: VehiclesList[];
}

export interface AppInfo {
  maintenance_message: string;
  android_maintenance: boolean;
  update_traffic_info: number;
  current_color: string;
  iOS_maintenance: boolean;
  search_radius: string;
  update_driver_position: number;
  iOS_version: string;
  android_version: string;
}

export interface ContactInfo {
  facebook_url: string;
  faq_url: string;
  youtube_url: string;
  support_email: string;
  web_url: string;
  support_phone: string;
  terms_privacy_url: string;
  instagram_url: string;
  about_us_url: string;
  linkedin_url: string;
  contract_url: string;
  twitter_url: string;
}

export interface PlatformInfo {
  version: string;
  maintenance_message: string;
  enable: boolean;
}

export interface RequiredDocument {
  required: boolean;
  type: string;
  name: string;
  max_files: number;
  expiry: boolean;
}

export interface ServicesList {
  service_image: string;
  description: string;
  base_price: number;
  enable: boolean;
  name: string;
  value?: string;
}

export interface VehiclesList {
  enable: boolean;
  max_weight: number;
  min_weight: number;
  category: string;
  name: string;
  volumen?: string;
}
