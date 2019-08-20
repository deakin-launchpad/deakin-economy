import * as React from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from './typings/date';
export declare const MuiPickersContext: React.Context<IUtils<MaterialUiPickersDate> | null>;
export interface MuiPickersUtilsProviderProps {
    utils: any;
    children: React.ReactNode;
    locale?: any;
    libInstance?: any;
}
export default class MuiPickersUtilsProvider extends React.Component<MuiPickersUtilsProviderProps> {
    static propTypes: any;
    static getDerivedStateFromProps({ locale, libInstance, utils: Utils, }: MuiPickersUtilsProviderProps): {
        utils: any;
    };
    state: {
        utils: null;
    };
    render(): JSX.Element;
}
