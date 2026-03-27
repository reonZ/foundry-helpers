import { createHTMLElement, htmlQuery } from ".";
/**
 * old system method that no longer exist
 */
function filterTraits(traits, selected, condition) {
    const selectedTraits = selected.filter((s) => !s.not).map((s) => s.value);
    const notTraits = selected.filter((t) => t.not).map((s) => s.value);
    if (notTraits.some((t) => traits.includes(t))) {
        return false;
    }
    if (selectedTraits.length) {
        return condition === "and"
            ? selectedTraits.every((t) => traits.includes(t))
            : selectedTraits.some((t) => traits.includes(t));
    }
    return true;
}
async function openBrowserTab(tab, data, filters) {
    const browser = game.pf2e.compendiumBrowser;
    if (browser.rendered) {
        await browser.close();
    }
    if (data) {
        Hooks.once("renderCompendiumBrowser", (_tab, html) => {
            const controls = htmlQuery(html, ".window-header [data-action='toggleControls']");
            const btn = createHTMLElement("button", {
                content: data.label,
            });
            btn.addEventListener("click", async (event) => {
                data.callback(event);
                browser.close();
            }, { once: true });
            requestAnimationFrame(() => {
                data.onRender?.(html);
            });
            controls?.replaceWith(btn);
        });
    }
    browser.openTab(tab, {
        filter: filters ?? (await browser.tabs[tab].getFilterData()),
        hideNavigation: true,
    });
}
export { filterTraits, openBrowserTab };
