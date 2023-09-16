/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export interface IViewDialogRef<Params = any> {
  open(params: Params): void
}

export interface IViewDialogProps {
  ref: React.MutableRefObject<IViewDialogRef | undefined>
}
