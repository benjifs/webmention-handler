declare type MicroformatProperty = MicroformatRoot | Image | Html | string;
declare type MicroformatProperties = Record<string, MicroformatProperty[]>;
export interface MicroformatRoot {
    id?: string;
    lang?: string;
    type?: string[];
    properties: MicroformatProperties;
    children?: MicroformatRoot[];
    value?: MicroformatProperty;
}
interface Image {
    alt: string;
    value?: string;
}
interface Html {
    html: string;
    value: string;
    lang?: string;
}