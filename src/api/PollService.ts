// src/services/api-service.ts
import { httpClient } from './request';
import { type AxiosResponse } from 'axios';
import type { Poll } from "../data/Poll.ts";
import type {Vote} from "../data/Vote.ts";

/**
 * Get all polls
 */
export function  getPolls(): Promise<AxiosResponse<Poll[]>> {
    return httpClient.get<Poll[]>(``);
}


/**
 * Create a new poll
 */
export function  createPoll(pollData: Poll): Promise<AxiosResponse<Poll>> {
    return httpClient.post<Poll>(``, pollData);
}

export function  vote(vote: Vote): Promise<AxiosResponse<Vote>> {
    return httpClient.post<Vote>(`/vote`, vote);
}




