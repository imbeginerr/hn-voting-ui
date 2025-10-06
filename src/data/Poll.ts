import type {OptionVote} from "./OptionVote.ts";

export interface Poll{
    id: number;
    question: string;
    options: OptionVote[];
}