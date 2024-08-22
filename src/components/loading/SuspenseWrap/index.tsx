import { Spin } from 'antd';
import { random } from 'lodash';
import React, { Suspense } from 'react';

interface SuspenseWrapperProps {
  component: React.ReactNode;
}
export const SuspenseWrapper = (props: SuspenseWrapperProps) => {
  return (
    <Suspense
      key={'suspense-loading-' + random(10)}
      fallback={
        <div className="w-100 h-100 flex justify-center items-center">
          <Spin size="large" />
        </div>
      }
    >
      {props.component}
    </Suspense>
  );
};
