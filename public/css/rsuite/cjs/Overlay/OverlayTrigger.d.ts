/// <reference types="node" />
import React from 'react';
import { AnimationEventProps, StandardProps, TypeAttributes } from '../@types/common';
import { PositionChildProps } from './Position';
export declare type OverlayTriggerType = 'click' | 'hover' | 'focus' | 'active' | 'contextMenu' | 'none';
export interface OverlayTriggerProps extends StandardProps, AnimationEventProps {
    /** Triggering events */
    trigger?: OverlayTriggerType | OverlayTriggerType[];
    /** Display placement */
    placement?: TypeAttributes.Placement;
    /** Delay time */
    delay?: number;
    /** Open delay time */
    delayOpen?: number;
    /** Close delay time */
    delayClose?: number;
    /** Sets the rendering container */
    container?: HTMLElement | (() => HTMLElement);
    /** Container padding */
    containerPadding?: number;
    /** display element */
    speaker: React.ReactElement | ((props: PositionChildProps & Pick<React.HTMLAttributes<HTMLElement>, 'id' | 'onMouseEnter' | 'onMouseLeave'> & {
        onClose: (delay?: number) => NodeJS.Timeout | void;
    }, ref: React.RefCallback<HTMLElement>) => React.ReactElement);
    /** Prevent floating element overflow */
    preventOverflow?: boolean;
    /** Opern  overlay */
    open?: boolean;
    /** The overlay is open by default */
    defaultOpen?: boolean;
    /** Whether mouse is allowed to enter the floating layer of popover, whose default value is false. */
    enterable?: boolean;
    /** For the monitored component, the event will be bound to this component. */
    children: React.ReactElement | ((props: any, ref: any) => React.ReactElement);
    /** Whether to allow clicking document to close the overlay */
    rootClose?: boolean;
    /** Once disabled, the event cannot be triggered. */
    disabled?: boolean;
    /** Render the control as plain text */
    plaintext?: boolean;
    /** Make the control readonly */
    readOnly?: boolean;
    /**  Set the `id` on `<Overlay>` and `aria-describedby` on `<OverlayTrigger>` */
    controlId?: string;
    /** Lose Focus callback function */
    onBlur?: React.FocusEventHandler;
    /** Click on the callback function */
    onClick?: React.MouseEventHandler;
    /** RightClick on the callback function */
    onContextMenu?: React.MouseEventHandler;
    /** Callback function to get focus */
    onFocus?: React.FocusEventHandler;
    /** Mouse leave callback function */
    onMouseOut?: React.MouseEventHandler;
    /** Mouse over callback function */
    onMouseOver?: React.MouseEventHandler;
    /** Mouse move callback function */
    onMouseMove?: React.MouseEventHandler;
    /** Callback fired when open component */
    onOpen?: () => void;
    /** Callback fired when close component */
    onClose?: () => void;
    /** Whether speaker to follow the cursor */
    followCursor?: boolean;
}
export interface OverlayTriggerInstance {
    root: HTMLElement | undefined;
    updatePosition: () => void;
    open: (delay?: number) => void;
    close: (delay?: number) => void;
}
declare const OverlayTrigger: React.ForwardRefExoticComponent<OverlayTriggerProps & React.RefAttributes<OverlayTriggerInstance>>;
export default OverlayTrigger;
