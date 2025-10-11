import { render } from "@/test";
import { mergeRefs } from "./mergeRefs";
import React, { useCallback, useRef } from "react";

describe("mergeRefs", () => {
    it("merge Refs", () => {
        let ref1;
        let ref2;

        const TextField = (props) => {
            ref1 = useRef(null);
            ref2 = useRef(null);

            const ref = mergeRefs(ref1, ref2);
            return <input {...props} ref={ref} />;
        };

        render(<TextField foo="foo" />);

        expect(ref1.current).toBe(ref2.current);
    });

    it("merge Refs with only one passed", () => {
        let ref1;

        const TextField = (props) => {
            ref1 = useRef(null);

            const ref = mergeRefs(ref1);
            return <input {...props} ref={ref} />;
        };

        render(<TextField foo="foo" />);

        expect(ref1.current).toBeTruthy();
    });

    it("merge Ref Cleanup", () => {
        const cleanUp = jest.fn();
        let ref1;
        let ref2;
        let target = null;

        const TextField = (props) => {
            ref1 = useRef(null);
            ref2 = useRef(null);
            const ref3 = useCallback((node) => {
                target = node;
                return cleanUp;
            }, []);

            const ref = mergeRefs(ref1, ref2, ref3);
            return <input {...props} ref={ref} />;
        };

        const { unmount } = render(<TextField foo="foo" />);

        expect(cleanUp).toHaveBeenCalledTimes(0);
        expect(ref1.current).toBe(target);
        expect(ref2.current).toBe(target);
        unmount();

        // Now cleanup has been called
        expect(cleanUp).toHaveBeenCalledTimes(1);
    });
});
