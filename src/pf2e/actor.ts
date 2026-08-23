import { ActorGroupUpdate, ActorPF2e } from "@7h3laughingman/pf2e-types";
import { R } from "..";

/** https://github.com/foundryvtt/pf2e/src/module/actor/helpers.ts */
function createActorGroupUpdate(data: Partial<ActorGroupUpdate> = {}): ActorGroupUpdate {
    return {
        actorUpdates: {},
        itemCreates: [],
        itemUpdates: [],
        itemDeletes: [],
        ...data,
    };
}

/** https://github.com/foundryvtt/pf2e/src/module/actor/helpers.ts */
async function applyActorGroupUpdate(
    actor: ActorPF2e,
    data: Partial<ActorGroupUpdate>,
    { render = true, keepId }: { render?: boolean; keepId?: boolean } = {},
): Promise<void> {
    const actorUpdates = data.actorUpdates && !R.isEmpty(data.actorUpdates) ? data.actorUpdates : null;
    const itemCreates = data.itemCreates ?? [];
    const itemUpdates = data.itemUpdates ?? [];
    const itemDeletes = data.itemDeletes ?? [];

    // Determine which one is last so that we cause the re-render then
    // If we manually re-render, other users will fail to re-render
    const lastRender = !render
        ? null
        : itemDeletes.length
          ? "delete"
          : itemUpdates.length
            ? "update"
            : itemCreates.length
              ? "create"
              : "actorUpdate";

    const operations: foundry.documents.DatabaseWriteOperation[] = [];

    if (actorUpdates) {
        operations.push({
            action: "update",
            documentName: "Actor",
            updates: [{ ...actorUpdates, _id: actor.id }],
            parent: actor.parent,
            render: lastRender === "actorUpdate",
        });
    }
    if (itemCreates.length > 0) {
        operations.push({
            action: "create",
            data: itemCreates,
            documentName: "Item",
            keepId,
            parent: actor,
            render: lastRender === "create",
        });
    }
    if (itemUpdates.length > 0) {
        operations.push({
            action: "update",
            documentName: "Item",
            updates: itemUpdates,
            parent: actor,
            render: lastRender === "update",
        });
    }
    if (itemDeletes.length > 0) {
        operations.push({
            action: "delete",
            documentName: "Item",
            ids: itemDeletes,
            parent: actor,
            render: lastRender === "delete",
        });
    }

    // we bundle all the operations into a single server query
    if (operations.length > 0) {
        await foundry.documents.modifyBatch(operations);
    }
}

export { applyActorGroupUpdate, createActorGroupUpdate };
