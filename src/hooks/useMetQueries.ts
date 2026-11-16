import {useQueries, useQuery} from '@tanstack/react-query';
import {countObjects, fetchObject, fetchObjects, searchObjectIds} from '../api/metApi';
import type {Contract} from '../game/contracts';
import {pickRandom} from '../utils/random';


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