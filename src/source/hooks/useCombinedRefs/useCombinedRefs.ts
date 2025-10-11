
// SPDX-FileCopyrightText: 2025 YarnSphere
// SPDX-License-Identifier: MIT

import * as React from "react";

type Ref<T> = NonNullable<React.Ref<T>>;
type Cleanups<T> = Map<React.RefCallback<T>, () => void>;

/**
 * Combines multiple references into a single stable callback reference while
 * respecting React's rules for references.
 *
 * @param refs References to combine.
 * @returns Stable callback reference.
 */
export function useCombinedRef<T>(
    ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
    const curRefs = (React.useRef<Set<Ref<T>>>(null).current ??= new Set());
    const cleanupsRef = React.useRef<Cleanups<T>>(null);
    const valueRef = React.useRef<T>(null);

    for (const ref of curRefs) {
        // We could create a set with the new references and use `has` instead of
        // `includes`, but these arrays are likely so small that it is probably not
        // worth it
        if (!refs.includes(ref)) {
            curRefs.delete(ref);
            if (valueRef.current !== null) {
                unsetRef(ref, cleanupsRef);
            }
        }
    }
    for (const ref of refs) {
        if (ref != null && !curRefs.has(ref)) {
            curRefs.add(ref);
            if (valueRef.current !== null) {
                setRef(ref, valueRef.current, cleanupsRef);
            }
        }
    }

    return (React.useRef<React.RefCallback<T>>(null).current ??= (value: T) => {
        valueRef.current = value;
        for (const ref of curRefs) {
            setRef(ref, value, cleanupsRef);
        }

        return () => {
            valueRef.current = null;
            for (const ref of curRefs) {
                unsetRef(ref, cleanupsRef);
            }
        };
    });
}

function setRef<T>(
    ref: Ref<T>,
    value: T,
    cleanupsRef: React.RefObject<Cleanups<T> | null>,
) {
    if (typeof ref === "function") {
        const cleanup = ref(value);
        if (typeof cleanup === "function") {
            (cleanupsRef.current ??= new Map()).set(ref, cleanup);
        }
    } else {
        ref.current = value;
    }
}

function unsetRef<T>(
    ref: Ref<T>,
    cleanupsRef: React.RefObject<Cleanups<T> | null>,
) {
    if (typeof ref === "function") {
        const cleanup = cleanupsRef.current?.get(ref);
        if (cleanup) {
            cleanup();
            cleanupsRef.current!.delete(ref);
        } else {
            ref(null);
        }
    } else {
        ref.current = null;
    }
}