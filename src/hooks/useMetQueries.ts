import { useQuery } from '@tanstack/react-query';
import { fetchObject } from '../api/metApi';

export function useObject(id: number) {
    return useQuery({
        queryKey: ['object', id],
        queryFn: () => fetchObject(id),
        enabled: Number.isInteger(id),
    });
}