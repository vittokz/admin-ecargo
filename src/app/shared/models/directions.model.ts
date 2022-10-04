/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/naming-convention */
// Generated by https://quicktype.io

export interface DirectionsResponse {
    routes:    Route[];
    waypoints: Waypoint[];
    code:      string;
    uuid:      string;
}

export interface Route {
    country_crossed: boolean;
    weight_name:     string;
    weight:          number;
    duration:        number;
    distance:        number;
    legs:            Leg[];
    geometry:        Geometry;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type:        Type;
}

export enum Type {
    LineString = "LineString",
}

export interface Leg {
    via_waypoints: any[];
    admins:        Admin[];
    weight:        number;
    duration:      number;
    steps:         Step[];
    distance:      number;
    summary:       string;
}

export interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1:        string;
}

export interface Step {
    intersections: Intersection[];
    maneuver:      Maneuver;
    name:          string;
    duration:      number;
    distance:      number;
    driving_side:  DrivingSide;
    weight:        number;
    mode:          Mode;
    geometry:      Geometry;
    destinations?: string;
    ref?:          string;
    rotary_name?:  string;
}

export enum DrivingSide {
    Left = "left",
    Right = "right",
    SlightLeft = "slight left",
    SlightRight = "slight right",
    Straight = "straight",
}

export interface Intersection {
    entry:              boolean[];
    bearings:           number[];
    duration?:          number;
    mapbox_streets_v8?: MapboxStreetsV8;
    is_urban?:          boolean;
    admin_index:        number;
    out?:               number;
    weight?:            number;
    geometry_index:     number;
    location:           number[];
    traffic_signal?:    boolean;
    turn_duration?:     number;
    turn_weight?:       number;
    in?:                number;
    lanes?:             Lane[];
    toll_collection?:   TollCollection;
    railway_crossing?:  boolean;
    classes?:           ClassElement[];
}

export enum ClassElement {
    Toll = "toll",
    Tunnel = "tunnel",
}

export interface Lane {
    indications:       DrivingSide[];
    valid_indication?: DrivingSide;
    valid:             boolean;
    active:            boolean;
}

export interface MapboxStreetsV8 {
    class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
    Primary = "primary",
    PrimaryLink = "primary_link",
    Roundabout = "roundabout",
    Secondary = "secondary",
    Tertiary = "tertiary",
    TertiaryLink = "tertiary_link",
    Trunk = "trunk",
    TrunkLink = "trunk_link",
}

export interface TollCollection {
    name: string;
    type: string;
}

export interface Maneuver {
    type:           string;
    instruction:    string;
    bearing_after:  number;
    bearing_before: number;
    location:       number[];
    modifier?:      DrivingSide;
    exit?:          number;
}

export enum Mode {
    Driving = "driving",
}

export interface Waypoint {
    distance: number;
    name:     string;
    location: number[];
}
