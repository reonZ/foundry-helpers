import { PerceptionStatistic as _PerceptionStatistic } from "foundry-pf2e";
import { ApplicationV1HeaderButton as _ApplicationV1HeaderButton } from "foundry-pf2e/foundry/client/appv1/api/_module.mjs";
import {
    DatabaseUpdateOperation as _DatabaseUpdateOperation,
    DatabaseDeleteOperation as _DatabaseDeleteOperation,
} from "foundry-pf2e/foundry/common/abstract/_module.mjs";
import { ImageFilePath as _ImageFilePath } from "foundry-pf2e/foundry/common/constants.mjs";

export type PerceptionStatistic = _PerceptionStatistic;
export type ImageFilePath = _ImageFilePath;
export type DatabaseUpdateOperation<TParent extends foundry.abstract.Document | null> =
    _DatabaseUpdateOperation<TParent>;
export type DatabaseDeleteOperation<TParent extends foundry.abstract.Document | null> =
    _DatabaseDeleteOperation<TParent>;
export type ApplicationV1HeaderButton = _ApplicationV1HeaderButton;
