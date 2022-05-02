import React, {ComponentType} from 'react';
import {Preloader} from '../components/common/Preloader/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: any) => <React.Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </React.Suspense>
}