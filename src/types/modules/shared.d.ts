export {};

declare global {
    interface LEVIKTIMES {
        gmOnly: "GM Only";
        playerOnly: "Player Only";
        reloadRequired: "Requires Reload";
        emiting: {
            label: "Sending";
            noGm: "A GM must be online in order to enact this request.";
        };
    }
}
