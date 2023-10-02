import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent {
    inputText: string = '';
    savedText: string = '';

    constructor(private electronService: ElectronService) { }

    saveText() {
        if (this.inputText.trim() === '') return;

        this.electronService.ipcRenderer.send('save-text', this.inputText);
        this.inputText = '';
    }

    ngOnInit() {
        this.electronService.ipcRenderer.on('text-saved', (event, text) => {
            this.savedText = text;
        });

        // Request the initial text when the component is initialized.
        this.electronService.ipcRenderer.send('request-initial-text');
    }
}
