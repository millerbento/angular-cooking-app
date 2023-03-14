import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    collapsed = true;
    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string) {
        //Now this event can be listened outsid of this component
        this.featureSelected.emit(feature);
    }
}