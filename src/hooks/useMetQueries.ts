import {useQueries, useQuery} from '@tanstack/react-query';
import {countObjects, fetchDepartments, fetchObject, fetchObjects, searchObjectIds} from '../api/metApi';
import type {SearchParams} from '../api/types';
import type {Contract} from '../game/contracts';
import {pickRandom} from '../utils/random';
import {keepTop, type Slice} from "../utils/aggregate.ts";


export function useObject(id: number) {
    return useQuery({
        queryKey: ['object', id],
        queryFn: () => fetchObject(id),
        enabled: Number.isInteger(id),
    });
}

const MISSION_POOL_SIZE = 24;

export function useMissionPool(contract?: Contract) {
    return useQuery({
        queryKey: ['mission-pool', contract?.id],
        queryFn: async () => {
            const ids = await searchObjectIds(contract!.search);
            return fetchObjects(pickRandom(ids, MISSION_POOL_SIZE));
        },
        enabled: Boolean(contract),
    });
}

export function useContractCounts(contracts: Contract[]) {
    return useQueries({
        queries: contracts.map((contract) => ({
            queryKey: ['count', contract.search],
            queryFn: () => countObjects(contract.search),
        })),
        combine: (results) => results.map((result) => result.data),
    });
}

const MUSEUM_COUNTS: SearchParams[] = [{}, { isOnView: true }, { isHighlight: true }];

export function useMuseumOverview() {
    return useQueries({
        queries: MUSEUM_COUNTS.map((params) => ({
            queryKey: ['count', params],
            queryFn: () => countObjects(params),
        })),
        combine: (results) => {
            const [photographed, onView, highlights] = results.map((result) => result.data);
            const inReserve = photographed !== undefined && onView !== undefined ? photographed - onView : undefined;
            return { photographed, onView, inReserve, highlights };
        },
    });
}

export function useDepartmentReserves() {
    const departments = useQuery({ queryKey: ['departments'], queryFn: fetchDepartments, staleTime: Infinity });
    const list = departments.data ?? [];

    const counts = useQueries({
        queries: list.map((department) => ({
            queryKey: ['count', { departmentId: department.departmentId }],
            queryFn: () => countObjects({ departmentId: department.departmentId }),
        })),
        combine: (results) => ({
            totals: results.map((result) => result.data ?? 0),
            isLoading: results.some((result) => result.isLoading),
        }),
    });

    const reserves: Slice[] = list
        .map((department, index) => ({ name: department.displayName, value: counts.totals[index] }))
        .sort((a, b) => b.value - a.value);

    return {
        reserves: keepTop(reserves, 10),
        isLoading: departments.isLoading || counts.isLoading,
        isError: departments.isError,
        refetch: departments.refetch,
    };
}