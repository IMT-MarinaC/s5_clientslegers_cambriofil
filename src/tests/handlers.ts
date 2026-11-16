import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from '../api/metApi';
import { DEPARTMENTS, DETAIL_ARTWORK, MISSION_POOL } from './fixtures';

const ALL_ARTWORKS = [DETAIL_ARTWORK, ...MISSION_POOL];

export const handlers = [
    http.get(`${BASE_URL}/v1/departments`, () => HttpResponse.json({ departments: DEPARTMENTS })),

    http.get(`${BASE_URL}/v1.1/search`, () =>
        HttpResponse.json({ total: MISSION_POOL.length, objectIDs: MISSION_POOL.map((a) => a.objectID) }),
    ),

    http.get(`${BASE_URL}/v1/objects/:id`, ({ params }) => {
        const artwork = ALL_ARTWORKS.find((a) => a.objectID === Number(params.id));
        return artwork ? HttpResponse.json(artwork) : new HttpResponse(null, { status: 404 });
    }),
];

export const server = setupServer(...handlers);