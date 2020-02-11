export class CustomIcon {
    name: string;
    path: string;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export const customIcons: Array<CustomIcon> = [
    new CustomIcon('brazil-flag', 'assets/svg/flags/brazil.svg'),
    new CustomIcon('spain-flag', 'assets/svg/flags/spain.svg'),
    new CustomIcon('usa-flag', 'assets/svg/flags/usa.svg')
]