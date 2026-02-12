export interface IntegrityService  {
    generate(content: string): Promise<string>;
    verify(content: string, hash: string): Promise<boolean>;
}