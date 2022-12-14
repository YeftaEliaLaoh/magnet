import React from 'react';
import { OverlayTriggerInstance, OverlayTriggerProps, OverlayTriggerType } from '../Overlay/OverlayTrigger';
import { PositionChildProps } from '../Overlay/Position';
import { TypeAttributes, AnimationEventProps } from '../@types/common';
export type { OverlayTriggerInstance, PositionChildProps };
export interface PickerToggleTriggerProps extends Omit<AnimationEventProps, 'onEntering' | 'onExiting'>, Pick<OverlayTriggerProps, 'speaker'> {
    placement?: TypeAttributes.Placement;
    pickerProps: any;
    open?: boolean;
    trigger?: OverlayTriggerType | OverlayTriggerType[];
    children: React.ReactElement | ((props: any, ref: any) => React.ReactElement);
}
export declare const omitTriggerPropKeys: string[];
export declare const pickTriggerPropKeys: string[];
declare const PickerToggleTrigger: React.ForwardRefExoticComponent<PickerToggleTriggerProps & React.RefAttributes<any>>;
export default PickerToggleTrigger;
