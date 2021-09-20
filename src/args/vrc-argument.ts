export interface VrcArgument {
    name : string;
    type : string;
    desc : string;
    dflt : any;
    secr? : boolean;
    options? : string[] | number[];
}

