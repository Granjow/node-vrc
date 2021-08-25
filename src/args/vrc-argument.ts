export interface VrcArgument<TKey extends string> {
    name : TKey;
    type : string;
    desc : string;
    dflt : any;
    secr? : boolean;
    options? : string[] | number[];
}

