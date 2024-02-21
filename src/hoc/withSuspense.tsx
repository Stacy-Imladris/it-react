import {ComponentType, Suspense} from 'react';
import {Preloader} from 'components/common/Preloader/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: T) => <Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </Suspense>
}
