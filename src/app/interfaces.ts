import {Draft, PayloadAction} from "@reduxjs/toolkit";

export interface reduxExport<T> {
    actions: [(state?: Draft<T>, action?: PayloadAction<any>) => void]
}