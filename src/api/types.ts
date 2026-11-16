export interface Department {
    departmentId: number;
    displayName: string;
}

export interface DepartmentsResponse {
    departments: Department[];
}

export interface SearchResponse {
    total: number;
    objectIDs: number[] | null;
}

export interface SearchParams {
    q?: string;
    departmentId?: number;
    limit?: number;
}

export interface Measurement {
    elementName: string;
    elementMeasurements: {
        Height?: number;
        Width?: number;
        Depth?: number;
        Diameter?: number;
    };
}

export interface MetObject {
    objectID: number;
    isHighlight: boolean;
    primaryImage: string;
    primaryImageSmall: string;
    department: string;
    objectName: string;
    title: string;
    culture: string;
    period: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    measurements: Measurement[] | null;
    artistDisplayName: string;
    artistDisplayBio: string;
    classification: string;
    GalleryNumber: string;
    objectURL: string;
    creditLine: string;
}