export {};

declare global {
    namespace triggerEngine {
        interface GamePF2e extends MyModule.GamePF2e<Api> {
            test(): void;
            execute(path: `${string}:${string}:${string}`, values: { type: string; value: any }[]): void;
        }

        interface Api {
            openBlueprintMenu(
                moduleId: string,
                applicationId: string,
                source?: object,
                ...args: any[]
            ): Promise<foundry.applications.api.ApplicationV2>;
        }
    }
}
