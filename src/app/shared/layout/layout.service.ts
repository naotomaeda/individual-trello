import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    matcher: MediaQueryList;
    isMobile: boolean = !true;

    constructor(private mediaMatcher: MediaMatcher) {
        this.matcher = this.mediaMatcher.matchMedia('(min-width: 500px');
        this.matcher.addListener(this.myListener);
    }

    myListener(event) {
        this.isMobile = !event.matches;
        console.log(this.isMobile);
    }

}
