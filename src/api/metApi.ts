import type {DepartmentsResponse, MetObject, SearchParams, SearchResponse} from './types';

export const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection';
const DEFAULT_SEARCH_LIMIT = 200;

async function getJson<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
        throw new Error(`Erreur API Met (${response.status}) sur ${path}`);
    }
    return response.json() as Promise<T>;
}

export async function fetchDepartments() {
    const data = await getJson<DepartmentsResponse>('/v1/departments');
    return data.departments;
}

export async function searchObjectIds(params: SearchParams): Promise<number[]> {
    const query = new URLSearchParams({
        hasImages: 'true',
        limit: String(params.limit ?? DEFAULT_SEARCH_LIMIT),
    });
    if (params.q) query.set('q', params.q);
    if (params.departmentId) query.set('departmentId', String(params.departmentId));
    if (params.isHighlight) query.set('isHighlight', 'true');

    const data = await getJson<SearchResponse>(`/v1.1/search?${query}`);
    return data.objectIDs ?? [];
}

export function fetchObject(id: number) {
    return getJson<MetObject>(`/v1/objects/${id}`);
}

export async function fetchObjects(ids: number[]): Promise<MetObject[]> {
    const results = await Promise.allSettled(ids.map(fetchObject));
    return results
        .filter((r): r is PromiseFulfilledResult<MetObject> => r.status === 'fulfilled')
        .map((r) => r.value);
}