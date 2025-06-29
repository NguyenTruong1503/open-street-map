export interface Maplocation {
    lat: number;
    lng: number;
    name: string;
    description?: string;
}

export interface MapMarker {
    id: string;
    lat: number;
    lng: number;
    popupText: string;
    icon?: string;
}